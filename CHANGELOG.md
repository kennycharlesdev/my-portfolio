# Changelog

## Portfolio V4.2 — About story + Homelab (2026-11-13)

- About rewritten as a story: Nassau to Naples, resort and warehouse work to shipping software (facts from the resume)
- "My AI team" panel: Claude Code (lead builder), Codex (reviewer/backup), ChatGPT (planning), coordinated through HQ
- Animated career timeline that draws as you scroll
- New "Also building" grid: Website Factory, Dashipelago, TipAccord, SmartLifePlanner, Wavecrate, TradeGuard, OnGround 242, SWFL Lead Recovery
- New Homelab section: animated server rack (blinking LEDs, load bars, fans) for the 13-container Debian/Docker stack
- Stats now show 15+ projects built; skills and belt include Linux, Docker, Tailscale, Next.js, Supabase

## Portfolio V4.1 — Bahamas theme (2026-11-13)

- Palette moved to Bahamas flag colors: gold #FFC72C, aquamarine #00ABC9, black, on a deep-ocean background
- Flag-style logo mark with the black chevron, flag stripe in the scroll bar and above the footer
- Hero gets a glowing sun and three layers of animated ocean waves
- Belts recolored: gold stack belt crossing an aquamarine "Build · Automate · Ship" belt
- Waves and sun stop under reduced-motion settings

## Portfolio V4 — Redesign (2026-11-13)

### Added

- Full visual redesign: new type (Bricolage Grotesque, Inter, JetBrains Mono), lime/violet palette, animated grid hero
- Animation belts: two crossing marquee belts (stack + "Build · Automate · Ship") and an outlined CTA belt
- Motion: word-by-word headline, rotating "currently building" line, typing terminal, count-up stats,
  scroll progress bar, scrollspy nav, card spotlight and tilt, magnetic buttons, animated HQ pipeline diagram
- Live section pulling last deploy, latest commits and the site-check status from the GitHub API
- GitHub Action (`site-check.yml`) that checks JavaScript syntax and every referenced asset on each push
- Copy-to-clipboard email with toast

### Fixed

- LeadFlow OS "GitHub repo" link pointed to a private repo (404 for visitors); replaced with a note
- Skills updated to reflect what has actually been shipped (Node.js, Express, Cloudflare, MCP, Stripe)

### Accessibility

- All motion is disabled under `prefers-reduced-motion`; belts become scrollable instead

## Portfolio V3.2 — Project refresh (2026-11-12)

### Updated

- NextStream promoted from "Learning" to a featured full-stack project (private beta prep), with a case study
- Added HQ Command Center (AI command center, MCP server, Mac/iPhone voice and Roku clients) with a case study
- LeadFlow OS card and case study refreshed to match the current repo
- Project grid now shows four projects in two columns
- Real screenshots of NextStream and LeadFlow OS replace the placeholder; HQ uses a mockup because the live dashboard holds private data

## [Unreleased] Portfolio V3.0

### Added

- Stronger homepage message and CTAs
- Premium dark theme styling and improved layout hierarchy
- Project cards with clearer statuses and case-study framing
- Services section for web development, maintenance, and AI automation
- Improved skill grouping and clearer learning roadmap
- Enhanced SEO metadata and social sharing tags
- Local progress and test documentation

### Updated

- Navigation, responsiveness, and accessibility polish
- Contact section clarity
- Resume accessibility and download behavior

### Fixed

- Removed invalid CSS leftover from earlier versioning
- Confirmed the resume file path remained valid
- Preserved the live site and main branch from direct deployment

### Notes

- The portfolio remains on the V3 development branch until approved for publication.
- LeadFlow OS is represented accurately as a concept-stage workflow project.
