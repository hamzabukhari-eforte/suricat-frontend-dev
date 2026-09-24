# Azure deployment & custom domain (dev)

Guide for deploying the Suricat public marketing site (`suricat-frontend`) to Azure App Service and attaching the custom domain **suricat.ai**.

This document reflects the **live dev setup** as of the first production-facing public deploy:

| Item | Value |
|------|--------|
| Azure App Service | `public-dev-suricat` |
| Default hostname | `public-dev-suricat-dafecdgzg4hhg4gz.westus3-01.azurewebsites.net` |
| Custom domains | `suricat.ai`, `www.suricat.ai` |
| Region (from hostname) | West US 3 |
| DNS registrar | Namecheap |
| Deploy workflow | `.github/workflows/deploy-public-app-dev.yml` |
| Git branch | `dev` |
| Runtime | Node.js 24 LTS |
| App framework | Next.js (`output: 'standalone'`) |

Related local/API contract: [public-inquiries-api.md](./public-inquiries-api.md).

---

## Architecture overview

```
GitHub (suricat-frontend / branch: dev)
  └─ workflow: deploy-public-app-dev.yml
       ├─ npm ci + next build (standalone)
       └─ azure/webapps-deploy → public-dev-suricat

Namecheap DNS (BasicDNS)
  ├─ A    @     → App Service outbound IP
  ├─ CNAME www  → *.azurewebsites.net hostname
  └─ TXT  asuid / asuid.www → domain verification ID

Browsers
  ├─ https://suricat.ai
  └─ https://www.suricat.ai
       └─ Azure App Service (public-dev-suricat)
            └─ node server.js  (Next.js standalone)
                 └─ forms → NEXT_PUBLIC_API_URL (Nest API in suricat-apps)
```

**Important:** `NEXT_PUBLIC_*` values are baked in at **build time** in GitHub Actions. Changing the API URL requires updating the GitHub secret and redeploying — App Service app settings alone do not rewrite an already-built Next.js bundle for those vars.

---

## Prerequisites

- Azure subscription with permission to create/manage App Services
- GitHub repo admin (or secrets write) on `suricat-frontend`
- Namecheap login for `suricat.ai`
- Nest API reachable from the browser (CORS must allow `https://suricat.ai` and `https://www.suricat.ai`)

---

## 1. Azure App Service setup

### 1.1 Create the Web App

#### Portal

1. Azure Portal → **App Services** → **Create** → **Web App**
2. **Basics**:
   - **Name**: `public-dev-suricat`
   - **Publish**: Code
   - **Runtime stack**: **Node 24 LTS**
   - **Operating System**: Linux
   - **Region**: choose your plan’s region (this app uses **West US 3**)
   - **App Service plan**: existing shared plan, or create one (e.g. B1 Linux)
3. Review → Create

#### CLI (example)

```bash
az webapp create \
  --resource-group <resource-group> \
  --plan <app-service-plan> \
  --name public-dev-suricat \
  --runtime "NODE|24-lts"
```

### 1.2 Critical deployment app settings (before first deploy)

Portal → **App Services** → **public-dev-suricat** → **Environment variables** → **App settings**:

| Name | Value | Why |
|------|--------|-----|
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `false` | CI already ships a self-contained Next.js standalone package. Oryx must not rebuild/`node_modules` on deploy. |
| `WEBSITE_RUN_FROM_PACKAGE` | `1` | Mounts the deployed zip at `/home/site/wwwroot` so `server.js` is found. |

Apply → Confirm (restarts the app).

```bash
az webapp config appsettings set \
  --resource-group <resource-group> \
  --name public-dev-suricat \
  --settings SCM_DO_BUILD_DURING_DEPLOYMENT=false WEBSITE_RUN_FROM_PACKAGE=1
```

### 1.3 Startup command

Unlike Nx monorepo apps (`node apps/client/server.js`), this repo is a **root-level** Next.js app. Standalone `server.js` is at the **package root**.

Portal → **Configuration** → **General settings** → **Startup Command**:

```text
node server.js
```

```bash
az webapp config set \
  --resource-group <resource-group> \
  --name public-dev-suricat \
  --startup-file "node server.js"
```

### 1.4 Optional App Service notes

- Prefer **HTTPS Only = On** after custom domain SSL is bound (see §4).
- You do **not** need to set `NEXT_PUBLIC_API_URL` on the App Service for the marketing build if CI already injected it at build time. Keeping it in App Settings can still help for documentation/ops consistency, but the running bundle uses the build-time value.
- Ensure the Nest API `CORS_ALLOWED_ORIGINS` (or equivalent) includes:
  - `https://suricat.ai`
  - `https://www.suricat.ai`
  - (optional) `https://public-dev-suricat-dafecdgzg4hhg4gz.westus3-01.azurewebsites.net`

