# Platter site (public, frontend only)

Home, Menu, Location, Contact. No database, no ordering, no admin.
- Menu: `src/data/menu-data.json`. Contact, hours, address: `src/data/site.ts`.
- Dev: `npm run dev`. Deploy: import this folder in Vercel (set `NEXT_PUBLIC_SITE_URL` to the live domain).
- The full software (admin, kitchen, table ordering) is in git tag `full-software-v1` of the `platter` repo and in `../platter-full-software`.
