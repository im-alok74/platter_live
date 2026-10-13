# Platter site (public, frontend only)

5 pages: Home, Menu, About, Location, Contact. No database, no ordering, no admin.
- Menu and photos: `src/data/menu-data.json`. Contact, hours, address, social links: `src/data/site.ts`.
- Dish photos are free Unsplash stock (hotlinked), shown as "for representation". Replace a dish's `image.url` with your own photo any time.
- Dev: `npm run dev`. Deploy: import this folder in Vercel (set `NEXT_PUBLIC_SITE_URL` to the live domain).
- The full software (admin, kitchen, table ordering) is in git tag `full-software-v1` of the `platter` repo and in `../platter-full-software`.
