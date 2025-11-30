import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3-geo';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Feature {
  type: string;
  geometry: any;
  properties: {
    guName: string;
    dongName: string;
    slug: string;
  };
}

interface GeoJSON {
  type: string;
  features: Feature[];
}

// Color palette for 25 Gus
const guPalette: Record<string, string> = {
  '종로구': '#E57373', '중구': '#F06292', '용산구': '#BA68C8', '성동구': '#9575CD', '광진구': '#7986CB',
  '동대문구': '#64B5F6', '중랑구': '#4FC3F7', '성북구': '#4DD0E1', '강북구': '#4DB6AC', '도봉구': '#81C784',
  '노원구': '#AED581', '은평구': '#DCE775', '서대문구': '#FFF176', '마포구': '#FFD54F', '양천구': '#FFB74D',
  '강서구': '#FF8A65', '구로구': '#A1887F', '금천구': '#90A4AE', '영등포구': '#E0E0E0', '동작구': '#B0BEC5',
  '관악구': '#78909C', '서초구': '#8D6E63', '강남구': '#5D4037', '송파구': '#455A64', '강동구': '#37474F'
};

const SeoulMap = () => {
  const [geoData, setGeoData] = useState<GeoJSON | null>(null);
  const [hoveredDong, setHoveredDong] = useState<Feature | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically load the JSON data
    import('../data/seoul_dongs_merged.json').then((data) => {
      setGeoData(data.default as unknown as GeoJSON);
    });
  }, []);

  if (!geoData) return <div>Loading Map...</div>;

  // Projection setup
  // Center on Seoul
  const width = 800;
  const height = 600;

  const projection = d3.geoMercator().fitSize([width, height], geoData as any);
  const pathGenerator = d3.geoPath().projection(projection);

  const handleMouseMove = (event: React.MouseEvent, feature: Feature) => {
    setHoveredDong(feature);
    setTooltipPos({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredDong(null);
  };

  const handleClick = (feature: Feature) => {
    // Generate a proper slug or ID to navigate
    // We used "GuName-DongName" as slug in the merge script
    // We should probably sanitize it for URL
    // Actually Astro supports UTF-8 in URLs, but safer to encode or map
    // For now, let's assume the slug property from JSON is used.
    // However, the slug in JSON might contain spaces or Korean characters.
    // Let's rely on the slug generated in the JSON.
    const slug = feature.properties.slug;
    window.location.href = `/dong/${slug}`;
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-zinc-900" ref={mapRef}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-4xl max-h-4xl">
        <g>
          {geoData.features.map((feature, i) => {
            const path = pathGenerator(feature as any);
            const guName = feature.properties.guName;
            const color = guPalette[guName] || '#ccc';
            const isHovered = hoveredDong === feature;

            return (
              <path
                key={i}
                d={path || ''}
                fill={color}
                stroke="#fff"
                strokeWidth={isHovered ? 2 : 0.5}
                className={clsx(
                  "transition-all duration-200 cursor-pointer hover:opacity-80",
                  isHovered ? "z-10" : "z-0"
                )}
                style={{
                  filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
                  opacity: isHovered ? 1 : 0.7
                }}
                onMouseMove={(e) => handleMouseMove(e, feature)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(feature)}
              />
            );
          })}
        </g>
      </svg>

      {hoveredDong && (
        <div
          className="fixed pointer-events-none bg-black/80 text-white px-3 py-1 rounded text-sm z-50 transform -translate-x-1/2 -translate-y-full mt-[-10px]"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div className="font-bold">{hoveredDong.properties.dongName}</div>
          <div className="text-xs text-gray-300">{hoveredDong.properties.guName}</div>
        </div>
      )}
    </div>
  );
};

export default SeoulMap;
