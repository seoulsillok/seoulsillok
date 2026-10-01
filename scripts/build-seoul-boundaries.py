"""Dissolve Seoul legal-dong polygons into the site's editorial dong areas.

Requires Shapely 2: python3 -m pip install shapely
Run from the repository root: python3 scripts/build-seoul-boundaries.py
The committed GeoJSON is used by the website; Python is not needed to serve it.
"""

import csv
import json
import re
from collections import defaultdict
from pathlib import Path

from shapely.geometry import mapping, shape
from shapely.ops import unary_union


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'src' / 'data'
DISTRICT_PREFIXES = dict(zip(
    '종로구 중구 용산구 성동구 광진구 동대문구 중랑구 성북구 강북구 도봉구 노원구 은평구 서대문구 마포구 양천구 강서구 구로구 금천구 영등포구 동작구 관악구 서초구 강남구 송파구 강동구'.split(),
    '11110 11140 11170 11200 11215 11230 11260 11290 11305 11320 11350 11380 11410 11440 11470 11500 11530 11545 11560 11590 11620 11650 11680 11710 11740'.split(),
))
DISTRICT_BY_PREFIX = {code: district for district, code in DISTRICT_PREFIXES.items()}

# These legal dongs belong to the larger named area used on the site.
MANUAL_PAGE_BY_LEGAL = {
    ('강서구', '내발산동'): '발산동',
    ('강서구', '외발산동'): '발산동',
    ('동작구', '상도1동'): '상도동',
    ('동작구', '본동'): '노량진동',
    ('성동구', '상왕십리동'): '왕십리동',
    ('성동구', '하왕십리동'): '왕십리동',
    ('성동구', '도선동'): '왕십리동',
    ('성동구', '홍익동'): '왕십리동',
    ('성북구', '상월곡동'): '월곡동',
    ('성북구', '하월곡동'): '월곡동',
    ('용산구', '청암동'): '원효로동',
    ('용산구', '문배동'): '원효로동',
    ('용산구', '신창동'): '원효로동',
    ('용산구', '산천동'): '원효로동',
    ('용산구', '신계동'): '원효로동',
}
MANUAL_PAGE_BY_ADMIN = {
    ('종로구', '종로1·2·3·4가동'): '종로동',
    ('종로구', '종로5·6가동'): '종로동',
}


def read_editorial_dongs():
    source = (DATA / 'seoul.ts').read_text(encoding='utf-8')
    blocks = re.findall(
        r"code: '([^']+)'[\s\S]*?nameKo: '([^']+)'[\s\S]*?dongs: \[([^\]]+)\]",
        source,
    )
    if len(blocks) != 25:
        raise ValueError(f'Expected 25 districts in seoul.ts, found {len(blocks)}')
    return {
        district: (code, re.findall(r"'([^']+)'", dongs))
        for code, district, dongs in blocks
    }


def main():
    editorial = read_editorial_dongs()
    legal = json.loads((DATA / 'seoul-legal-dongs.geojson').read_text(encoding='utf-8'))['features']
    admin = json.loads((DATA / 'seoul-dongs-2017.geojson').read_text(encoding='utf-8'))['features']
    admin_by_district = defaultdict(list)
    for feature in admin:
        _, district, name = feature['properties']['adm_nm'].split(' ')
        admin_by_district[district].append((name, shape(feature['geometry'])))
    wirye_boundary = next(boundary for name, boundary in admin_by_district['송파구'] if name == '위례동')

    rows = []
    grouped = defaultdict(list)
    for feature in sorted(legal, key=lambda item: item['properties']['EMD_CD']):
        props = feature['properties']
        code = props['EMD_CD']
        district = DISTRICT_BY_PREFIX[code[:5]]
        legal_name = props['EMD_KOR_NM']
        _, names = editorial[district]
        name_set = set(names)
        geometry = shape(feature['geometry'])

        if legal_name in name_set:
            page = legal_name
        elif (district, legal_name) in MANUAL_PAGE_BY_LEGAL:
            page = MANUAL_PAGE_BY_LEGAL[(district, legal_name)]
        elif district == '종로구' and re.fullmatch(r'종로[1-6]가', legal_name):
            page = '종로동'
        elif district == '용산구' and re.fullmatch(r'원효로[1-4]가', legal_name):
            page = '원효로동'
        elif district == '용산구' and re.fullmatch(r'한강로[1-3]가', legal_name):
            page = '한강로동'
        else:
            stem = re.sub(r'\d+가$', '', legal_name)
            if stem in name_set:
                page = stem
            else:
                overlaps = sorted(
                    ((geometry.intersection(boundary).area / geometry.area, admin_name)
                     for admin_name, boundary in admin_by_district[district]
                     if boundary.intersects(geometry)),
                    reverse=True,
                )
                page = None
                for share, admin_name in overlaps:
                    candidate = MANUAL_PAGE_BY_ADMIN.get((district, admin_name), admin_name)
                    if share >= 0.5 and candidate in name_set:
                        page = candidate
                        break
                if page is None:
                    raise ValueError(f'Unassigned legal dong: {district} {legal_name} ({code}); admin overlap: {overlaps[:3]}')

        if page not in name_set:
            raise ValueError(f'{district} {legal_name} points to missing page {page}')
        rows.append((code, district, legal_name, page))
        # 위례동 was introduced as an administrative dong across parts of two
        # legal dongs. Carve it out so the three clickable areas never overlap.
        if district == '송파구' and legal_name in ('거여동', '장지동'):
            wirye_part = geometry.intersection(wirye_boundary)
            if not wirye_part.is_empty:
                grouped[(district, '위례동')].append(wirye_part)
                rows.append((code, district, legal_name, '위례동'))
                geometry = geometry.difference(wirye_boundary)
        grouped[(district, page)].append(geometry)

    missing_pages = [(district, name) for district, (_, names) in editorial.items()
                     for name in names if (district, name) not in grouped]
    if missing_pages:
        raise ValueError(f'Pages without geometry: {missing_pages}')

    with (DATA / 'seoul-dong-crosswalk.csv').open('w', newline='', encoding='utf-8') as output:
        writer = csv.writer(output)
        writer.writerow(('legal_code', 'district', 'legal_dong', 'page_dong'))
        writer.writerows(rows)

    features = []
    for district, (district_code, names) in editorial.items():
        for page in names:
            dissolved = unary_union(grouped[(district, page)])
            features.append({
                'type': 'Feature',
                'properties': {'districtCode': district_code, 'districtKo': district, 'dongName': page},
                'geometry': mapping(dissolved),
            })

    collection = {'type': 'FeatureCollection', 'features': features}
    (DATA / 'seoul-dong-boundaries.geojson').write_text(
        json.dumps(collection, ensure_ascii=False, separators=(',', ':')) + '\n',
        encoding='utf-8',
    )
    print(f'Assigned {len(legal)} legal polygons ({len(rows)} crosswalk rows) to {len(features)} dong pages in 25 districts.')


if __name__ == '__main__':
    main()
