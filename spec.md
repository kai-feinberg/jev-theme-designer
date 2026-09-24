# Jev Theme Explorer

## 1. Summary

Jev Theme Explorer is a lightweight design exploration tool that converts a natural-language aesthetic description into **three complete visual themes** applied to the same fixed landing page.

A user might enter:

> earthy, warm, organic, slightly editorial

The product sends that same text to a set of independent Jev Choice questions covering typography, color, shape, borders, shadows, spacing, buttons, cards, and other visual design properties.

Jev selects only from predefined discrete options.

The application uses the returned probability distributions to construct three theme interpretations:

* **Theme 1:** highest-probability option for each property
* **Theme 2:** second-highest-probability option for each property
* **Theme 3:** third-highest-probability option for each property

All three themes are rendered simultaneously on the same fixed demo landing page.

The product is intentionally simple:

**Text in → three themed previews out.**

---

# 2. Problem

Exploring a visual direction from language is currently slow.

A designer or developer can describe an aesthetic easily:

* warm and earthy
* clinical and precise
* playful candy shop
* understated luxury
* brutalist Swiss editorial
* soft futuristic
* friendly SaaS

But turning that description into a coherent combination of fonts, colors, radii, borders, shadows, spacing, and component treatments requires manually changing many design-system values.

The Theme Explorer makes this exploration immediate.

It is not intended to generate a finished design. It is intended to quickly answer:

> **“What might this aesthetic look like as a design system?”**

---

# 3. Product Goal

Allow a user to type an aesthetic description and immediately see **three distinct interpretations** of that description as complete visual themes.

Success means the user can rapidly explore design directions without manually selecting individual design tokens.

---

# 4. Core User Experience

The interface has two primary parts:

1. **Prompt input**
2. **Three landing-page previews**

Example:

```text
┌───────────────────────────────────────────────┐
│ earthy, warm, organic, slightly editorial    │
└───────────────────────────────────────────────┘

        Theme 1       Theme 2       Theme 3
      ┌─────────┐   ┌─────────┐   ┌─────────┐
      │         │   │         │   │         │
      │ Landing │   │ Landing │   │ Landing │
      │  Page   │   │  Page   │   │  Page   │
      │         │   │         │   │         │
      └─────────┘   └─────────┘   └─────────┘
```

When the prompt changes, the themes are recomputed and the three previews update.

There is no chat interaction.

There is no follow-up prompt system.

There is no token editor.

There is no need for the user to understand Jev probabilities.

---

# 5. Jev Model Architecture

The user's entire input becomes the shared Jev state.

Example:

```text
state:
"earthy, warm, organic, slightly editorial"
```

The application then asks many independent Choice questions against that same state.

Conceptually:

```text
heading_font
Which heading font best represents this aesthetic?

body_font
Which body font best represents this aesthetic?

primary_color
Which primary color best represents this aesthetic?

border_radius
Which border radius best represents this aesthetic?

card_shadow
Which card shadow best represents this aesthetic?
```

Each question has a predefined list of allowed options.

Jev cannot invent a new font, color, radius, shadow, or value.

The application owns the design vocabulary.

Jev chooses among it.

Jev Choice supports a predefined choice set and returns both a selected choice and the probability assigned to the available options. Multiple questions can be evaluated in the same request against shared state.

---

# 6. Theme Generation

For every design property, sort Jev's returned options by probability.

Example:

```text
Heading font

Fraunces       0.52
DM Serif       0.31
Cormorant      0.10
Inter          0.07
```

The themes use:

```text
Theme 1 → Fraunces
Theme 2 → DM Serif
Theme 3 → Cormorant
```

Another property might return:

```text
Border radius

12px           0.45
16px           0.40
8px            0.10
0px            0.05
```

Which produces:

```text
Theme 1 → 12px
Theme 2 → 16px
Theme 3 → 8px
```

This process is repeated independently for every theme property.

Therefore:

```text
Theme 1 = all rank-1 choices
Theme 2 = all rank-2 choices
Theme 3 = all rank-3 choices
```

These should be understood as **three interpretations of the prompt**, not as the three most statistically probable complete themes.

Jev produces probabilities independently for each question rather than a probability distribution across complete theme combinations.

---

# 7. Confidence Behavior

V1 does not use confidence thresholds to suppress alternatives.

For example:

```text
cream   97%
white    2%
gray     1%
```

still produces:

```text
Theme 1 → cream
Theme 2 → white
Theme 3 → gray
```

The purpose of Themes 2 and 3 is visual exploration rather than communicating statistical certainty.

Probabilities and confidence values are not exposed in the v1 interface.

---

# 8. Theme Properties

The initial version controls **visual styling only**.

The layout and content of the landing page remain identical across all themes.

## Typography

Jev may control:

* Heading font
* Body font
* Optional accent/mono font
* Heading weight
* Body weight
* Heading letter spacing
* Body letter spacing
* Heading line height
* Body line height
* Type scale
* Heading capitalization treatment

