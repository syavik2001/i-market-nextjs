# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pizza delivery online store ("i-market", package name `next-pizza`). Next.js 14 App Router, TypeScript,
Prisma + PostgreSQL, NextAuth v4, Stripe Checkout, Resend emails, Zustand, Tailwind + shadcn/ui.
Deployed on Vercel (https://i-market-nextjs.vercel.app). UI languages: Ukrainian (default) and English.

## Commands

```bash
npm run dev            # dev server on http://localhost:3000
npm run build          # production build (also the Vercel build command)
npm run lint           # next lint (eslint-config-next, core-web-vitals)
npx tsc --noEmit       # type check (tsconfig has noEmit + strict)
npm run prisma:push    # sync prisma/schema.prisma to the DB (no migrations folder; db push only)
npm run prisma:seed    # run prisma/seed.ts via ts-node
npm run prisma:studio  # browse the DB
```

`postinstall` runs `prisma generate`. There is no test suite yet.

Env vars read by the code: `POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`, `NEXTAUTH_SECRET`,
`GITHUB_ID`/`GITHUB_SECRET`, `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`, `STRIPE_SECRET_KEY`,
`STRIPE_WEBHOOK_SECRET`, `STRIPE_SUCCESS_URL`/`STRIPE_CANCEL_URL`, `RESEND_API_KEY`.

## Where things live

- `app/` - pages (`page.tsx` home with filters, `checkout/`, `profile/`, `not-auth/`) and `layout.tsx`
  (reads the `locale` cookie for SSR).
- `app/api/*` - Route Handlers (REST): `cart`, `cart/[id]`, `products/[id]`, `products/search`,
  `ingredients`, `stories`, `auth/[...nextauth]`, `auth/me`, `auth/verify`, `stripe/webhook`.
  `checkout/callback` is a dead stub left from YooKassa.
- `app/actions.ts` - Server Actions: `createOrder`, `registerUser`, `updateUserInfo`. Every export of a
  `"use server"` file is a public endpoint, so validate input on the server.
- `shared/lib/` - server/domain helpers: cart totals (`calc-cart-item-total-price`,
  `update-cart-total-amount`, `find-or-create-cart`), `find-pizzas` (home page query + filters),
  `creat-payment` (Stripe session), `stripe.ts`, `send-email` (Resend), `get-user-session`,
  `get-localized-name`.
- `shared/services/` - client-side API layer: axios instance with `baseURL: "/api"` (`instance.ts`),
  one module per resource, aggregated as `Api` in `api-client.ts`; DTOs in `services/dto/`.
- `shared/store/` - Zustand stores (`cart`, `category`, `product-modal`) and the locale context.
- `shared/components/shared/` - app components (barrel `index.ts`); `shared/components/ui/` - shadcn/ui.
- `shared/constants/` - `auth-options.ts` (NextAuth config), zod schemas, `pizza.ts` size/type maps,
  `locales/uk.ts` + `locales/en.ts` dictionaries.
- `prisma/schema.prisma` - data model; `prisma/seed.ts` - seed data; `prisma/prisma-client.ts` - client.

Import alias: `@/*` maps to the repo root (e.g. `@/shared/lib`, `@/prisma/prisma-client`).

## Key flows (span several files)

**Cart.** Anonymous, keyed by the `cartToken` cookie (created in `POST /api/cart`), not by user.
Prices are never taken from the client: after every mutation `updateCartTotalAmount` recomputes
`Cart.totalAmount` from `ProductItem.price` + ingredient prices. The client store
(`shared/store/cart.ts`) replaces its state with the server response via `getCartDetails`.

**Checkout and payment.** `app/checkout/page.tsx` -> `createOrder` server action: reads the cart by
cookie, creates `Order` (status `PENDING`, `items` stored as a JSON string), clears the cart, creates a
Stripe Checkout session (`currency: "uah"`, amount * 100) with `metadata.order_id`, emails the pay link
and returns the URL. `POST /api/stripe/webhook` verifies the signature on the raw body and, on
`checkout.session.completed`, sets the order to `SUCCEEDED` and sends a confirmation email.
Stripe redirects back to `/?paid=success|fail`, handled by `app/toast-client.tsx`.

**Auth.** NextAuth with JWT sessions: Credentials (bcrypt, requires `User.verified`), GitHub, Google.
`signIn` callback creates or links OAuth users by email; `jwt` callback reloads the user from the DB.
Registration (`registerUser`) emails a 6-digit code; `GET /api/auth/verify?code=` marks the user
verified. Session typing is extended in `@types/next-auth.d.ts`.

**i18n.** Custom, not next-intl (`next-intl` and `language-switcher.tsx` are unused).
`useLocaleStore()` returns `{ locale, t, setLocale }`; `t` is the dictionary from
`shared/constants/locales`. Locale is stored in the `locale` cookie (SSR) and localStorage.
`@/shared/store/locale` resolves to `locale.ts` -> `locale-provider.tsx`; `locale.tsx` is a stale duplicate.
DB entities have `name` + `nameEn`; use `get-localized-name` to pick one.

## Gotchas

- Prices are integers in UAH. Pizza `size` is 20/30/40; `pizzaType` 1 = traditional, 2 = thin
  (`shared/constants/pizza.ts` is the source of truth).
- Tailwind screens are redefined in `tailwind.config.ts`: `sm md lg xl 2xl` plus custom `1100`.
  Prefixes like `480:` or `639:` are not defined and generate nothing; use `max-[...]`/`min-[...]`.
- `Order.items` is `Json` but holds a `JSON.stringify`-ed string; parse it with `JSON.parse`.

## Security

- Every cart route that takes an item id (`app/api/cart/[id]`) must check that the `CartItem` belongs to
  the cart of the `cartToken` cookie before reading or changing it. The current PATCH/DELETE do not yet.
- Never log secrets or `process.env` values (not even partially or "for debugging").
- Validate API input with zod in Route Handlers and Server Actions. Mandatory after PR 7a.
- Before any `prisma` command or the seed, the DB host in `.env` must be `localhost`. Check only the host
  part of `POSTGRES_PRISMA_URL`/`POSTGRES_URL_NON_POOLING`, never print the full URL. Prisma CLI reads
  `.env`, not `.env.local`.
- Comments, commits and PRs in English (UI strings in `shared/constants/locales/*.ts` are the exception),
  Conventional Commits (`fix(api): ...`). Do not copy or translate legacy Russian comments.
- A PR contains only the files of its task. Branch from `main`.
