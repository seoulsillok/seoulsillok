import { ALL_DONGS, DISTRICTS } from './seoul.ts';
import groupedGeoJsonRaw from './seoul-dong-boundaries.geojson?raw';

const TARGET_WIDTH = 1000;
const MAP_PADDING = 28;
const SIMPLIFY_TOLERANCE = 0.85;

const groupedGeoJson = JSON.parse(groupedGeoJsonRaw);
const geometryByDong = new Map(
  groupedGeoJson.features.map((feature) => [
    `${feature.properties.districtCode}:${feature.properties.dongName}`,
    feature.geometry
  ])
);
const resolvedFeatures = ALL_DONGS.map((dong) => {
  const geometry = geometryByDong.get(`${dong.districtCode}:${dong.nameKo}`);
  if (!geometry) throw new Error(`No geometry found for ${dong.districtKo} ${dong.nameKo}`);
  return { ...dong, multiPolygons: [toMultiPolygon(geometry)] };
});
const projectedFeatures = projectFeatures(resolvedFeatures);
const districtMapEntries = buildDistrictEntries(projectedFeatures);

export const SEOUL_MAP = {
  width: projectedFeatures.width,
  height: projectedFeatures.height,
  features: projectedFeatures.features,
  districts: districtMapEntries
};

function toMultiPolygon(geometry) {
  if (!geometry || !Array.isArray(geometry.coordinates)) {
    throw new Error('Unsupported geometry');
  }

  if (geometry.type === 'Polygon') {
    return [geometry.coordinates];
  }

  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates;
  }

  throw new Error(`Unsupported geometry type: ${geometry.type}`);
}

function projectFeatures(features) {
  const geographicBounds = getGeographicBounds(features);
  const midLatitude = (geographicBounds.minLat + geographicBounds.maxLat) / 2;
  const cosLatitude = Math.cos((midLatitude * Math.PI) / 180);

  const rawProjected = features.map((feature) => ({
    ...feature,
    projected: feature.multiPolygons.map((multiPolygon) =>
      multiPolygon.map((polygon) =>
        polygon.map((ring) =>
          ring.map(([longitude, latitude]) => [
            (longitude - geographicBounds.minLon) * cosLatitude,
            geographicBounds.maxLat - latitude
          ])
        )
      )
    )
  }));

  const projectedBounds = getProjectedBounds(rawProjected);
  const contentWidth = projectedBounds.maxX - projectedBounds.minX;
  const contentHeight = projectedBounds.maxY - projectedBounds.minY;
  const scale = TARGET_WIDTH / contentWidth;
  const width = roundTo(scale * contentWidth + MAP_PADDING * 2, 1);
  const height = roundTo(scale * contentHeight + MAP_PADDING * 2, 1);

  const normalizedFeatures = rawProjected.map((feature) => {
    const normalizedMultiPolygons = feature.projected.map((multiPolygon) =>
      multiPolygon
        .map((polygon) =>
          polygon
            .map((ring) =>
              simplifyRing(
                ring.map(([x, y]) => [
                  (x - projectedBounds.minX) * scale + MAP_PADDING,
                  (y - projectedBounds.minY) * scale + MAP_PADDING
                ]),
                SIMPLIFY_TOLERANCE
              )
            )
            .filter((ring) => ring.length >= 4)
        )
        .filter((polygon) => polygon.length)
    );

    const path = normalizedMultiPolygons.flatMap((multiPolygon) => multiPolygon).map(ringsToPath).join('');

    if (!path) {
      throw new Error(`Empty path generated for ${feature.districtKo} ${feature.nameKo}`);
    }

    const labelPoint = getLabelPoint(normalizedMultiPolygons);
    const bounds = getNormalizedBounds(normalizedMultiPolygons);
    const centroid = getMultiPolygonCentroidMetrics(normalizedMultiPolygons, labelPoint);

    return {
      slug: feature.slug,
      districtCode: feature.districtCode,
      districtKo: feature.districtKo,
      nameKo: feature.nameKo,
      path,
      labelX: roundTo(labelPoint[0], 1),
      labelY: roundTo(labelPoint[1], 1),
      labelXPercent: roundTo((labelPoint[0] / width) * 100, 2),
      labelYPercent: roundTo((labelPoint[1] / height) * 100, 2),
      bounds,
      area: centroid.area,
      centroidX: centroid.cx,
      centroidY: centroid.cy
    };
  });

  return {
    width,
    height,
    features: normalizedFeatures
  };
}

function getGeographicBounds(features) {
  let minLon = Number.POSITIVE_INFINITY;
  let maxLon = Number.NEGATIVE_INFINITY;
  let minLat = Number.POSITIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;

  for (const feature of features) {
    for (const multiPolygon of feature.multiPolygons) {
      for (const polygon of multiPolygon) {
        for (const ring of polygon) {
          for (const [longitude, latitude] of ring) {
            minLon = Math.min(minLon, longitude);
            maxLon = Math.max(maxLon, longitude);
            minLat = Math.min(minLat, latitude);
            maxLat = Math.max(maxLat, latitude);
          }
        }
      }
    }
  }

  return { minLon, maxLon, minLat, maxLat };
}