### 1.5 Download publish profile (for GitHub)

1. Portal → **public-dev-suricat** → **Get publish profile** (download XML)
2. Store the full XML contents as a GitHub Actions secret (next section)

---

## 2. GitHub Actions CI/CD

### 2.1 Workflow file

Path: [`.github/workflows/deploy-public-app-dev.yml`](../.github/workflows/deploy-public-app-dev.yml)

| Trigger | Detail |
|---------|--------|
| `push` to `dev` | Only when paths under `app/`, `components/`, `lib/`, `public/`, lockfiles, `next.config.ts`, or this workflow change |
| `workflow_dispatch` | Manual run from Actions tab |
| Skips | `dependabot[bot]` commits |

**Pipeline steps (summary):**

1. Checkout
2. Setup Node **24** + npm cache
3. `npm ci`
4. Validate `APP_NEXT_PUBLIC_API_URL_DEV` is non-empty
5. `npm run build` with:
   - `SURICAT_AZURE_STANDALONE_DEPLOY=true` (disables next/image optimizer writes under read-only wwwroot)
   - `NEXT_PUBLIC_API_URL` from the secret
6. Prepare package:
   - copy `.next/standalone` → `deploy-public`
   - copy `.next/static` → `deploy-public/.next/static`
   - copy `public/` → `deploy-public/public`
7. `azure/webapps-deploy@v2` → app name `public-dev-suricat`

### 2.2 Repository secrets

GitHub → **Settings** → **Secrets and variables** → **Actions** → **Secrets**:

| Secret name | Used as | Purpose |
|-------------|---------|---------|
| `AZURE_PUBLISH_PROFILE_PUBLIC_APP_DEV` | `publish-profile` for `azure/webapps-deploy` | Full App Service publish profile XML for `public-dev-suricat` |
| `APP_NEXT_PUBLIC_API_URL_DEV` | `NEXT_PUBLIC_API_URL` at build time | Nest API base URL including `/api/v1` (e.g. `https://<api-host>/api/v1`) |

How to refresh the publish profile secret:

1. Azure → App Service → **Get publish profile**
2. GitHub → update secret `AZURE_PUBLISH_PROFILE_PUBLIC_APP_DEV` with the new XML
3. Re-run the workflow if deploy auth fails

### 2.3 App build config required for Azure

[`next.config.ts`](../next.config.ts) must keep:

- `output: 'standalone'` — self-contained deploy artifact
- `images.unoptimized` when `SURICAT_AZURE_STANDALONE_DEPLOY === 'true'` — App Service `WEBSITE_RUN_FROM_PACKAGE=1` mounts wwwroot read-only; image optimization cache writes would fail

Local package scripts (from `package.json`):

```bash
npm run build   # next build --webpack
npm run start   # next start -p 4400 (local only; Azure uses node server.js)
```

### 2.4 Manual deploy

1. GitHub → **Actions** → **Deploy Public App (Next.js) to Azure (dev)**
2. **Run workflow** → branch `dev`
3. Confirm job succeeds and browse the default or custom hostname

### 2.5 First-time checklist after workflow lands

- [ ] Secrets `AZURE_PUBLISH_PROFILE_PUBLIC_APP_DEV` and `APP_NEXT_PUBLIC_API_URL_DEV` set
- [ ] App settings `SCM_DO_BUILD_DURING_DEPLOYMENT=false`, `WEBSITE_RUN_FROM_PACKAGE=1`
- [ ] Startup command `node server.js`
- [ ] Workflow green on `dev`
- [ ] Site loads on `*.azurewebsites.net`

---

## 3. Namecheap DNS configuration

Registrar: **Namecheap** for domain **suricat.ai**.

### 3.1 Choose nameservers (required)

On Namecheap → **Domain List** → **suricat.ai** → **Domain** tab → **NAMESERVERS**:

| Option | When to use |
|--------|-------------|
| **Namecheap BasicDNS** ← **use this** | Manage A / CNAME / TXT in Namecheap **Advanced DNS** (recommended) |
| Namecheap Web Hosting DNS | Only if the site is hosted on Namecheap web hosting |
| Custom DNS | Only if nameservers point elsewhere (Cloudflare, Azure DNS, etc.) |

Steps:

1. Set dropdown to **Namecheap BasicDNS**
2. Click the **green checkmark** to save
3. Wait a few minutes for nameserver changes to apply

