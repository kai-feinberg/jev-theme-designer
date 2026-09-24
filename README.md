# Jev Theme Explorer

A Vite and React tool that turns one aesthetic prompt into three themes on a fixed demo page. Theme choices come from curated design options. The server calls TypeSafe Jev Choice questions and uses the first, second, and third ranked option for each property.

## Run

1. Put `TYPESAFE_API_KEY=...` in `.env.local`.
2. Run `pnpm install`.
3. Run `pnpm dev` and open the URL shown in the terminal.

The API key is read only by the Express server. Do not use a `VITE_` prefix for it.

## Check

- `pnpm test` runs ranking and validation tests.
- `pnpm build` checks TypeScript and builds the shareable client.
- `NODE_ENV=production pnpm start` serves the production build and API from one process.

The first screen shows an illustrative sample. After a successful generation, the label states that the themes came from the latest prompt. If the API is unavailable, the app retains the previous themes and shows an error.

See [ASSUMPTIONS.md](ASSUMPTIONS.md) for implementation decisions.

## Compare and copy

Choose Landing page, Editorial, Storefront, or Dashboard above the previews. Each theme shows the same selected page. Use **Copy theme** to copy versioned JSON with the semantic choices and resolved design tokens. Example pages are illustrative; the storefront does not process purchases.

Gradient and image-frame treatments are selected from curated options. The copied JSON includes their semantic names, resolved CSS, and the preview CSS variables. Image framing appears on illustrated areas; the dashboard has no image area.
