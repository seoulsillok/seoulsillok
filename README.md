# Seoul Sillok (서울실록)

서울의 215개 동네를 실제 경계 위에서 탐색하는 웹사이트입니다. 한 동네에 여러 Instagram 포스트를 연결할 수 있습니다.

## 🗺 동네 지도

`src/data/seoul.ts`의 동네 목록이 페이지 목록입니다. 지도는 기존 저장소의 `seoul-legal-dongs.geojson` 법정동 경계를 기본 단위로 사용합니다. 법정동과 행정동의 이름이 다를 때는 `seoul-dongs-2017.geojson`의 행정동 경계를 참고해 법정동을 페이지에 배정합니다. `봉천동`은 하나의 법정동으로, `천연동`은 여러 법정동을 묶은 하나의 페이지로 표시합니다.

`src/data/seoul-dong-crosswalk.csv`에서 각 법정동 코드가 어느 페이지에 속하는지 확인할 수 있습니다. 경계를 재생성하려면 Shapely 2를 설치한 뒤 저장소 루트에서 `python3 scripts/build-seoul-boundaries.py`를 실행하세요. 생성된 `seoul-dong-boundaries.geojson`이 실제 웹사이트에서 사용됩니다. 입력 경계 자료가 바뀌면 교차표와 지도도 다시 생성해야 합니다.

## 📷 Instagram 포스트 연결

포스트 URL을 알고 있다면 `src/data/instagram-posts.manual.json`에 다음 형식으로 추가하세요. 키는 `구 코드:동 이름`이라 같은 이름의 동도 구별됩니다. 포스트와 릴 URL을 지원하며 한 동에 여러 개를 넣을 수 있습니다.

```json
{
  "songpa:풍납동": [
    { "title": "풍납동 산책로", "url": "https://www.instagram.com/p/POST_ID/" }
  ]
}
```

`npm run build`는 수동 링크를 항상 보존합니다. Instagram API with Instagram Login 접근 권한이 있다면 GitHub Actions secret에 `INSTAGRAM_ACCESS_TOKEN`을 설정하면 빌드할 때 캡션 첫 줄에서 동 이름을 찾아 포스트를 추가합니다. `INSTAGRAM_ACCESS_TOKEN` 환경 변수를 로컬에서 설정하고 `npm run import-instagram`을 실행하면 찾은 링크를 수동 JSON에 저장해 토큰 만료 뒤에도 유지할 수 있습니다. 같은 이름의 동이 여러 구에 있고 구를 구분할 수 없으면 자동 배정을 건너뜁니다. 토큰은 Git에 저장하지 마세요.

토큰 발급 절차는 [Meta의 Instagram Login 시작 가이드](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/get-started)를 따릅니다. Instagram 계정이 Business 또는 Creator 계정이어야 합니다. Meta for Developers에서 Business 유형 앱을 만들고 Instagram API를 추가한 뒤, 앱 대시보드의 `Instagram → API setup with Instagram business login`에서 `@seoulsillok` 옆의 `Generate token`을 선택하세요. 대시보드에서 생성한 토큰은 60일간 유효합니다. 사용자 이름만으로는 포스트 API에 접근할 수 없습니다.

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

이 프로젝트는 `wrangler.json`을 사용하는 Cloudflare Workers 사이트입니다.

1. GitHub 저장소의 `Settings → Secrets and variables → Actions`에 Cloudflare Workers 배포 권한이 있는 `CF_API_TOKEN`과 `CF_ACCOUNT_ID`를 추가하세요.
2. `main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 Node 22로 빌드하고 Wrangler 4로 배포합니다.
3. 도메인 연결은 Cloudflare Workers 대시보드에서 `seoulsillok.com`에 설정하세요.

로컬에서 미리 확인하려면:

```bash
# 빌드 후 wrangler dev로 프리뷰
npm run preview
```

세션 기능을 사용한다면 Cloudflare에서 `SESSION` KV 바인딩도 설정해야 합니다.


## 🌐 소셜 미디어

- Instagram: [@seoulsillok](https://instagram.com/seoulsillok)
- YouTube: [@seoulsillok](https://youtube.com/@seoulsillok)
- TikTok: [@seoulsillok](https://tiktok.com/@seoulsillok)
- SoundCloud: [seoulsillok](https://soundcloud.com/seoulsillok)

## 📝 라이선스

MIT License © 2025 Seoul Sillok
