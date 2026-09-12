# The Afterlives of the September 11 Digital Archive

Slide deck for the panel discussion at the CUNY Graduate Center, Elebash Recital
Hall, September 10, 2026, 6:00–8:00 pm — marking the 25th anniversary of
September 11 and the afterlife of the archive that CHNM and ASHP built in 2001.

Panel: Stephen Brier, Tom Scheinfeldt, Greg "Fritz" Umbach, Stefano Morello.
This deck accompanies Stefano Morello's segment.

A single-page HTML deck (no build step) using the CUNY AI Lab slide framework
(`src/slides.js` — keyboard, swipe, scrubber, fragments, overview, lightbox),
the same engine as the [GCDI Orientation deck](https://github.com/CUNY-AI-Lab/GCDI-Orientation).
The aesthetic here is archival rather than institutional: paper-white slides,
ink text, a deep archival blue accent, and a rust second accent held in reserve
for the work that is *not* done.

- **View locally:** `python3 -m http.server` in this folder, then open `http://localhost:8000`
- **Published deck:** https://cuny-ai-lab.github.io/sept11da-slides/
- **Event:** https://www.gc.cuny.edu/events/afterlives-september-11-digital-archive-panel-discussion

## Structure

30 slides in five movements:

1. **Credits and stewardship** (2–4) — who kept the archive alive between 2002
   and tonight, and the fact that the archive cannot say so itself.
2. **The record** (5–6) — the four tasks set out around the 2011 Omeka
   migration, scored today; and the one nobody planned for.
3. **Method and result** (7–13) — what was pulled from the API, what read it,
   what came back, three artifacts shown beside their machine output, and the
   fact that every model ran locally in the New Media Lab.
4. **The review tiers** (14–19) — file recovery, PII, transcription quality,
   metadata, and why searchability is a condition of plurality rather than a
   postscript to preservation.
5. **Tier 4 and the offer** (20–30) — seven lenses that an index makes
   answerable, the rule that every visual walks back to the artifact, and the
   framing of this work as an offer *to* RRCHNM's active plan, not instead of it.

Slide 27 (`data-slide="lens-more"`, Tier 4 · Lens 07) is a marked placeholder
for the Iraq / FDNY material. Paste into it; the layout matches the other lenses
and takes an optional `.lens-figs` block for counts.

## Controls

Space/→ advance, ← back, **Esc** overview, **F** fullscreen, **B** blank screen,
click any screenshot to zoom (or focus it and press Enter/Space), drag the footer
scrubber to jump. Escape or the close button dismisses a zoomed image and returns
focus to its screenshot.

## Tests

With the local server running, exercise the gallery and lightbox in Chromium:

```bash
uv run --with playwright python tests/gallery_accessibility_browser.py
```

## Sources for the figures on the slides

| Slide | Figure | Source |
| --- | --- | --- |
| What we pulled | 70,359 items · 67,609 files · 150.7 GB · 66,830 distinct SHA-256 | Harvest manifest |
| What came back | 41,225 card pages · 199 h audio · 152,000 segments · 31,600 images · 17M chars · 123 Flash pieces | Pipeline output |
| Tier 1 | 157 block · 3,941 urgent · 1,934 high · 10,346 medium · 3,258 low; 168 minors reachable; 117 spoken contact details | `images/pii-cards.png`, `images/pii-queue.png` |
| Tier 2 | vision 15,199 · zip-image 16,433 · pdf 332 · htr 41,225 · asr 5,519 | `images/qc-dashboard.png` |
| Tier 3 | 18 fields · 24 dates · 0 tags | Metadata audit |
| Tier 4 | ~20,000 hometowns · 51M characters · 3,369 site captures · 55,825 members | Index counts |

## Files

```
index.html          the deck — all 30 slides, plus the title canvas
src/slides.js       the shared CUNY AI Lab deck framework (unmodified)
src/styles.css      the framework's stylesheet, re-palletted, plus this deck's components
images/             screenshots of the review tooling, logos, and generated QR codes
```

The title background is "Index Sweep": a field of marks, one per sampled item,
most of them dark. A band of light passes across and the marks it touches
resolve into something legible, then fade. Move the pointer to drag the sweep.
It is the argument of the talk in one image — the difference between keeping
something and being able to read it.
