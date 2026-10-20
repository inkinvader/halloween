# Night Watch — Claude Handoff and Trade-offs

## Read this first

This is a work-in-progress Phase 1 browser prototype for `brief.md`. The current build is `index.html`, `styles.css`, and `script.js`; it has **not** been browser-tested in this environment because Node.js and Python are unavailable. The Developer has viewed it in a preview and reported concrete visual defects. Treat the Developer's observations as the highest-priority evidence.

## Current creative direction

- A single, vertical, nighttime surveillance-style view of an ordinary suburban house, partially concealed by bushes/tree branches.
- The User is an intrusive unseen observer. The house is not a threat to the User; tension comes from voluntary observation. Keep it nonviolent and age-appropriate.
- The player records three visual anomalies in **any order** while they are visible; after all are recorded, the existing short story plays.
- No third-party assets are currently used. Visuals are CSS/HTML; ambience is generated with the Web Audio API.

## Latest Developer feedback

The supplied preview screenshot shows the binocular mask direction. The Developer clarified that the dark mark between the lenses indicates the desired connection: the two lenses should join at the center without visibly overlapping circular outlines. The Developer also reported:

1. Lamp glass looks like artificial triangles and does not reach the ground.
2. Lamp focus reveals the scene/sky boundary and goes off-screen.
3. Focusing moves/enlarges the house rather than moving a complete camera view.
4. Door limbs look like tentacles with mittens, not limbs.
5. Window shadows do not read as people.
6. The door had a distracting yellow dot (the `door-gap` glow).
7. Bottom foreground brush is too sparse/symmetrical.
8. The binocular mask should rise from the bottom as if lifted to the face and resemble the provided reference: large circular lens openings, with the actual scene visible through them.

## Current state and important unfinished work

The last Codex change added:

- `#scene-world` around the visual scene so the camera can transform one common world;
- a `sceneWorld.style.transform` calculated in `openFocus()`;
- small lamp flecks and a `46vh` drop animation;
- an SVG binocular mask in `index.html`, raised with `.raised`;
- `bottom-brush` foreground markup and CSS;
- a neutral blue-grey door gap instead of yellow.

These additions are not verified. The CSS file is heavily minified onto roughly 39 lines, so exact-selector patching can be fragile. One corrective attempt to change the appended `.street { inset: 49% -100% -100%; }` rule to preserve the bottom edge failed because the declaration shares a long minified line. Fix it deliberately rather than layering another contradictory rule.

## Recommended next checkpoint (do this before adding features)

**Goal:** Make one focus transition look physically coherent and make the binocular overlay match the reference.

1. Run the site in a browser and capture the unzoomed, lamp-focus, window-focus, and door-focus states.
2. Rebuild scene layout around a single overscanned camera canvas:
   - `scene-world` should be larger than the viewport on every side, e.g. `inset: -60%`, or use a fixed oversized world with a known coordinate system.
   - Put all non-UI visual layers inside it: sky, clouds, distant homes, street, house, lamp, fog, foliage, anomalies.
   - Keep scanlines, vignette, HUD, focus UI, and binocular overlay outside it.
   - Apply one consistent transform to `scene-world`. Do not apply separate `.zoom-*` transforms to the house/lamp after this is working.
3. Make focus targets use transform origins/coordinates verified against screenshots. The lamp focal point must remain centered and must not expose any world edge.
4. Rework binocular overlay as a true mask/clip path, not two decorative circles laid over the scene. The black field should cover the display; the two circular lens areas should be holes. Animate only the overlay from below the viewport. Consider an HTML element with CSS `mask-image` / `-webkit-mask-image`, or validate the existing SVG `<mask>` cross-browser before retaining it.
5. Only after the camera and mask are correct, revise anomalies.

## Trade-off decisions

