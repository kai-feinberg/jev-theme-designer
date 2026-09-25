# Jev Theme Explorer

<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
Vite, React, TypeScript, and a small Express server. The user specified Vite and delegated the remaining stack.

## Users
Designers and developers exploring an aesthetic before building a visual system. This is inferred from spec.md.

## Product Purpose
Turn one aesthetic description into three complete theme interpretations on the same selected example page.

## Capabilities and Constraints
Use TypeSafe Jev Choice questions with curated discrete options. Each theme uses the first, second, or third most probable option for every property. Keep all page content and layout identical. Do not expose probabilities, token editing, or theme saving in v1.

## Evidence on Hand
The product specification is in spec.md. Demo page content is illustrative, not a real product or customer claim.

## Current preview workflow
Users can switch all three previews together among a landing page, editorial page, storefront, and dashboard. Each page uses fixed content and structure across themes. Users can copy a theme as versioned JSON with semantic choices and resolved tokens. The additional sample pages and their facts are illustrative.

Jev also chooses a gradient treatment and an image frame from predefined options. Gradient CSS, frame behavior, and palette values remain owned by the app.

Jev selects a warm, cool, bright, deep, or soft accent character. The app resolves it against the base palette to keep the second hue distinct and readable.
