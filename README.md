# seolcoding-apps

설코딩이 만든 서비스와 작은 앱을 모은 사이트 `apps.seolcoding.com`의 원본이다(Hugo 0.155.3, 테마 없음).

```bash
hugo server            # 미리 보기 http://localhost:1313/
hugo --gc --minify     # 빌드 → public/
```

- 앱 목록: `data/apps.yaml`
- 사이트 문구: `hugo.toml`의 `[params]`
- 배치: `layouts/`, `assets/css/site.css` (디자인 원본은 툴킷 `skills/seolcoding-design`)
- 배포: `main` push → GitHub Actions → Cloudflare Pages `seolcoding-apps`

자세한 규칙은 `AGENTS.md`.
