# Hello Park — Design System

The single source of truth for **Hello Park**, billed as the world's largest immersive
*phygital* park chain — entertainment + creativity venues that blend physical play
spaces with digital, screen-based interaction. The brand is **orange-dominant, flat,
and hyper-colorful**, anchored by an astronaut **Fox** mascot ("Rocky").

> Phygital = physical + digital. Hello Park positions itself as "rethinking
> entertainment to be meaningful, immersive and fun," operating 50+ parks worldwide
> (flagship: **Dubai Park**).

## Sources used to build this system
- **Live reference design system:** https://design.hello-park.io/ (the published v1
  spec — tokens, type, color, components, brand. This DS is a faithful rebuild of it.)
- **UI kit reference:** https://design.hello-park.io/ui_kits/website/index.html
  (JS-rendered; rebuilt here from the documented brand foundations.)
- **Uploaded assets:**
  - `assets/logo-horizontal.png` — `hello park` lockup (orange blob mark + wordmark)
  - `assets/rocky-heart.png` — astronaut Fox forming a heart with both hands
  - `assets/rocky-point.png` — astronaut Fox pointing
- **Not received** (flagged to user): `Hello_Park_-_Investment_Deck.pptx` and
  `00 Rocky the Fox Left.png` did not arrive in `uploads/`. Slides below are built
  from brand foundations rather than the real deck.

---

## CONTENT FUNDAMENTALS — how Hello Park writes

**Voice:** Playful but credible. Confident, warm, a little wonder-struck — a park host
who is also a serious operator. Fun never undercuts the business case.

