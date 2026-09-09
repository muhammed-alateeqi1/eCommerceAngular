
# 🛍️ eCommerce Angular SSR

A **eCommerce frontend** built with **Angular 17** standalone components. It covers authentication, routing, product browsing, and cart management.

The production build is **client-rendered** and deploys as a static SPA. An optional SSR/prerender build is kept behind a separate configuration — see [Rendering modes](#-rendering-modes).

---

## 📦 Project Structure

```
eCommerceAngular/
├── src/
│   ├── app/
│   │   ├── layout/           # Pages and components (home, login, register, cart...)
│   │   ├── shared/           # Services, interfaces, guards
│   │   └── app.routes.ts     # All route definitions
├── server.ts                 # Express SSR entry point (optional `ssr` build only)
├── angular.json              # Angular CLI config
├── vercel.json               # Vercel output dir + SPA fallback
├── package.json              # Dependencies & scripts
```

---

## 🚀 Features

- ✅ Angular 17 (Standalone Components, lazy-loaded routes)
- 🔐 JWT Authentication with route protection
- 🛒 Shopping Cart with persistent storage
- 📃 Reactive Forms with validation (Login/Register)
- 📦 Tailwind CSS + Flowbite UI components
- 🔔 Toast notifications (ngx-toastr)
- 📄 PDF Export support (html2pdf.js)

---

## 📥 Installation

1. Clone the repository:

```bash
git clone https://github.com/muhammed-alateeqi1/eCommerceAngular.git
cd eCommerceAngular
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm start
```

---

## 🖥️ Rendering modes

**Production build (default) — client-rendered SPA:**

```bash
npm run build          # -> dist/browser
```

**Optional SSR + prerender build:**

```bash
npm run build:ssr      # -> dist/browser + dist/server
npm run serve:ssr      # http://localhost:4000
```

> ⚠️ SSR is **not** used by the default build. `authGuard` reads its login state
> from a `BehaviorSubject` that is only populated in the browser, so on the server
> every guarded route is rejected and prerendering emits the **login page for every
> route**. Fix the guard to be platform-aware before turning SSR back on for
> production.

---

## ☁️ Deployment (Vercel)

`vercel.json` already contains everything needed:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist/browser` |
| Rewrites | all non-asset paths → `/index.html` (SPA deep links) |

Node version is pinned via `engines` in `package.json` and `.nvmrc` to the range
Angular 17 supports (`^18.13.0 || ^20.9.0`). If a build fails with a Node version
error, set **Project Settings → General → Node.js Version** to **20.x** in Vercel.

```bash
# from the repo root
vercel            # preview deployment
vercel --prod     # production deployment
```

---

## 🌐 Environment Configuration

API configuration is located in:

```bash
src/app/base/Environment.ts
```

`Environment.SiteURL` resolves from `window.location.origin` at call time, so the
checkout redirect returns to whatever origin the app is served from — no per-environment
edit is needed before deploying.

> 🔄 Still worth doing:
> - Move `Environment.baseUrl` into Angular's `environments/` files or build-time defines

---

## 🔐 Authentication
- JWT stored in `localStorage`
- AuthGuard checks login state
- Token is decoded via `jwt-decode` to extract user identity
- BehaviorSubject is used to hold logged-in user info
---

## ⚠️ Security Recommendations (Pre-Production)

> ✔️ = Implemented
> ❗ = Highly recommended
> 🔄 = Suggested enhancement

| Recommendation | Status | Notes |
|----------------|--------|-------|
| Remove `console.log` in production code | ✔️ | Already removed from login/register/services |
| Verify JWT expiration in `auth.guard.ts` | ✔️ | Patched with `exp` check |
| Avoid relying on `localStorage` for token | ❗ | Use `HttpOnly` cookies via backend instead |
| Use Express middleware: `helmet`, `cors`, `rate-limit` | ❗ | Add to `server.ts` for added protection |
| Sanitize user inputs | 🔄 | Add `ngx-mask` or Angular sanitizers where needed |
| Avoid direct use of `headers.host` in SSR engine | ❗ | Use a trusted `BASE_URL` instead |
| Apply Content Security Policy (CSP) | 🔄 | Set strict headers in Express |
| SSR file path safety | ✔️ | SSR static serving is safe but should validate base paths |
| No API keys or secrets in frontend | ✔️ | All API endpoints are generic |
| Avoid CDN for critical assets | ✔️ | FontAwesome CSS + webfonts are self-hosted from the npm package |

---

## ✨ UI Technologies

- Tailwind CSS + Flowbite
- Font Awesome Icons
- Responsive design
- Toast feedback (ngx-toastr)

---



> Coverage and e2e testing are recommended for production.

---

## 📌 Suggested Improvements

- [ ] Angular HTTP Interceptor for auth token injection
- [ ] Use Angular environments + .env file for configs
- [ ] Implement lazy loading for cart/products modules
- [ ] Add logout auto-expiry via token `exp`
- [ ] Translate form & alert messages (i18n)
- [ ] Make `authGuard` platform-aware so SSR/prerender can be re-enabled

---

## 👤 Author

Developed by [Muhammed Al-Ateeqi](https://github.com/muhammed-alateeqi1)  
📧 Email: mu.alateeqi@gmail.com

---

## 📄 License

MIT License

---

## 📚 Documentation & Contribution

For documentation updates or to contribute:

1. Fork this repository
2. Create a new feature branch
3. Submit pull request

For API specs or architecture diagram, refer to the `/docs` directory (to be created).

