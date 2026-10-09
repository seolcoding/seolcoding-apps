# AGENTS.md

설코딩 앱 모음(`apps.seolcoding.com`) 원본이다. 정본 규칙은 `~/900_System/AGENTS.md`, 관련 저장소 관계는 `~/100_Dev/seolcoding-agent-os/AGENTS.md`를 따른다.

## 만드는 법

- 앱 더하기·고치기: `data/apps.yaml`만 고친다. 맞는 묶음의 `apps` 아래에 `name`·`url`·`summary` 세 줄을 더한다. 화면 순서는 파일 순서다.
- 사이트 문구(제목·소개·404·바닥글)는 `hugo.toml`의 `[params]`에 있다. `[대괄호]`는 형광펜이 된다. 템플릿에 문구를 쓰지 않는다.
- 공개하지 않는 것(고객사 작업, 미공개·죽은 앱)은 넣지 않는다. 애매하면 사용자에게 묻는다.
- 미리 보기: `hugo server` → <http://localhost:1313/>. 주소 넘기기(`static/_redirects`)까지 보려면 `hugo --gc --minify` 뒤 `wrangler pages dev public`.
- 배포: `main`에 push하면 GitHub Actions가 Cloudflare Pages 프로젝트 `seolcoding-apps`로 올린다. push 전에 사용자 승인을 받는다.

## 들어 있는 것

- `static/showcases/`: CES 2026 등 한 장짜리 인터랙티브 페이지(홈페이지에서 옮겨 옴).
- `apps/prompt-tutorial/`: 프롬프트 튜토리얼 원본(Vite·bun). CI가 빌드해 `static/mini-apps/prompt-tutorial/`에 넣는다. 저장소에 든 빌드본은 bun 없이 미리 보기용이다.
  - API 키를 `VITE_*` 환경 변수나 `.env`로 넣고 빌드하지 않는다. 브라우저 코드에 그대로 박힌다. 운영은 Worker 프록시를 쓴다. CI는 빌드에 키가 보이면 멈춘다.
- `static/_redirects`: 예전 이 주소에서 돌던 다잼 경로를 `dajam.seolcoding.com`의 같은 경로로 넘긴다(QR·공유 링크 보호). 참여 코드 루트(`/?code=…`)는 홈 화면 스크립트가 넘긴다. `static/sw.js`는 다잼이 남긴 서비스 워커를 지운다.

## 디자인

- 테마 없이 작은 레이아웃(`layouts/`)만 쓴다. 선과 여백으로 나누고 상자·그림자는 쓰지 않는다.
- 디자인은 툴킷 `skills/seolcoding-design`이 원본이다. `static/seolcoding/`과 `static/favicon.svg`는 거기서 복사한 것이니 여기서 고치지 말고 원본을 고친 뒤 다시 복사한다.
- 배치는 `assets/css/site.css` 한 파일에 있다. 색은 `--c-*` 변수만 쓴다.
- 확인: 390px·1440px, 밝은/어두운 화면에서 가로로 넘치지 않는지 본다.
