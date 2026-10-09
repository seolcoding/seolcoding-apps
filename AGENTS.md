# AGENTS.md

설코딩 앱 모음(`apps.seolcoding.com`) 원본이다. 정본 규칙은 `~/900_System/AGENTS.md`, 관련 저장소 관계는 `~/100_Dev/seolcoding-agent-os/AGENTS.md`를 따른다.

## 만드는 법

- 앱 더하기·고치기: `data/apps.yaml`만 고친다. 맞는 묶음의 `apps` 아래에 `name`·`url`·`summary` 세 줄을 더한다. 화면 순서는 파일 순서다. 같은 주소가 줄마다 반복되는 묶음은 `showHost: false`로 주소 줄을 숨긴다.
- 사이트 안 주소는 `.html` 없이 쓴다(`/showcases/ces-quiz`). Cloudflare Pages가 `.html` 주소를 확장자 없는 주소로 한 번 더 넘기기 때문이다.
- 사이트 문구(제목·소개·404·바닥글)는 `hugo.toml`의 `[params]`에 있다. `[대괄호]`는 형광펜이 된다. 템플릿에 문구를 쓰지 않는다.
- 공개하지 않는 것(고객사 작업, 미공개·죽은 앱)은 넣지 않는다. 애매하면 사용자에게 묻는다.
- 미리 보기: `hugo server` → <http://localhost:1313/>. 주소 넘기기(`static/_redirects`)까지 보려면 `hugo --gc --minify` 뒤 `wrangler pages dev public`.
- 배포: `main`에 push하면 GitHub Actions가 Cloudflare Pages 프로젝트 `seolcoding-apps`로 올린다. push 전에 사용자 승인을 받는다.

## 들어 있는 것

- `static/showcases/`: CES 2026 등 한 장짜리 인터랙티브 페이지(홈페이지에서 옮겨 옴). 보라색은 살구·하늘색으로 바꿨다. 글꼴(Noto Sans KR·Black Han Sans)과 그라데이션은 예전 그대로인 예외다. 옛 목록 페이지(`/showcases/`)는 지우고 홈의 쇼케이스 묶음으로 넘긴다.
- `apps/prompt-tutorial/`: 프롬프트 튜토리얼 원본(Vite·bun). CI가 `static/mini-apps/prompt-tutorial/`을 비우고 새로 빌드해 넣는다. 저장소에 든 빌드본은 bun 없이 미리 보기용이다. 원본을 고치면 `bun run build` 뒤 그 폴더를 비우고 `dist/`를 복사해 함께 커밋한다.
  - API 키를 `VITE_*` 환경 변수나 `.env`로 넣고 빌드하지 않는다. 브라우저 코드에 그대로 박힌다. 운영은 Worker 프록시를 쓴다. CI는 올라갈 파일 전체(`public/`)에 키가 보이면 멈춘다.
- `static/_redirects`: 예전 이 주소에서 돌던 다잼 경로를 `dajam.seolcoding.com`의 같은 경로로 넘긴다(QR·공유 링크 보호). 참여 코드 루트(`/?code=…`)는 홈 화면 스크립트가 넘긴다. `static/sw.js`는 다잼이 남긴 서비스 워커를 지운다.

## 배포 전에 할 일

- **프롬프트 튜토리얼 Worker 허용 주소.** 운영 빌드는 `https://openrouter-proxy.seolcoding.workers.dev/v1`로 AI를 부른다. 이 Worker는 지금 `https://seolcoding.com`에서 온 요청만 받는다(2026-10-09 확인: apps.seolcoding.com은 403). DNS를 넘기기 전에 Worker 허용 주소에 `https://apps.seolcoding.com`(미리 보기용으로 `https://seolcoding-apps.pages.dev`도)을 더해야 한다. Worker 원본은 이 저장소에 없고 바꾸려면 사용자 승인이 필요하다. 그 전까지 홈페이지의 `/mini-apps/prompt-tutorial/`은 그대로 두고 이리로 넘기지 않는다.

## 디자인

- 테마 없이 작은 레이아웃(`layouts/`)만 쓴다. 선과 여백으로 나누고 상자·그림자는 쓰지 않는다.
- 디자인은 툴킷 `skills/seolcoding-design`이 원본이다. `static/seolcoding/`과 `static/favicon.svg`는 거기서 복사한 것이니 여기서 고치지 말고 원본을 고친 뒤 다시 복사한다.
- 배치는 `assets/css/site.css` 한 파일에 있다. 색은 `--c-*` 변수만 쓴다.
- 확인: 390px·1440px, 밝은/어두운 화면에서 가로로 넘치지 않는지 본다.
