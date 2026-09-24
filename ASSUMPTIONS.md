# Implementation assumptions

- The primary users are designers and developers testing visual directions.
- The sample landing page is a fictional field notes product called Fieldwork. Its copy, logos, and testimonial are illustrative only.
- A small Express server serves the Vite app and calls TypeSafe. The API key stays on the server and is never sent to the browser.
- A preview theme is shown before the first API call. Users submit a prompt to generate new results.
- If TypeSafe is unavailable, the app reports the error and keeps the prior themes on screen. It does not present local guesses as Jev results.
- The same ranked choice can lead to similar colors across themes; the application follows the spec's independent per-property ranking rule exactly.
- The editorial, storefront, and dashboard previews use fictional content. Prices, project data, and publication details are illustrative.
- “Copy theme” exports versioned JSON with the prompt used for that result, semantic choices, and resolved tokens. A sample set has a null prompt.
- “Image framing” applies to image or illustration areas. The dashboard has no image area, so framing has no visible effect there. Gradient treatment affects the dashboard chart surface.
- Copied JSON now includes gradient and frame choices, resolved CSS values, and CSS variables.
