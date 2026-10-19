# AGENTS.md

설코딩 앱 모음(`apps.seolcoding.com`) 원본이다. 정본 규칙은 `~/900_System/AGENTS.md`, 관련 저장소 관계는 agent-os 저장소(`seolcoding/seolcoding-agent-os`)의 `AGENTS.md`를 따른다. 홈페이지·블로그는 저장소 `seolcoding/seolcoding.com`이다.

## 만드는 법

- 앱 더하기·고치기: `data/apps.yaml`만 고친다. 맞는 묶음의 `apps` 아래에 `name`·`url`·`status`·`summary` 네 줄을 더한다. 화면 순서는 파일 순서다. 같은 주소가 줄마다 반복되는 묶음은 `showHost: false`로 주소 줄을 숨긴다.
- 상태(`status`)는 모든 앱에 글자로 적는다: 운영 중 / 체험용 데모 / 개발 중 / 운영 중단. 뜻은 `data/apps.yaml` 머리말에, 글자와 개발 중 안내 문구는 `hugo.toml`의 `[params.status]`에 있다. **운영 중은 실제로 열어 확인한 것만 적는다.** 개발 중은 링크를 걸고 안내 문구를 함께 보이고, 운영 중단은 링크를 걸지 않는다. 상태는 색으로 나누지 않고 글자로만 알린다.
- 사이트 안 주소는 `.html` 없이 쓴다(`/showcases/ces-quiz`). Cloudflare Pages가 `.html` 주소를 확장자 없는 주소로 한 번 더 넘기기 때문이다.
- 사이트 문구(제목·소개·404·바닥글)는 `hugo.toml`의 `[params]`에 있다. `[대괄호]`는 형광펜이 된다. 템플릿에 문구를 쓰지 않는다.
- 공개하지 않는 것(고객사 작업, 미공개·죽은 앱)은 넣지 않는다. 애매하면 사용자에게 묻는다.
- 미리 보기: `hugo server` → <http://localhost:1313/>. 주소 넘기기(`static/_redirects`)까지 보려면 `hugo --gc --minify` 뒤 `wrangler pages dev public`.
- 배포: `main`에 push하면 GitHub Actions가 Cloudflare Pages 프로젝트 `seolcoding-apps`로 올린다. push 전에 사용자 승인을 받는다.

## 들어 있는 것

- `static/showcases/`: CES 2026 등 한 장짜리 인터랙티브 페이지(홈페이지에서 옮겨 옴). 보라색은 살구·하늘색으로 바꿨다. 글꼴(Noto Sans KR·Black Han Sans)과 그라데이션은 예전 그대로인 예외다. 옛 목록 페이지(`/showcases/`)는 지우고 홈의 쇼케이스 묶음으로 넘긴다.
- 프롬프트 튜토리얼은 이 저장소에 없다. 홈페이지(`seolcoding.com`)의 `/mini-apps/prompt-tutorial/`에 그대로 있고, 목록은 그 주소(`https://www.seolcoding.com/mini-apps/prompt-tutorial/`)로 링크한다. 이 사이트의 `/mini-apps/prompt-tutorial/*`는 홈페이지로 302로 넘긴다.
- `static/_redirects`: 예전 이 주소에서 돌던 다잼 경로를 `dajam.seolcoding.com`의 같은 경로로 넘긴다(QR·공유 링크 보호). 참여 코드 루트(`/?code=…`)는 홈 화면 스크립트가 넘긴다. `static/sw.js`는 다잼이 남긴 서비스 워커를 지운다.

## 나중에 할 일: 프롬프트 튜토리얼 옮겨 오기

- 튜토리얼은 `https://openrouter-proxy.seolcoding.workers.dev/v1`(Worker 프록시)로 AI를 부른다. 이 Worker는 지금 `https://seolcoding.com`에서 온 요청만 받는다(2026-10-09 확인: apps.seolcoding.com은 403). 그래서 홈페이지에 남겨 두었다.
- 옮기는 순서: ① Worker 허용 주소에 `https://apps.seolcoding.com`(미리 보기용 `https://seolcoding-apps.pages.dev`도)을 더한다(Worker 원본은 이 저장소에 없고 사용자 승인이 필요하다). ② 홈페이지 저장소의 튜토리얼 원본과 빌드 단계를 이 저장소로 가져온다(이 저장소 커밋 `0901260`까지의 `apps/prompt-tutorial/`와 deploy.yml의 Bun 단계가 본보기다). ③ `data/apps.yaml`의 url을 `/mini-apps/prompt-tutorial/`로 바꾸고 `static/_redirects`의 튜토리얼 두 줄을 지운다. ④ 홈페이지에서 이리로 넘긴다.
- API 키를 `VITE_*` 환경 변수나 `.env`로 넣고 빌드하지 않는다. 브라우저 코드에 그대로 박힌다. CI는 올라갈 파일 전체(`public/`)에 키가 보이면 멈춘다.

## 디자인

- 테마 없이 작은 레이아웃(`layouts/`)만 쓴다. 선과 여백으로 나누고 상자·그림자는 쓰지 않는다.
- 디자인은 툴킷 `skills/seolcoding-design`이 원본이다. `static/seolcoding/`과 `static/favicon.svg`는 거기서 복사한 것이니 여기서 고치지 말고 원본을 고친 뒤 다시 복사한다.
- 배치는 `assets/css/site.css` 한 파일에 있다. 색은 `--c-*` 변수만 쓴다.
- 확인: 390px·1440px, 밝은/어두운 화면에서 가로로 넘치지 않는지 본다.
