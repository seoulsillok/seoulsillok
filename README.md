# Seoul Sillok (서울실록)

서울의 미래를 기록합니다. 각 동네의 이야기를 Instagram, YouTube, TikTok, SoundCloud를 통해 공유합니다.

## 🏛 프로젝트 구조

```text
/
├── public/
│   └── images/
│       ├── instagram.svg
│       ├── youtube.svg
│       ├── tiktok.svg
│       └── soundcloud.svg
├── src/
│   ├── components/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       └── dong/
│           └── index.astro
└── package.json
```

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## ☁️ Cloudflare 배포

이 프로젝트는 Cloudflare Workers(또는 Workers Sites)로 배포되도록 설정되어 있습니다. 아래는 빠른 설정 방법입니다.

1. `wrangler.toml`에 `account_id`, `zone_id`(도메인으로 배포 시) 및 필요한 KV 네임스페이스 ID 를 채우세요.
2. GitHub 레포에서 `Settings -> Secrets`에 `CF_API_TOKEN`(Deploy 권한 포함)과 `CF_ACCOUNT_ID`(선택)를 추가하세요.
3. main 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 자동으로 빌드 후 배포합니다.

로컬에서 미리 확인하려면:

```bash
# 빌드 후 wrangler dev로 프리뷰
npm run preview
```

참고: `@astrojs/cloudflare` 어댑터는 일부 런타임 바인딩(예: KV)을 필요로 합니다. 빌드 시 표시되는 바인딩 경고는 `wrangler.toml` 또는 Cloudflare 대시보드에서 바인딩을 생성해 해결하세요.


## 🌐 소셜 미디어

- Instagram: [@seoulsillok](https://instagram.com/seoulsillok)
- YouTube: [@seoulsillok](https://youtube.com/@seoulsillok)
- TikTok: [@seoulsillok](https://tiktok.com/@seoulsillok)
- SoundCloud: [seoulsillok](https://soundcloud.com/seoulsillok)

## 📝 라이선스

MIT License © 2025 Seoul Sillok
