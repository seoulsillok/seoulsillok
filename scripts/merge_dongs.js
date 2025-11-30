import fs from 'fs';
import * as topojson from 'topojson-server';
import * as topojsonClient from 'topojson-client';

const guCodes = {
  '11010': '종로구',
  '11020': '중구',
  '11030': '용산구',
  '11040': '성동구',
  '11050': '광진구',
  '11060': '동대문구',
  '11070': '중랑구',
  '11080': '성북구',
  '11090': '강북구',
  '11100': '도봉구',
  '11110': '노원구',
  '11120': '은평구',
  '11130': '서대문구',
  '11140': '마포구',
  '11150': '양천구',
  '11160': '강서구',
  '11170': '구로구',
  '11180': '금천구',
  '11190': '영등포구',
  '11200': '동작구',
  '11210': '관악구',
  '11220': '서초구',
  '11230': '강남구',
  '11240': '송파구',
  '11250': '강동구'
};

const inputPath = 'src/data/seoul_dongs_geo.json';
const outputPath = 'src/data/seoul_dongs_merged.json';

const geojson = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// Function to normalize dong name
function normalizeDongName(name) {
  // Remove numbers, periods, '가', '본' from the end/middle if they are suffixes to the main name
  // e.g. "도곡1동" -> "도곡"
  // "성수1가1동" -> "성수"
  // "종로1.2.3.4가동" -> "종로"
  // "신사동" -> "신사"
  // "일원본동" -> "일원"

  // Use regex to capture the base name.
  // Pattern: Start with Hangul chars, optionally followed by numbers/dots/'가'/'본', ending with '동'
  // But wait, the name in properties includes '동'.

  // Case 1: Standard Name + Number + '동' (e.g. 도곡1동)
  // Case 2: Name + '본동' (e.g. 일원본동, 본동) "본동" is a dong name itself in Dongjak-gu.
  // Case 3: Name + Number + '가' + Number + '동' (e.g. 성수1가1동)
  // Case 4: Name + Number + '가동' (e.g. 종로1.2.3.4가동)

  let baseName = name;

  if (name === '본동') return '본동'; // Special case for Dongjak-gu Bon-dong

  // Remove "동" suffix first for easier processing
  if (baseName.endsWith('동')) {
    baseName = baseName.slice(0, -1);
  }

  // Handle "본" suffix (e.g. 일원본 -> 일원, 방배본 -> 방배)
  if (baseName.endsWith('본')) {
      baseName = baseName.slice(0, -1);
  }

  // Handle numbers and '가' suffix
  // Remove trailing digits
  baseName = baseName.replace(/[0-9\.]+$/, '');

  // Remove trailing '가' and preceding digits/dots
  baseName = baseName.replace(/[0-9\.]+가$/, '');

  // Final cleanup if any digits remain at the end (should cover simple cases)
  baseName = baseName.replace(/[0-9]+$/, '');

  // Special handling for names that might have been over-trimmed or need specific logic
  // e.g. "을지로" -> "을지로" (was 을지로동)

  return baseName + '동';
}

const features = geojson.features.map(f => {
  const code = f.properties.code;
  const guCode = code.substring(0, 5);
  const guName = guCodes[guCode] || 'Unknown';
  const rawName = f.properties.name;
  const mergedName = normalizeDongName(rawName);

  return {
    type: 'Feature',
    geometry: f.geometry,
    properties: {
      ...f.properties,
      guCode,
      guName,
      mergedName
    }
  };
});

// Create topology to enable merging
const topology = topojson.topology({ dongs: { type: 'FeatureCollection', features } });

// Group features by Gu and MergedName
const groups = {};
features.forEach((f, i) => {
  const key = `${f.properties.guName}-${f.properties.mergedName}`;
  if (!groups[key]) {
    groups[key] = [];
  }
  groups[key].push(i); // Push index for topojson reference
});

const mergedFeatures = [];

// Merge polygons
for (const key in groups) {
  const indices = groups[key];
  const firstFeature = features[indices[0]];

  // Use topojson.merge to create a single geometry
  const mergedGeometry = topojsonClient.merge(topology, indices.map(i => topology.objects.dongs.geometries[i]));

  mergedFeatures.push({
    type: 'Feature',
    geometry: mergedGeometry,
    properties: {
      guName: firstFeature.properties.guName,
      dongName: firstFeature.properties.mergedName,
      // Generate a slug for navigation
      slug: `${firstFeature.properties.guName}-${firstFeature.properties.mergedName}`
    }
  });
}

const outputGeoJSON = {
  type: 'FeatureCollection',
  features: mergedFeatures
};

fs.writeFileSync(outputPath, JSON.stringify(outputGeoJSON));
console.log(`Merged ${features.length} features into ${mergedFeatures.length} features.`);
