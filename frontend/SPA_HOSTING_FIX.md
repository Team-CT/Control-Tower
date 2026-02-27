# SPA 호스팅 403 (Access Denied) 해결

`https://khair-controlltower.site/account-activation?token=...` 접속 시  
**403 Forbidden** + `<Error><Code>AccessDenied</Code></Error>` XML이 나오면  
**프론트엔드가 S3 + CloudFront 등 정적 호스팅**에 올라가 있고,  
`/account-activation` 같은 경로에 해당 **파일이 없어서** 발생하는 현상입니다.

React 등 SPA는 **모든 경로**에서 같은 `index.html`을 내려줘야 하고,  
라우팅은 브라우저에서 처리합니다.

---

## 1) AWS CloudFront 사용 시 (권장)

1. **AWS Console** → **CloudFront** → 해당 배포 선택
2. **Error Pages** 탭 → **Create Custom Error Response**
3. 아래처럼 **두 개** 만듦:

| 설정 | 403용 | 404용 |
|------|--------|--------|
| HTTP Error Code | 403 | 404 |
| Customize Error Response | Yes | Yes |
| Response Page Path | `/index.html` | `/index.html` |
| HTTP Response Code | 200 | 200 |
| TTL | 0 또는 300 | 0 또는 300 |

4. 저장 후 **캐시 무효화** (Invalidations):  
   경로에 `/index.html` 또는 `/*` 입력 후 실행

이후 `https://khair-controlltower.site/account-activation?token=xxx` 로 접속하면  
403/404가 나와도 `index.html`(200)이 반환되고, React 라우터가 `/account-activation`를 처리합니다.

---

## 2) S3 정적 웹사이트 호스팅만 사용 시 (CloudFront 없음)

1. **S3** → 해당 버킷 → **Properties** → **Static website hosting**
2. **Error document**를 `index.html`로 설정  
   (또는 403/404 에러 문서를 `index.html`로 지정할 수 있으면 그렇게 설정)
3. S3 정적 호스팅은 **403에 대한 에러 문서**를 지원하지 않을 수 있음.  
   이 경우 **CloudFront를 앞에 두고**, 위 1)처럼 CloudFront Error Pages에서 403/404 → `index.html`(200) 설정을 하는 것이 좋습니다.

---

## 3) 다른 호스팅 (Vercel, Netlify, Amplify 등)

- **Vercel / Netlify**: SPA이면 기본적으로 모든 경로를 `index.html`로 보내주므로,  
  빌드/배포 설정이 SPA로 되어 있는지만 확인하면 됩니다.
- **Amplify**: Console에서 **App settings** → **Rewrites and redirects**에  
  `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)(/[^.]+)*/>  /index.html  200`  
  같은 규칙이 있는지 확인하고, 없으면 추가합니다.

---

정리: **403 + Access Denied XML**은 백엔드가 아니라 **프론트 호스팅(S3/CloudFront)** 설정 문제이므로,  
위처럼 **403·404 시 `index.html`을 200으로 반환**하도록 바꾸면 됩니다.