**Casing:**
- Display & headlines → **sentence case** ("Rethinking entertainment to be meaningful,
  immersive and fun.") Never ALL CAPS for headlines.
- Chrome / labels / eyebrows / nav → **UPPERCASE mono** with letter-spacing
  ("FRANCHISE", "ATTRACTIONS", "VISIT PARK"). This mono-uppercase chrome is a signature.

**Person:** Brand-forward third person and inclusive "we/our parks." Addresses the
reader as "you" in CTAs ("Visit park", "Plan your visit"). Not chatty/first-person-"I".

**Signature words:** *phygital, immersive, meaningful, creativity, entertainment,
attraction, franchise, park.* "Phygital" is used proudly and often.

**CTA style:** Short, imperative, often with a trailing chevron "›".
Examples: "Visit park", "Learn more ›", "Explore components ›", "View UI kit ›".

**Numbers & stats:** Big, confident, paired with a tiny mono caption.
("50+ / parks worldwide", "98 / design tokens"). Section numbers are zero-padded
mono ("01", "02", "03").

**Emoji:** Not used in product UI or marketing copy. Personality comes from color,
the Fox mascot, and shape — not emoji.

**Vibe in one line:** "Theme-park optimism with the precision of a tech brand."

---

## VISUAL FOUNDATIONS

**Color.** Orange *is* the brand — `--orange #FF6022` primary, supported by a deep
`#F74A0D`, bright `#FF7F00`, and `--amber #FFB400`. Rule: **one saturated color per
block**, set against a calm light-gray page (`--page #F4F3F1`) with white surfaces.
A 12-swatch **Play palette** (lime, green, forest, lilac, violet, magenta, sky, navy,
burgundy, yellow, red, salmon) supplies hyper-colorful accents — used as full-bleed
card fills, tags, and illustration support, one at a time, never as gradients.

**Type.** Display/heading in **Cy Grotesk Key** (Heavy 800 / Bold 700) — *substituted
here with Space Grotesk* (see Caveats). Body in **Hanken Grotesk** (400/500). Chrome &
labels in **DM Mono** (500), uppercase, tracked `~0.08em`. Display is sentence-case,
tight tracking (`-0.02em`), balanced wraps, set large.

**Backgrounds.** Mostly **flat solid fills** — light-gray page, white cards, or one
saturated color filling a block. **No gradients on surfaces** (the only gradient is the
subtle one baked into the logo mark itself). No textures, no noise, no patterns. Imagery
is bright, warm, saturated photography of park interiors + glossy 3D renders of the Fox
mascot on transparent/white.

**Shape & radii.** Big friendly corners carry the playfulness: `sm 12`, `md 20`,
`lg 32`, plus fully-rounded **pills** (`999px`) for buttons, tags, and the nav. The logo
mark is a wobbly **blob/squircle**. Cards use `lg (32px)`.

**Elevation.** **Flat by default.** Content cards use a 1px hairline border
(`--line #E7E6E3`), *no shadow*. Shadow is reserved for the **floating nav pill** and
**dialogs/popovers** only (`--shadow-nav`, `--shadow-pop`).

**Borders.** Hairline `1px` `--line` on cards/inputs; color-filled blocks are
borderless. Strong border `--ink-20` on hover/active inputs.

**Hover / press.**
- Buttons: hover **darkens** the fill (`--orange` → `--orange-700`); press goes to
  `--orange-deep` and nudges down ~1px (subtle, no big bounce).
- Ghost/secondary: hover fills with a faint orange wash (`--orange-50`).
- Cards/links: hover lifts slightly and the chevron slides right a few px.

**Motion.** Quick and crisp. `--dur-base 220ms` with `--ease-out`; a springy
`--ease-spring` is reserved for delightful moments (mascot, counters). Fades + small
translateY entrances. No infinite decorative loops in product UI. Respect
`prefers-reduced-motion`.

**Transparency & blur.** Used sparingly — the floating nav may sit on a translucent
white with light backdrop-blur over imagery. Body content stays opaque and flat.

**Layout.** Centered `--container 1200px` with fluid `--gutter`. Generous vertical
rhythm on the 4px grid. The **nav floats** as a white pill near the top; sections are
introduced by a zero-padded mono number + sentence-case heading.

---

## ICONOGRAPHY

Hello Park's chrome is **typographic, not icon-heavy**. The signature "icon" is the
**chevron** `›` used as a directional/affordance glyph after links and inside circular
`IconButton`s — rendered as a Unicode character, not an SVG.

- **No bespoke icon font** is shipped by the source system. Where small UI icons are
  needed (search, menu, close, arrows), use **[Lucide](https://lucide.dev)** via CDN —
  a thin, rounded-join stroke set that matches the brand's friendly geometry. This is a
  **substitution** (flagged); swap for the brand's own set if one is supplied.
- **Emoji:** never used as iconography.
- **Unicode glyphs:** the chevron `›` (and occasionally `→`) carry most directional
  meaning, consistent with the CTA copy style.
- **Brand imagery as "icons":** the **Fox mascot** (`assets/rocky-*.png`) and the
  **blob logo mark** function as the brand's most recognizable marks. Use real PNGs —
  never redraw the Fox or the mark as SVG.

Assets in `assets/`: `logo-horizontal.png`, `rocky-heart.png`, `rocky-point.png`.

---

## INDEX / MANIFEST

**Root**
- `styles.css` — global entry (import this one file). `@import`s the token + base files.
- `readme.md` — this guide.
- `SKILL.md` — Agent Skill wrapper for Claude Code.

**`tokens/`**
- `fonts.css` — webfont `@import` (Space Grotesk · Hanken Grotesk · DM Mono).
- `colors.css` — orange ramp, play palette, neutrals, semantic aliases.
- `typography.css` — families, weights, display/body/mono scales.
- `spacing.css` — 4px spacing, radii, elevation, layout, motion.
- `base.css` — element resets + small helpers (`.hp-card`, `.hp-label`, display classes).

**`guidelines/`** — foundation specimen cards (Type, Colors, Spacing, Brand) shown in
the Design System tab.

**`components/core/`** — reusable primitives: `Button`, `IconButton`, `Tag`,
`CounterPill`, `Card`, `NavBar`.

**`ui_kits/website/`** — high-fidelity Hello Park marketing site recreation
(floating nav, hero, stats, attractions, franchise CTA, footer).

**`slides/`** — branded sample slides (`01-title`, `02-metrics`, `03-section`,
`04-quote`) for an investment-deck context, built from foundations (the real deck PPTX
wasn't received).

---

## CAVEATS
- **Display font is substituted.** Cy Grotesk Key (the real brand display face) was not
  supplied; **Space Grotesk** stands in. Please send the Cy Grotesk Key files to make it
  pixel-true.
- **Icons substituted** with Lucide (CDN). Swap if Hello Park has its own set.
- **Play-palette hex values** were not given numerically in the source; the values here
  are tuned to match the published swatches visually — confirm against brand specs.
- **Missing uploads:** the investment deck PPTX and one Fox pose (`00 Rocky the Fox
  Left.png`) didn't arrive — slides are built from foundations, not the real deck.