Do **not** leave **Custom DNS** selected with empty nameserver fields — DNS will not resolve correctly.

### 3.2 Collect Azure values for DNS

Portal → **public-dev-suricat** → **Custom domains**:

| Azure field | Used for |
|-------------|----------|
| **IP address** | Apex `A` record for `suricat.ai` |
| **Custom Domain Verification ID** | TXT `asuid` / `asuid.www` |
| Default hostname | CNAME target for `www` |

Example default hostname used in this environment:

```text
public-dev-suricat-dafecdgzg4hhg4gz.westus3-01.azurewebsites.net
```

> The App Service **IP can change** (scale/plan moves). Always copy the current IP from **Custom domains** before creating or updating the apex `A` record.

### 3.3 Host records in Advanced DNS

Namecheap → **suricat.ai** → **Advanced DNS** → **Host Records** → **ADD NEW RECORD**:

| Type | Host | Value | TTL |
|------|------|--------|-----|
| **TXT Record** | `asuid` | *(Azure Custom Domain Verification ID)* | Automatic |
| **TXT Record** | `asuid.www` | *(same Verification ID)* | Automatic |
| **A Record** | `@` | *(Azure App Service IP from Custom domains)* | Automatic |
| **CNAME Record** | `www` | `public-dev-suricat-dafecdgzg4hhg4gz.westus3-01.azurewebsites.net` | Automatic |

**Namecheap Host field meanings**

- `@` → apex domain `suricat.ai`
- `www` → `www.suricat.ai`
- TXT host `asuid` → validates `suricat.ai` (do **not** type `asuid.suricat.ai`)
- TXT host `asuid.www` → validates `www.suricat.ai`

**CNAME value rules**

Use the hostname only — **no** `https://`, **no** trailing `/`:

```text
public-dev-suricat-dafecdgzg4hhg4gz.westus3-01.azurewebsites.net
```

Wrong:

```text
https://public-dev-suricat-dafecdgzg4hhg4gz.westus3-01.azurewebsites.net/
```

### 3.4 Clean up conflicting records

Remove or disable any older records that conflict, for example:

- Previous parking / URL Redirect for `@` or `www`
- Old `A` / `CNAME` / `ALIAS` pointing elsewhere
- Duplicate `www` CNAMEs

### 3.5 Verify DNS propagation

```bash
dig +short TXT asuid.suricat.ai
dig +short TXT asuid.www.suricat.ai
dig +short A suricat.ai
dig +short CNAME www.suricat.ai
```

Expect:

- TXT responses containing the Azure verification ID
- `A` → App Service IP
- `CNAME` → the `*.azurewebsites.net` hostname

Propagation is often minutes; allow up to ~30–60 minutes if validation fails early.

---

## 4. Custom domain + TLS on Azure

### 4.1 Hostname record types (summary)

| Hostname | DNS record | Azure hostname record type when adding domain |
|----------|------------|-----------------------------------------------|
| `suricat.ai` | **A** → App Service IP | **A Record** |
| `www.suricat.ai` | **CNAME** → `*.azurewebsites.net` | **CNAME** |

### 4.2 Add custom domains

Portal → **public-dev-suricat** → **Custom domains** → **+ Add custom domain**.

For **each** hostname (`suricat.ai`, then `www.suricat.ai`):

| Field | Choice |
|-------|--------|
| **Domain provider** | **All other domain services** (Namecheap is not App Service Domains) |
| **TLS/SSL certificate** | **App Service Managed Certificate** (free, auto-renew) |
| **TLS/SSL type** | **SNI SSL** |
| **Domain** | `suricat.ai` or `www.suricat.ai` (no `https://`, no `/`) |

Then:

1. **Validate** (Azure checks A/CNAME + TXT ownership)
2. When green → **Add**
3. Wait until domain status is **Secured**

### 4.3 If domain shows “No binding”

If the hostname is listed but status is **No binding**:

1. Click **Add binding**
2. Certificate: **App Service Managed Certificate**
3. TLS/SSL type: **SNI SSL**
4. Create/bind and wait for **Secured**

Managed certificates only support alphanumeric, dash, and period characters in the hostname (standard FQDNs are fine).

### 4.4 Enforce HTTPS

After both domains are **Secured**:

1. Portal → **Configuration** → **General settings** (or TLS/SSL settings)
2. **HTTPS Only** = **On**
3. Save

### 4.5 Smoke test

Open:

- https://suricat.ai
- https://www.suricat.ai
- https://public-dev-suricat-dafecdgzg4hhg4gz.westus3-01.azurewebsites.net

Optional:

```bash
curl -I https://suricat.ai
curl -I https://www.suricat.ai
```