function getProjectedBounds(features) {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (const feature of features) {
    for (const multiPolygon of feature.projected) {
      for (const polygon of multiPolygon) {
        for (const ring of polygon) {
          for (const [x, y] of ring) {
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
          }
        }
      }
    }
  }

  return { minX, maxX, minY, maxY };
}

function getNormalizedBounds(multiPolygons) {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (const multiPolygon of multiPolygons) {
    for (const polygon of multiPolygon) {
      for (const ring of polygon) {
        for (const [x, y] of ring) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
    }
  }

  return {
    minX: roundTo(minX, 1),
    maxX: roundTo(maxX, 1),
    minY: roundTo(minY, 1),
    maxY: roundTo(maxY, 1)
  };
}

function simplifyRing(ring, tolerance) {
  const points = ring.slice(0, -1);

  if (points.length < 3) {
    return closeRing(ring.map((point) => roundPoint(point, 1)));
  }

  const simplified = simplifyDouglasPeucker(points, tolerance)
    .map((point) => roundPoint(point, 1))
    .filter((point, index, array) => index === 0 || !pointsEqual(point, array[index - 1]));

  if (simplified.length < 3) {
    return closeRing(points.map((point) => roundPoint(point, 1)));
  }

  return closeRing(simplified);
}

function closeRing(points) {
  const first = points[0];
  const last = points[points.length - 1];

  if (!first || !last) return [];
  if (pointsEqual(first, last)) return points;

  return [...points, first];
}

function simplifyDouglasPeucker(points, tolerance) {
  if (points.length <= 2) {
    return points.slice();
  }

  const lastIndex = points.length - 1;
  const stack = [[0, lastIndex]];
  const keep = new Array(points.length).fill(false);
  keep[0] = true;
  keep[lastIndex] = true;
  const squaredTolerance = tolerance * tolerance;

  while (stack.length) {
    const [startIndex, endIndex] = stack.pop();
    let maxDistance = 0;
    let nextIndex = -1;

    for (let index = startIndex + 1; index < endIndex; index += 1) {
      const distance = getSquaredSegmentDistance(points[index], points[startIndex], points[endIndex]);

      if (distance > maxDistance) {
        maxDistance = distance;
        nextIndex = index;
      }
    }

    if (maxDistance > squaredTolerance && nextIndex !== -1) {
      keep[nextIndex] = true;
      stack.push([startIndex, nextIndex], [nextIndex, endIndex]);
    }
  }

  return points.filter((_, index) => keep[index]);
}

function getSquaredSegmentDistance(point, start, end) {
  let x = start[0];
  let y = start[1];
  let dx = end[0] - x;
  let dy = end[1] - y;

  if (dx !== 0 || dy !== 0) {
    const t = ((point[0] - x) * dx + (point[1] - y) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      x = end[0];
      y = end[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }

  dx = point[0] - x;
  dy = point[1] - y;

  return dx * dx + dy * dy;
}

function getLabelPoint(multiPolygons) {
  const shells = [];

  for (const multiPolygon of multiPolygons) {
    for (const polygon of multiPolygon) {
      if (polygon[0]?.length >= 4) {
        shells.push(polygon);
      }
    }
  }

  if (!shells.length) {
    return [0, 0];
  }

  let totalArea = 0;
  let centroidX = 0;
  let centroidY = 0;
  let largestShell = shells[0];
  let largestArea = 0;

  for (const polygon of shells) {
    const outerRing = polygon[0];
    const metrics = getRingCentroidMetrics(outerRing);
    const ringArea = Math.abs(metrics.area);

    if (ringArea <= 0) continue;

    totalArea += ringArea;
    centroidX += metrics.cx * ringArea;
    centroidY += metrics.cy * ringArea;

    if (ringArea > largestArea) {
      largestArea = ringArea;
      largestShell = polygon;
    }
  }

  const weightedPoint = totalArea
    ? [centroidX / totalArea, centroidY / totalArea]
    : getPolygonBoxCenter(largestShell);

  if (isPointInsideMultiPolygon(weightedPoint, multiPolygons)) {
    return weightedPoint;
  }

  const largestCentroid = getRingCentroidMetrics(largestShell[0]);
  const fallbackPoint = Math.abs(largestCentroid.area) > 0
    ? [largestCentroid.cx, largestCentroid.cy]
    : getPolygonBoxCenter(largestShell);

  if (isPointInsideMultiPolygon(fallbackPoint, multiPolygons)) {
    return fallbackPoint;
  }

  return getPolygonBoxCenter(largestShell);
}

function getRingCentroidMetrics(ring) {
  let areaAccumulator = 0;
  let centroidXAccumulator = 0;
  let centroidYAccumulator = 0;

  for (let index = 0; index < ring.length - 1; index += 1) {
    const [x1, y1] = ring[index];
    const [x2, y2] = ring[index + 1];
    const cross = x1 * y2 - x2 * y1;
    areaAccumulator += cross;
    centroidXAccumulator += (x1 + x2) * cross;
    centroidYAccumulator += (y1 + y2) * cross;
  }

  const signedArea = areaAccumulator / 2;

  if (signedArea === 0) {
    const [x, y] = getRingBoxCenter(ring);
    return { area: 0, cx: x, cy: y };
  }

  return {
    area: signedArea,
    cx: centroidXAccumulator / (6 * signedArea),
    cy: centroidYAccumulator / (6 * signedArea)
  };
}

function getMultiPolygonCentroidMetrics(multiPolygons, fallbackPoint) {
  let area = 0;
  let centroidX = 0;
  let centroidY = 0;

  for (const multiPolygon of multiPolygons) {
    for (const polygon of multiPolygon) {
      polygon.forEach((ring, index) => {
        const metrics = getRingCentroidMetrics(ring);
        const ringArea = Math.abs(metrics.area) * (index === 0 ? 1 : -1);
        area += ringArea;
        centroidX += metrics.cx * ringArea;
        centroidY += metrics.cy * ringArea;
      });
    }
  }

  return area > 0
    ? { area, cx: centroidX / area, cy: centroidY / area }
    : { area: 0, cx: fallbackPoint[0], cy: fallbackPoint[1] };
}

function getPolygonBoxCenter(polygon) {
  return getRingBoxCenter(polygon[0]);
}

function getRingBoxCenter(ring) {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (const [x, y] of ring) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  return [(minX + maxX) / 2, (minY + maxY) / 2];
}

function isPointInsideMultiPolygon(point, multiPolygons) {
  return multiPolygons.some((multiPolygon) => multiPolygon.some((polygon) => isPointInsidePolygon(point, polygon)));
}

function isPointInsidePolygon(point, polygon) {
  if (!isPointInsideRing(point, polygon[0])) {
    return false;
  }

  for (let index = 1; index < polygon.length; index += 1) {
    if (isPointInsideRing(point, polygon[index])) {
      return false;
    }
  }

  return true;
}

function isPointInsideRing(point, ring) {
  let inside = false;

  for (let current = 0, previous = ring.length - 1; current < ring.length; previous = current, current += 1) {
    const [x1, y1] = ring[current];
    const [x2, y2] = ring[previous];
    const intersects = y1 > point[1] !== y2 > point[1]
      && point[0] < ((x2 - x1) * (point[1] - y1)) / (y2 - y1) + x1;

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
}

function ringsToPath(rings) {
  return rings.map((ring) => ringToPath(ring)).join('');
}

function ringToPath(ring) {
  if (!ring.length) return '';

  const [firstX, firstY] = ring[0];
  let path = `M${formatNumber(firstX)} ${formatNumber(firstY)}`;

  for (let index = 1; index < ring.length; index += 1) {
    const [x, y] = ring[index];
    path += `L${formatNumber(x)} ${formatNumber(y)}`;
  }

  return `${path}Z`;
}

function buildDistrictEntries(projectedFeatures) {
  const byDistrict = new Map(DISTRICTS.map((district) => [district.code, []]));

  for (const feature of projectedFeatures.features) {
    byDistrict.get(feature.districtCode)?.push(feature);
  }

  return DISTRICTS.map((district) => {
    const dongs = byDistrict.get(district.code) || [];
    const bounds = getDistrictBounds(dongs);
    const totalArea = dongs.reduce((sum, dong) => sum + dong.area, 0);
    const centerX = totalArea
      ? dongs.reduce((sum, dong) => sum + dong.centroidX * dong.area, 0) / totalArea
      : (bounds.minX + bounds.maxX) / 2;
    const centerY = totalArea
      ? dongs.reduce((sum, dong) => sum + dong.centroidY * dong.area, 0) / totalArea
      : (bounds.minY + bounds.maxY) / 2;

    return {
      code: district.code,
      nameKo: district.nameKo,
      centerX: roundTo((centerX / projectedFeatures.width) * 100, 2),
      centerY: roundTo((centerY / projectedFeatures.height) * 100, 2),
      minX: roundTo((bounds.minX / projectedFeatures.width) * 100, 2),
      maxX: roundTo((bounds.maxX / projectedFeatures.width) * 100, 2),
      minY: roundTo((bounds.minY / projectedFeatures.height) * 100, 2),
      maxY: roundTo((bounds.maxY / projectedFeatures.height) * 100, 2),
      dongs: dongs.map((dong) => ({
        slug: dong.slug,
        nameKo: dong.nameKo,
        labelX: dong.labelXPercent,
        labelY: dong.labelYPercent
      }))
    };
  });
}

function getDistrictBounds(dongs) {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (const dong of dongs) {
    minX = Math.min(minX, dong.bounds.minX);
    maxX = Math.max(maxX, dong.bounds.maxX);
    minY = Math.min(minY, dong.bounds.minY);
    maxY = Math.max(maxY, dong.bounds.maxY);
  }

  return { minX, maxX, minY, maxY };
}

function formatNumber(value) {
  return Number(value.toFixed(1)).toString();
}

function roundPoint(point, decimals) {
  return [roundTo(point[0], decimals), roundTo(point[1], decimals)];
}

function roundTo(value, decimals) {
  const precision = 10 ** decimals;
  return Math.round(value * precision) / precision;
}

function pointsEqual(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
