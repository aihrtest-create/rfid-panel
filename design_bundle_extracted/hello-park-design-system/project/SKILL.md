---
name: hello-park-design
description: Use this skill to generate well-branded interfaces and assets for Hello Park, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out
and create static HTML files for the user to view. If working on production code, you can
copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to
build or design, ask some questions, and act as an expert designer who outputs HTML
artifacts _or_ production code, depending on the need.

## Quick map
- `styles.css` — link this one file; it `@import`s every token + font.
- `readme.md` — full brand guide: content voice, visual foundations, iconography.
- `tokens/` — colors, typography, spacing/radii/elevation, fonts.
- `components/core/` — React primitives: Button, IconButton, Tag, CounterPill, Card, NavBar.
- `ui_kits/website/` — interactive marketing-site recreation.
- `slides/` — branded deck slides (title, metrics, section, quote).
- `assets/` — logo + astronaut Fox ("Rocky") mascot renders.

## Brand in one breath
Hello Park — the world's largest immersive **phygital** park chain. **Orange-dominant,
flat, hyper-colorful.** Sentence-case display (Cy Grotesk Key → Space Grotesk substitute),
Hanken Grotesk body, DM Mono uppercase chrome. Big pill radii, flat cards (hairline, no
shadow — shadow only on the floating nav + dialogs), one saturated color per block, the
astronaut Fox mascot, and a 12-color play palette used one accent at a time.