Expect successful TLS and HTTP 200 (or an intentional redirect).

### 4.6 Canonical hostname (optional)

Both apex and `www` can serve the same app. For SEO, pick one canonical host and redirect the other (Namecheap URL redirect, Cloudflare rule, or Front Door later). Not required for the site to work.

---

## 5. End-to-end checklist (from zero to live)

1. [ ] Create App Service `public-dev-suricat` (Node 24 Linux)
2. [ ] Set `SCM_DO_BUILD_DURING_DEPLOYMENT=false` and `WEBSITE_RUN_FROM_PACKAGE=1`
3. [ ] Set startup command `node server.js`
4. [ ] Download publish profile → GitHub secret `AZURE_PUBLISH_PROFILE_PUBLIC_APP_DEV`
5. [ ] Set GitHub secret `APP_NEXT_PUBLIC_API_URL_DEV`
6. [ ] Confirm `next.config.ts` has `output: 'standalone'`
7. [ ] Push to `dev` or run **Deploy Public App (Next.js) to Azure (dev)**
8. [ ] Confirm site on `*.azurewebsites.net`
9. [ ] Namecheap nameservers → **BasicDNS**
10. [ ] Add TXT `asuid` / `asuid.www`, A `@`, CNAME `www`
11. [ ] Azure: add `suricat.ai` (A) + managed cert → **Secured**
12. [ ] Azure: add `www.suricat.ai` (CNAME) + managed cert → **Secured**
13. [ ] HTTPS Only = On
14. [ ] Update API CORS for both custom domains
15. [ ] Verify forms against `NEXT_PUBLIC_API_URL`

---

## 6. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|----------------|-----|
| Deploy succeeds but site shows default Azure page | Missing `WEBSITE_RUN_FROM_PACKAGE=1` or wrong package | Confirm app setting; ensure workflow deploys `./deploy-public` |
| App crash / cannot find entry | Wrong startup command | Use `node server.js` (not `node apps/.../server.js`) |
| Image errors / 500 on image routes | Optimizer writing to read-only FS | Ensure CI sets `SURICAT_AZURE_STANDALONE_DEPLOY=true` |
| Domain validation fails | TXT/A/CNAME missing or not propagated; Custom DNS with empty NS | Use BasicDNS; re-check Advanced DNS; wait and re-validate |
| `www` shows **No binding** | Domain added without SSL binding | **Add binding** → Managed Certificate → SNI |
| Cert creation fails | Hostname not resolving to this app yet | Fix DNS first; retry after propagation |
| Forms fail in browser | Wrong/missing `APP_NEXT_PUBLIC_API_URL_DEV`, or API CORS | Fix secret + redeploy; allow custom origins on API |
| Publish profile auth error | Rotated credentials / regenerated profile | Re-download profile; update GitHub secret |

---

## 7. Operational notes

- **Dev vs marketing traffic:** This App Service is named `public-dev-suricat` but currently serves the live custom domain `suricat.ai`. If you later introduce a separate prod App Service, move apex/`www` DNS and managed certificates to that app, and point a `dev.` hostname at this one instead.
- **Redeploys:** Merges/pushes to `dev` (matching path filters) redeploy automatically; custom domain bindings are **not** removed by zip deploy.
- **Secret rotation:** Rotating the API URL requires updating `APP_NEXT_PUBLIC_API_URL_DEV` and a new workflow run.
- **IP changes:** If the apex `A` record stops resolving correctly after a plan/region change, copy the new IP from Azure **Custom domains** and update Namecheap’s `@` A record.

---

## 8. Quick reference

### Azure

| Setting | Value |
|---------|--------|
| App name | `public-dev-suricat` |
| Startup | `node server.js` |
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `false` |
| `WEBSITE_RUN_FROM_PACKAGE` | `1` |
| Domains | `suricat.ai` (A), `www.suricat.ai` (CNAME) |
| Certificate | App Service Managed Certificate, SNI SSL |

### GitHub

| Item | Value |
|------|--------|
| Workflow | `.github/workflows/deploy-public-app-dev.yml` |
| Branch | `dev` |
| Secrets | `AZURE_PUBLISH_PROFILE_PUBLIC_APP_DEV`, `APP_NEXT_PUBLIC_API_URL_DEV` |

### Namecheap

| Item | Value |
|------|--------|
| Nameservers | **Namecheap BasicDNS** |
| TXT | `asuid`, `asuid.www` → Azure verification ID |
| A | `@` → App Service IP |
| CNAME | `www` → `public-dev-suricat-dafecdgzg4hhg4gz.westus3-01.azurewebsites.net` |
