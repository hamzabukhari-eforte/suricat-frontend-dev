# Public inquiries API contract

Marketing forms in this app POST JSON to the Nest API in `suricat-dev`.

## Base URL

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## Endpoints (all public, no auth)

| Form | Method | Path |
|------|--------|------|
| Contact | `POST` | `/public/inquiries/contact` |
| Design Partner | `POST` | `/public/inquiries/design-partner` |
| Get Started | `POST` | `/public/inquiries/get-started` |
| Readiness | `POST` | `/public/inquiries/readiness` |

Full example: `POST http://localhost:3000/api/v1/public/inquiries/contact`

## Expected responses

- **Success:** `200` or `201` with JSON body (any shape; frontend treats non-error as success)
- **Validation / client error:** `400` / `422` with `{ "message": "..." }` or `{ "error": "..." }` (Nest ValidationPipe arrays are supported)
- **CORS:** allow `http://localhost:4400` when `CORS_ALLOWED_ORIGINS` is set

## Port map

| App | Port |
|-----|------|
| API | 3000 |
| Admin | 4200 |
| Client | 4300 |
| Marketing (`suricat-frontend`) | 4400 |

## Payload shapes

See TypeScript types in:

- `lib/forms/contact.ts` → `ContactPayload`
- `lib/forms/design-partner.ts` → `DesignPartnerPayload`
- `lib/forms/get-started.ts` → `GetStartedPayload`
- `lib/forms/readiness.ts` → `ReadinessPayload`