Font options should reference fonts that the application can actually load.

---

## Core Colors

Jev may control:

* Page background
* Primary text
* Secondary/muted text
* Primary color
* Primary foreground
* Secondary color
* Secondary foreground
* Accent color
* Accent foreground

Colors should be drawn from curated discrete palettes or predefined tokens rather than arbitrary generated hex values.

---

## Surfaces

Jev may control:

* Card background
* Elevated surface
* Muted surface
* Input background
* Navigation surface
* Overlay treatment

---

## Borders

Jev may control:

* Border color
* Border width
* Border contrast
* Divider treatment
* Border style

Possible discrete styles might include:

```text
none
subtle
standard
strong
dark
hairline
```

---

## Border Radius

Jev may control:

* Global radius character
* Card radius
* Button radius
* Input radius
* Badge radius
* Image radius

Examples:

```text
square
subtle
medium
rounded
soft
pill
```

The application maps these semantic options to actual CSS values.

---

## Shadows

Jev may control:

* Card shadow
* Floating/elevated shadow
* Button shadow

Example vocabulary:

```text
none
subtle-tight
subtle-soft
medium-soft
directional
dramatic-soft
hard-offset
```

These names map to predefined CSS shadow values.

---

## Spacing

Jev may control:

* Overall visual density
* Section spacing
* Card padding
* Component padding
* Grid gap
* Control height
* Container width

Examples:

```text
compact
tight
balanced
relaxed
spacious
```

---

## Buttons

Jev may control:

* Button height
* Font weight
* Shape
* Border treatment
* Primary-button style
* Secondary-button style
* Shadow treatment
* Hover treatment

Examples could include:

```text
solid
soft
outline
ghost
high-contrast
```

---

## Cards

Jev may control:

* Flat vs elevated
* Border treatment
* Shadow
* Padding
* Image radius/treatment
* Hover treatment

---

## Inputs

Jev may control:

* Filled vs outlined
* Border strength
* Height
* Radius
* Focus treatment
* Background

---

## Navigation Styling

The navigation structure stays fixed, but Jev may control:

* Background treatment
* Border/divider treatment
* Link weight
* Link color
* Active-state treatment

---

## Imagery Treatment

The actual image placement stays fixed.

Jev may control visual treatments such as:

* Image radius
* Saturation
* Contrast
* Tint
* Border
* Shadow

---

## Decorative Language

Jev may control:

* Gradient presence
* Gradient style
* Texture
* Noise
* Decorative lines
* Geometric accents
* Background ornamentation

These must also be selected from predefined options rather than generated dynamically.

---

## Motion

Optional for v1.

Possible properties:

* Transition speed
* Hover movement
* Hover scale
* Hover lift
* Motion intensity

Examples:

```text
none
minimal
subtle
expressive
```

---

## Icons

If the demo page includes icons, Jev may control:

* Stroke weight
* Filled vs outline treatment
* Relative icon size

---

# 9. Discrete Option Design

Every property must expose at least **three valid options**, because the interface always renders three themes.

Prefer semantic choices over large sets of raw CSS values.

For example, prefer:

```text
card_shadow:

none
subtle-tight
subtle-soft
medium-soft
hard-offset
```

over:

```text
0 1px 2px rgb(...)
0 4px 8px rgb(...)
0 7px 14px rgb(...)
...
```

The semantic option is what Jev reasons about.

The application maps the semantic token to CSS.

Option descriptions should clearly explain their visual character so Jev can distinguish neighboring choices.

---

# 10. Design Token Architecture

A theme should resolve into a structured object.

Conceptually:

```text
Theme {
  typography: {
    headingFont
    bodyFont
    headingWeight
    bodyWeight
    typeScale
    headingTracking
    headingLineHeight
    bodyLineHeight
  }

  color: {
    background
    foreground
    mutedForeground
    primary
    primaryForeground
    secondary
    secondaryForeground
    accent
    accentForeground
    card
    muted
    border
  }

  radius: {
    card
    button
    input
    badge
    image
  }

  shadow: {
    card
    floating
    button
  }

  spacing: {
    density
    section
    cardPadding
    gridGap
    controlHeight
    containerWidth
  }

  buttons: {
    primaryStyle
    secondaryStyle
    borderTreatment
    hoverTreatment
  }

  decoration: {
    gradient
    texture
    imageTreatment
  }
}
```

The rendered landing page consumes only this normalized theme object.

It should not contain Jev-specific logic.

---

# 11. Fixed Demo Page

All three previews use the **same content and DOM structure**.

The page should contain enough UI variety to make theme differences obvious.

Recommended sections:

* Navigation
* Hero
* Primary CTA + secondary CTA
* Hero image or visual
* Logo/social-proof row
* Feature cards
* Text-heavy content section
* Image/content split section
* Testimonial
* Pricing or plan cards
* Form/input example
* Final CTA
* Footer

The demo should deliberately include:

* headings
* paragraphs
* links
* buttons
* cards
* borders
* images
* inputs
* badges
* muted surfaces
* elevated surfaces

