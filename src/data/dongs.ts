export interface DongRecord {
  slug: string;
  nameKo: string;
  nameEn: string;
  district: string;
  summary: string;
  mapPath?: string;
  instagramUrl?: string;
  youtubeId?: string;
  soundcloudEmbedUrl?: string;
  hashtags?: string[];
  alternateSlugs?: string[];
  featureCode?: string;
  featured?: boolean;
}

function hashtagUrl(label: string) {
  if (!label) return undefined;
  const encoded = encodeURIComponent(label.replace(/^#/, ''));
  return `https://www.instagram.com/explore/tags/${encoded}/`;
}

export const dongRecords: DongRecord[] = [
  {
    slug: 'ikseon-dong',
    nameKo: '익선동',
    nameEn: 'Ikseon-dong',
    district: '종로구',
    summary:
      '골목 가득한 한옥과 카페, 공방이 공존하는 익선동은 서울 실록이 가장 먼저 기록한 동네입니다. 느리게 흐르는 한옥 사이에서 시간을 쌓아갑니다.',
    mapPath: 'M320 110 L420 80 L480 150 L430 220 L320 200 Z',
    instagramUrl: hashtagUrl('익선동'),
    youtubeId: 'dQw4w9WgXcQ',
    hashtags: ['익선동', 'ikseondong', 'ikseon'],
    featured: true
  },
  {
    slug: 'myeong-dong',
    nameKo: '명동',
    nameEn: 'Myeong-dong',
    district: '중구',
    summary:
      '번화한 상권과 골목의 잔상이 공존하는 명동은 도시의 리듬을 실험하는 필드 레코딩 장소입니다. 밤의 빛과 소리를 기록합니다.',
    mapPath: 'M410 230 L510 210 L560 280 L500 330 L410 300 Z',
    instagramUrl: hashtagUrl('명동'),
    soundcloudEmbedUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293',
    hashtags: ['명동', 'myeongdong'],
    featured: true
  },
  {
    slug: 'itaewon-dong',
    nameKo: '이태원동',
    nameEn: 'Itaewon-dong',
    district: '용산구',
    summary:
      '다국적 문화가 교차하는 이태원은 밤과 낮의 표정이 극명하게 갈리는 동네입니다. 서울 실록은 상인의 목소리와 거리의 사운드를 수집합니다.',
    mapPath: 'M500 330 L590 340 L640 410 L560 460 L480 400 Z',
    instagramUrl: hashtagUrl('이태원동'),
    youtubeId: '3JZ_D3ELwOQ',
    hashtags: ['이태원동', 'itaewondong', 'itaewon'],
    featured: true
  },
  {
    slug: 'apgujeong-dong',
    nameKo: '압구정동',
    nameEn: 'Apgujeong-dong',
    district: '강남구',
    summary:
      '한강과 맞닿은 압구정은 새로움과 향수가 교차하는 강남의 대표 동네입니다. 유유히 흐르는 강변의 빛을 기록합니다.',
    mapPath: 'M520 460 L610 470 L660 540 L570 580 L500 520 Z',
    instagramUrl: hashtagUrl('압구정동'),
    hashtags: ['압구정동', 'apgujeongdong', 'apgujeong'],
    featured: true
  },
  {
    slug: 'hongdae',
    nameKo: '홍대입구',
    nameEn: 'Hongdae',
    district: '마포구',
    summary:
      '자유로운 예술가와 버스커가 모이는 홍대는 즉흥성과 에너지가 넘칩니다. 기록팀은 거리 공연과 그래피티를 기록합니다.',
    mapPath: 'M240 260 L330 230 L380 300 L320 370 L240 330 Z',
    instagramUrl: hashtagUrl('홍대'),
    soundcloudEmbedUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/294',
    hashtags: ['홍대', 'hongdae', 'hongdaeipgu'],
    featured: true
  },
  {
    slug: 'yeonnam-dong',
    nameKo: '연남동',
    nameEn: 'Yeonnam-dong',
    district: '마포구',
    summary:
      '걷기 좋은 연남동은 골목의 작은 가게와 산책자의 발자국이 기억으로 남는 곳입니다. 골목 산책 지도를 만들어 공유합니다.',
    mapPath: 'M200 330 L280 310 L330 380 L260 420 L200 380 Z',
    instagramUrl: hashtagUrl('연남동'),
    hashtags: ['연남동', 'yeonnamdong', 'yeonnam'],
    featured: true
  },
  {
    slug: 'seongsu-dong',
    nameKo: '성수동',
    nameEn: 'Seongsu-dong',
    district: '성동구',
    summary:
      '공장과 카페, 스튜디오가 공존하는 성수동은 산업과 문화가 만나 새로운 결을 만듭니다. 공간의 변화를 기록합니다.',
    mapPath: 'M360 360 L450 340 L500 410 L430 460 L350 420 Z',
    instagramUrl: hashtagUrl('성수동'),
    youtubeId: '2Vv-BfVoq4g',
    hashtags: ['성수동', 'seongsudong', 'seongsu'],
    featured: true
  },
  {
    slug: 'songridan-gil',
    nameKo: '송리단길',
    nameEn: 'Songridan-gil',
    district: '송파구',
    summary:
      '석촌호수와 맞닿은 송리단길은 산책자의 기억과 맛의 기록이 어우러진 동네입니다. 계절마다 변하는 호수의 빛을 담습니다.',
    mapPath: 'M420 470 L510 450 L560 520 L490 560 L410 520 Z',
    instagramUrl: hashtagUrl('송리단길'),
    hashtags: ['송리단길', 'songridangil', 'songnidan'],
    featured: true
  },
  {
    slug: 'heukseok-dong',
    nameKo: '흑석동',
    nameEn: 'Heukseok-dong',
    district: '동작구',
    summary:
      '한강 남단과 맞닿은 흑석동은 오래된 시장과 새로운 주거지가 공존하는 변화의 현장입니다. 서울 실록은 사람들의 속도를 기록합니다.',
    instagramUrl: hashtagUrl('흑석동'),
    hashtags: ['흑석동', 'heukseokdong', 'heukseok'],
    featured: false
  },
  {
    slug: 'hwigyeong-dong',
    nameKo: '휘경동',
    nameEn: 'Hwigyeong-dong',
    district: '동대문구',
    summary:
      '청량리와 제기동 사이에 놓인 휘경동은 오래된 골목과 대학가의 에너지가 함께 살아 있습니다. 지역 주민의 목소리를 담습니다.',
    instagramUrl: hashtagUrl('휘경동'),
    hashtags: ['휘경동', 'hwigyeongdong', 'hwigyeong'],
    featured: false
  },
  {
    slug: 'huam-dong',
    nameKo: '후암동',
    nameEn: 'Huam-dong',
    district: '용산구',
    summary:
      '남산 자락의 후암동은 언덕과 계단, 오래된 다세대 주택이 만들어내는 풍경으로 기억됩니다. 서울 실록은 골목마다의 생활 기록을 모읍니다.',
    instagramUrl: hashtagUrl('후암동'),
    hashtags: ['후암동', 'huamdong', 'huam'],
    featured: false
  }
];

export function getDongBySlug(slug: string) {
  return (
    dongRecords.find((dong) => dong.slug === slug) ||
    dongRecords.find((dong) => dong.alternateSlugs?.includes(slug)) ||
    null
  );
}
