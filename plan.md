# Implementation Plan

> EDITING DIRECTIVE: DEVELOPER AND AGENT EDIT THIS FILE COLLABORATIVELY. THE DEVELOPER MUST REVIEW AND APPROVE ITS CONTENT.

Purpose: Track the next useful build checkpoints, verification, and consequential revisions.

## Working agreement

Developer: Keep the browser preview running, choose priorities, test results directly, and plan only the next few checkpoints.

Agent: Read the project documents and inspect the files. Keep each checkpoint small enough to run and judge. Do not expand scope or mark Developer verification complete.

Start or continue a fresh chat with:

`Read the project documents, inspect the current build, and help me complete the next unchecked checkpoint.`

## Checkpoints

Create your own checklist for the next few results, using the workflow in `brief.md` and the current `spec.md`. Name the main risk, what each checkpoint should produce, and how you will verify it. Review and approve the approach before implementation.

Test each result before continuing, including related behavior that already works. Update priorities as evidence emerges and preserve meaningful working checkpoints in git. Before delivery, verify the deployed app against the brief and specification.

### Phase 1 baseline — approved implementation

- [x] **Build:** Create a single-screen original Night Watch scene with responsive vertical composition, start screen, reduced-motion choice, ambient effects, browser-generated ambient audio, and coordinated Play/Pause control.
- [x] **Build:** Add one complete 5–10 second discoverable audiovisual story with three recordable targets, progress feedback, lockout during playback, and replay behavior.
- [x] **Revision:** Add binocular close-ups for the driveway light, upstairs window, and front door. Add a brief, ambiguous window-light/silhouette ambient event with no depiction of harm.
- [ ] **Developer browser verification:** Open `index.html` in the browser preview. Check Enter, reduced motion, keyboard Tab/Enter navigation, touch targets, Pause/Resume during ambience and story playback, any-order recording, full story sequence, and replay.
- [ ] **Developer device/deployment verification:** Host the files at a public HTTPS URL, open it on a physical smartphone, and record the URL and observations here.

**Main risk:** This environment has no runnable Node.js or Python installation, so automated JavaScript validation, local-server launch, and screenshots could not run here. Browser and device checks remain intentionally unmarked.

### Developer feedback — interaction clarity

- **Observation:** The original close-up appeared as one black oval rather than two binocular lenses. The Developer could not tell why Inspect and Lower binoculars were separate because both left the close view.
- **Revision:** Replace the oval vignette with two visible lens rings, adjust each close-up so its selected feature moves into the lenses, rename/re-style the controls as primary **Record observation** and secondary **Back to street**, and keep a recorded view open until Back to street is chosen.
- **Verification pending:** Confirm the selected feature is centered in its lenses and that the three-step loop is understandable without explanation in browser preview.

### Developer feedback — simplify focus

- **Observation:** The lens framing and separate Inspect/Back actions were still unclear. Ambient motion appeared absent.
- **Revision:** Remove binoculars entirely. A location selection now directly records the observation and zooms its feature without darkening. Replace random ambient behavior with a visible four-second alternation between lamp flicker and window light/silhouette.
- **Verification pending:** With reduced motion unchecked, observe both ambient events within eight seconds and verify the direct select → zoom → return loop is clear.

### Approved anomaly-recording revision

- [x] **Build:** Replace the direct ordered trace with three recordable anomalies that can be captured in any order. Add concealed hedge/tree framing, a bounded lamp reversal effect, a nonviolent double-shadow window event, and multiple non-graphic door silhouettes.
- [ ] **Developer browser verification:** With reduced motion off, confirm an anomaly appears on Enter, lasts about 5 seconds, only records at its active location, cannot record twice, and all three capture orders start the story. Confirm the lamp has no more than two flashes per cycle.

### Developer feedback — camera and anomaly readability

- **Observation:** Triangular lamp shards looked artificial and stopped above the ground. Per-object focus transforms made the house enlarge without the rest of the environment, and the CSS limb/shadow shapes were not readable as intended.
- [x] **Revision:** Move all scene art into a shared camera world; replace separate object transforms with one whole-world focus transform; use small irregular lamp flecks that reach the pavement before returning.
- [x] **Revision:** Replace abstract CSS limb/shadow placeholders with original inline SVG silhouette paths; retain external asset generation only as a later option if mobile testing shows the SVG version is unclear.

### Autonomous visual correction pass

- [x] **Build:** Use one overscanned camera world for focus moves; add an overscan sky/street backdrop, a raised connected binocular overlay, neutralize the door gap, extend irregular foreground brush, and replace CSS placeholder anatomy with original inline SVG silhouette paths.
- [x] **Build:** Keep anomalies playable when reduced motion is selected by presenting stable visual anomaly states instead of suppressing them.
- [ ] **Developer browser verification:** Check that lamp/window/door focus moves retain a continuous world, the two-lens overlay rises from below without overlapping outlines, glass reaches the lower street, and each SVG anomaly reads clearly at phone size.

### Submission close-out

- [x] **Build:** Align the specification with the final any-order anomaly flow and keep reduced-motion anomalies recordable.
- [x] **Build:** Add an on-screen creator/source credit and a static-hosting guide.
- [ ] **Developer release check:** Replace the generic creator credit with the required credited name if needed, publish to HTTPS, test on a physical phone, and record the URL and result here.

## Evidence and revisions

Record non-identifying playtest observations, separating what Users did or said from your interpretation. Use the findings to choose revision priorities and record what changed and how you verified the improvement.

Keep implementation progress and verification here. Update `research.md` when evidence changes a decision and `spec.md` when intended behavior changes; link to those updates rather than duplicating them. Record consequential changes, not every small adjustment.

## Saving transcripts

When directed, save the complete conversation as `transcripts/plan-YYYY-MM-DD_HHMMSS.md` or `transcripts/build-YYYY-MM-DD_HHMMSS.md`, label messages `Developer` and `Agent`, and confirm the path.