This gives every major theme token somewhere visible to express itself.

---

# 12. Functional Requirements

### FR1 — Prompt

The user can enter arbitrary natural-language text describing a desired visual aesthetic.

---

### FR2 — Generation

Submitting or updating the prompt causes the application to evaluate the configured visual properties with Jev.

The same prompt is used as the state for every property.

---

### FR3 — Discrete Outputs

Every model-controlled value must come from a predefined option list.

No model-generated CSS values are permitted.

---

### FR4 — Three Themes

The system generates exactly three theme objects.

* Theme 1 uses rank 1 for every property.
* Theme 2 uses rank 2 for every property.
* Theme 3 uses rank 3 for every property.

---

### FR5 — Simultaneous Preview

All three themes are displayed at the same time.

---

### FR6 — Identical Structure

All previews use identical:

* content
* copy
* components
* component ordering
* page layout

Only visual design tokens differ.

---

### FR7 — Immediate Application

Once Jev returns the results, the three themes are applied directly to the previews.

There is no intermediate configuration screen.

---

# 13. Explicitly Out of Scope for V1

Do not build:

* Chat
* Follow-up prompting
* Conversational history
* Per-token controls
* Manual font selection
* Manual color selection
* Probability visualization
* Confidence visualization
* Locking individual properties
* Regenerate-one-property controls
* Theme editing
* Arbitrary CSS generation
* AI-generated landing-page copy
* AI-generated page layouts
* User-defined option sets
* Saving themes
* Accounts
* Collaboration

These can be reconsidered later.

The initial experience should remain:

**prompt → three previews**

---

# 14. Important Product Principle

Jev is the **selector**, not the design system.

The quality of this product depends heavily on the quality of the option library.

For example, Jev can choose that an aesthetic should have a `soft-organic` shadow, but the application determines what `soft-organic` actually looks like.

Therefore significant design effort should go into creating:

* good font sets
* good color tokens
* good shadows
* good spacing scales
* good radius scales
* good button styles
* clear semantic names
* clear descriptions of each option

The better these primitives are, the better the generated themes will feel.

---

# 15. V1 Success Criteria

V1 is successful if:

1. A user can enter one aesthetic prompt.
2. The system returns three visually distinct interpretations.
3. All three remain recognizably related to the prompt.
4. Themes change meaningfully across prompts such as:

   * earthy and warm
   * stark Swiss modernism
   * playful candy
   * understated luxury
   * futuristic technical
5. Changes extend beyond color and noticeably affect typography, shape, shadows, spacing, borders, and component styling.
6. The same prompt produces a complete internally renderable theme without manual cleanup.
7. No Jev output can produce an invalid design token.

---

# 16. Suggested Implementation Sequence

### Phase 1 — Design vocabulary

Define all controlled properties and their allowed discrete choices.

Start with approximately:

* 10–20 heading fonts
* 10–20 body fonts
* curated color choices/palettes
* 5–10 radius treatments
* 5–10 shadow treatments
* 4–6 spacing treatments
* several border treatments
* several button treatments
* several card treatments
* several decorative treatments

Do not maximize option count simply because Jev allows large choice sets.

Start with choices that are meaningfully visually different.

---

### Phase 2 — Fixed landing page

Build the static page using semantic theme variables.

No Jev integration should be necessary to preview a manually constructed theme.

---

### Phase 3 — Jev question set

Create one Jev Choice question for each controlled visual property.

All questions receive the same user prompt as their state.

---

### Phase 4 — Theme resolver

For every returned probability distribution:

1. Sort options descending.
2. Assign rank 1 to Theme 1.
3. Assign rank 2 to Theme 2.
4. Assign rank 3 to Theme 3.
5. Resolve semantic options into concrete design tokens.

---

### Phase 5 — Preview UI

Render the three resulting theme objects simultaneously.

---

### Phase 6 — Evaluation

Test a library of aesthetic prompts and look for:

* repetitive results
* contradictory combinations
* options that Jev rarely selects
* options Jev cannot semantically distinguish
* properties that create little visible difference
* missing aesthetic dimensions

Use those observations to improve the discrete choice vocabulary.

---

# 17. Deferred Next Step — Layout Exploration

The initial product controls **visual styling only**.

The page structure stays fixed.

Once the core concept is validated, Jev can also be allowed to select discrete structural options such as:

* Hero alignment
* Hero composition
* Content alignment
* Section rhythm
* Grid configuration
* Number of columns
* Card layout
* Navigation layout
* Image placement
* Image proportions
* Container structure
* Section composition

For example:

```text
hero_layout:

centered
left-copy-right-image
left-copy-full-bleed-image
split-balanced
editorial-offset
```

At that point, each of the three outputs could differ not only in visual design language but also in composition.

This should remain a separate phase.

The first version should validate the simpler core idea:

> **Can a natural-language aesthetic prompt plus a large, curated set of independent discrete Jev choices reliably produce interesting and useful visual themes?**
