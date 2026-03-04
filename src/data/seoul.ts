export type SeoulDistrict = {
  code: string;
  nameKo: string;
  map: {
    x: number;
    y: number;
  };
  dongs: string[];
};

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/seoulsillok',
  youtube: 'https://youtube.com/@seoulsillok',
  tiktok: 'https://tiktok.com/@seoulsillok',
  soundcloud: 'https://soundcloud.com/seoulsillok'
};

export const DISTRICTS: SeoulDistrict[] = [
  {
    code: 'gangnam',
    nameKo: '강남구',
    map: { x: 63, y: 62 },
    dongs: ['역삼동', '논현동', '신사동', '압구정동', '청담동', '삼성동', '대치동', '개포동', '일원동', '수서동', '세곡동', '도곡동']
  },
  {
    code: 'gangdong',
    nameKo: '강동구',
    map: { x: 86, y: 49 },
    dongs: ['강일동', '상일동', '명일동', '고덕동', '암사동', '천호동', '성내동', '길동', '둔촌동']
  },
  {
    code: 'gangbuk',
    nameKo: '강북구',
    map: { x: 47, y: 23 },
    dongs: ['미아동', '번동', '수유동', '우이동']
  },
  {
    code: 'gangseo',
    nameKo: '강서구',
    map: { x: 14, y: 51 },
    dongs: ['염창동', '등촌동', '화곡동', '가양동', '공항동', '방화동', '발산동', '마곡동']
  },
  {
    code: 'gwanak',
    nameKo: '관악구',
    map: { x: 43, y: 78 },
    dongs: ['봉천동', '신림동', '남현동']
  },
  {
    code: 'gwangjin',
    nameKo: '광진구',
    map: { x: 67, y: 43 },
    dongs: ['화양동', '군자동', '중곡동', '능동', '구의동', '광장동', '자양동']
  },
  {
    code: 'guro',
    nameKo: '구로구',
    map: { x: 30, y: 73 },
    dongs: ['신도림동', '구로동', '가리봉동', '고척동', '개봉동', '오류동', '궁동']
  },
  {
    code: 'geumcheon',
    nameKo: '금천구',
    map: { x: 34, y: 83 },
    dongs: ['가산동', '독산동', '시흥동']
  },
  {
    code: 'nowon',
    nameKo: '노원구',
    map: { x: 64, y: 17 },
    dongs: ['월계동', '공릉동', '하계동', '중계동', '상계동']
  },
  {
    code: 'dobong',
    nameKo: '도봉구',
    map: { x: 55, y: 12 },
    dongs: ['쌍문동', '방학동', '창동', '도봉동']
  },
  {
    code: 'dongdaemun',
    nameKo: '동대문구',
    map: { x: 58, y: 35 },
    dongs: ['용신동', '제기동', '전농동', '답십리동', '장안동', '청량리동', '회기동', '이문동', '휘경동']
  },
  {
    code: 'dongjak',
    nameKo: '동작구',
    map: { x: 45, y: 70 },
    dongs: ['노량진동', '상도동', '흑석동', '사당동', '대방동', '신대방동']
  },
  {
    code: 'mapo',
    nameKo: '마포구',
    map: { x: 33, y: 52 },
    dongs: ['공덕동', '아현동', '도화동', '용강동', '대흥동', '염리동', '신수동', '서강동', '서교동', '합정동', '망원동', '연남동', '상암동', '성산동']
  },
  {
    code: 'seodaemun',
    nameKo: '서대문구',
    map: { x: 38, y: 42 },
    dongs: ['충현동', '천연동', '북아현동', '신촌동', '연희동', '홍제동', '홍은동', '남가좌동', '북가좌동']
  },
  {
    code: 'seocho',
    nameKo: '서초구',
    map: { x: 56, y: 73 },
    dongs: ['서초동', '잠원동', '반포동', '방배동', '양재동', '내곡동']
  },
  {
    code: 'seongdong',
    nameKo: '성동구',
    map: { x: 58, y: 49 },
    dongs: ['왕십리동', '행당동', '응봉동', '금호동', '옥수동', '성수동', '송정동', '용답동']
  },
  {
    code: 'seongbuk',
    nameKo: '성북구',
    map: { x: 50, y: 29 },
    dongs: ['성북동', '삼선동', '동선동', '돈암동', '안암동', '보문동', '정릉동', '길음동', '종암동', '장위동', '석관동']
  },
  {
    code: 'songpa',
    nameKo: '송파구',
    map: { x: 74, y: 61 },
    dongs: ['잠실동', '신천동', '풍납동', '송파동', '석촌동', '삼전동', '가락동', '문정동', '장지동', '방이동', '오금동', '거여동', '마천동', '위례동']
  },
  {
    code: 'yangcheon',
    nameKo: '양천구',
    map: { x: 22, y: 64 },
    dongs: ['목동', '신정동', '신월동']
  },
  {
    code: 'yeongdeungpo',
    nameKo: '영등포구',
    map: { x: 35, y: 64 },
    dongs: ['영등포동', '여의도동', '당산동', '문래동', '양평동', '신길동', '대림동', '도림동']
  },
  {
    code: 'yongsan',
    nameKo: '용산구',
    map: { x: 49, y: 56 },
    dongs: ['후암동', '용산동', '남영동', '청파동', '원효로동', '효창동', '용문동', '한강로동', '이촌동', '이태원동', '한남동', '서빙고동', '보광동']
  },
  {
    code: 'eunpyeong',
    nameKo: '은평구',
    map: { x: 29, y: 31 },
    dongs: ['녹번동', '불광동', '갈현동', '구산동', '대조동', '응암동', '역촌동', '신사동', '증산동', '수색동', '진관동']
  },
  {
    code: 'jongno',
    nameKo: '종로구',
    map: { x: 47, y: 40 },
    dongs: ['청운효자동', '사직동', '삼청동', '부암동', '평창동', '무악동', '교남동', '가회동', '종로1가', '종로2가', '종로3가', '종로4가', '이화동', '혜화동', '창신동', '숭인동']
  },
  {
    code: 'jung',
    nameKo: '중구',
    map: { x: 49, y: 48 },
    dongs: ['소공동', '회현동', '명동', '필동', '장충동', '광희동', '을지로동', '신당동', '다산동', '약수동', '청구동', '동화동', '황학동', '중림동']
  },
  {
    code: 'jungnang',
    nameKo: '중랑구',
    map: { x: 66, y: 29 },
    dongs: ['면목동', '상봉동', '중화동', '묵동', '망우동', '신내동']
  }
];

export type DongRecord = {
  slug: string;
  districtKo: string;
  districtCode: string;
  nameKo: string;
};

export const ALL_DONGS: DongRecord[] = DISTRICTS.flatMap((district) =>
  district.dongs.map((dong, index) => ({
    slug: `${district.code}-${index + 1}`,
    districtKo: district.nameKo,
    districtCode: district.code,
    nameKo: dong
  }))
);

export function findDongBySlug(slug: string): DongRecord | undefined {
  return ALL_DONGS.find((entry) => entry.slug === slug);
}

export function getDistrictByCode(code: string): SeoulDistrict | undefined {
  return DISTRICTS.find((district) => district.code === code);
}