| Decision | Option A | Option B | Current recommendation |
|---|---|---|---|
| Visual base | Continue CSS scene | Replace with one original/AI-generated photorealistic background | CSS is fast and editable but has reached a realism ceiling. Use a photo-like original background if the Developer authorizes generated/credited assets. |
| People/limbs | Inline SVG silhouettes | Transparent raster silhouette overlays | The current build uses inline SVG as an asset-free middle ground. Use transparent overlays only if the Developer still finds SVG anatomy unclear at phone size. |
| Asset generation | CSS-only | Explicit API-key based image generation | Do not invoke API generation unless the Developer explicitly says **“use generated transparent assets”**. Built-in image generation was unavailable in this session. |
| Door anomaly | Multiple CSS appendages | One clean non-graphic multi-limbed transparent silhouette | Use the latter. It can be anatomically legible without blood, exposed injury, or violence. |
| Window anomaly | Abstract two-shape motion | Two readable nonviolent human-like silhouettes / impossible duplicate | Use readable silhouettes but avoid a knife, assault, victim, blood, or murder depiction; the course brief disallows realistic violence. |
| Lamp effect | Bright rapid strobe | Two bounded pulses + break/reverse | Keep exactly two white pulses in 5.4 seconds. This supports the request while remaining under WCAG's three-flashes-per-second guidance. |
| Focus interaction | Direct tap auto-records | Require player to catch active anomaly, then tap it | Current intent is: anomaly visible → tap its location while active → record it. Any order; inactive taps report no anomaly. Keep that, but ensure close-up does not hide the anomaly before it is judged. |
| Binoculars | No binocular visual | Raised, two-lens mask | Latest Developer request restores binoculars. Keep it as presentation over a full-world camera zoom; it should not add a second confusing action or darken the lens content. |
| Reduced motion | Freeze all decorative anomaly motion | Provide equivalent static indicators | Current build disables anomaly events under reduced motion, which can make the game impossible. Better: show a readable static/low-motion anomaly state that can still be captured, or explain an equivalent accessible mode. |

## Requirement boundaries

- Preserve the assignment's age-10+ tone: no gore, realistic violence, real-world suffering, murder depiction, weapon-over-victim sequence, or graphic imagery from the supplied reference.
- The player may be framed as intrusive, but do not depict stalking tactics, actual victimization, or confrontation.
- Retain a start screen, reduced-motion choice, one global Pause/Resume control, keyboard/touch support, progress/hints, a 5–10 second replayable story, and interaction lockout during that story.
- Respect flash safety: no more than three flashes in any one second. See the recorded W3C link in `research.md`.

## Code map

- `index.html`: layer markup, target buttons, HUD, focus UI, newly added SVG binocular mask.
- `styles.css`: all layout and animation rules. It is minified; reformat it before major visual revisions so the next agent can work safely.
- `script.js`: app state, Web Audio, focus transform, anomaly scheduler, capture logic, pause logic, story timer events.
- `spec.md`, `research.md`, `plan.md`: project documentation. They contain stale references to earlier ordered-trace and prior binocular revisions; update them after validating the chosen final interaction.

## Known implementation risks to inspect

1. `openFocus()` transforms `scene-world`, but legacy `.zoom-lamp`, `.zoom-window`, and `.zoom-door` CSS transforms remain. They should be neutralized or removed after test.
2. The appended world-expansion CSS contains an over-broad `.street` inset with a negative bottom. This may contribute to the visible boundary. Consolidate the rule instead of overriding it repeatedly.
3. `closeFocus()` removes anomaly classes. If a player zooms to inspect an active anomaly, this can remove the visual state before expected capture/review. Decide whether capture occurs before zoom or let the close view preserve the current anomaly until it expires.
4. The anomaly scheduler uses a `Set` and cycles only among uncaptured targets. Verify it does not stall after a missed event and that timer cleanup/pause works.
5. `reduced-motion` currently prevents anomaly animation. The game needs an alternate way to discover and capture anomalies under that preference.
6. No deployment, physical-phone test, or browser validation has been completed.

## Suggested handoff prompt for Claude

> Read `AGENTS.md`, `brief.md`, `HANDOFF.md`, `spec.md`, `research.md`, and `plan.md`. Inspect `index.html`, `styles.css`, and `script.js`. Do not add features yet. First run the app and fix the shared scene-world camera and binocular mask so a lamp focus is centered, has no visible world edge, and the scene shows through two circular lens openings that rise from the bottom. Reformat `styles.css` before editing. Then report screenshots/observations and ask for approval before rebuilding the anomaly silhouettes.
