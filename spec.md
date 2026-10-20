# Technical Specification

> EDITING DIRECTIVE: DEVELOPER AND AGENT EDIT THIS FILE COLLABORATIVELY. THE DEVELOPER MUST REVIEW AND APPROVE ITS CONTENT.

Purpose: Keep a concise, testable description of the experience currently being built.

## Working agreement

Developer: Begin with the running prototype, approve the intended behavior, test it directly, and update this file when the intended result changes.

Agent: Read `AGENTS.md`, `brief.md`, `research.md`, and this file, then inspect the project. Turn decisions into acceptance checks without inventing product choices or freezing details that still require testing.

Start a fresh chat with:

`Read the project documents, inspect the running prototype, and help me specify the next useful build checkpoint.`

## Current build contract

Define only enough to build and verify the current direction:

- the intended User experience and chosen scene, ambience, and story behavior
- the system structure, shared rules, and states that keep audiovisual behavior and interaction coordinated
- the assets and layout needed for that structure, linking to sources and credits in `research.md`
- acceptance checks for the chosen behavior and every requirement in `brief.md`, including accessibility and failure behavior

Reference the brief's fixed requirements rather than copying them. Specify your decisions precisely enough that the Developer and Agent can judge the same result. Leave untested details open until they are needed, and distinguish provisional ideas from approved behavior.

### Phase 1: Night Watch prototype

**Goal.** Deliver the brief's ambient scene and one complete, replayable discoverable story as a mobile-first single-page browser experience.

**Experience.** Before the feed begins, an archive-style start screen frames the User as an unseen observer, offers a reduced-motion choice (preselected when the device prefers reduced motion), and has an Enter button. Entering begins the sound and the nighttime security feed. The 9:16 scene remains on one screen with a house as focal point, a streetlamp, upstairs window, front door, hedges, mailbox, sky, and distant houses. The house is never presented as a threat to the User.

**Ambient system.** Fog, leaves, clouds, CRT scanlines, and a browser-generated wind/drone loop create atmosphere. Audio starts only from the Enter action. Reduced motion freezes decorative animation and replaces every anomaly with a stable, recordable visual state. The Pause/Resume control suspends sound, CSS animation, timed logic, and target interaction.

**Discovery and story.** The accessible targets are Driveway streetlamp, Upstairs window, and Front door. After Enter, one uncaptured anomaly is active for 5.4 seconds; another may begin on the next 6.5-second cycle. The player can record active anomalies in any order. Selecting an inactive location gives clear feedback without changing progress. The non-graphic anomalies are: a lamp that flashes twice and appears to shed then restore small glass flecks; contradictory silhouettes in the lit upstairs window; and several hand/arm-like silhouettes that emerge from one side of a barely ajar door. Recording an anomaly opens a close view; **Return to overview** is the sole exit.

Capturing all three locks targets and begins the 7.25-second replayable story, *The House Responds*: lamp disturbance, upstairs activity, signal interference, a slightly open door, then a stable feed. The story shows no injury, gore, or harmful act. It unlocks targets and clears the record after playback so it can replay.

**Camera and presentation.** The sky, neighborhood, foliage, house, lamp, and effects live in an overscanned shared `scene-world`. Every close view scales and translates that world to a named scene coordinate; HUD, scanlines, vignette, and a rising binocular overlay remain fixed. The binocular overlay has two separate touching circles with no overlapping outline. The overscan keeps sky and street continuous during focus moves. Original inline SVG provides the window and door silhouettes; no external art assets are used.

**Accessibility and acceptance checks.**

- The three targets and the pause control are native buttons reachable and operable with keyboard; targets have descriptive accessible names and visible focus states.
- Target labels, hints, HUD, and controls remain readable over the scene; controls meet a 42px minimum height where applicable.
- Start, pause, reduced-motion, story lockout, success, reset, and replay work without a page reload.
- Browser audio failure or unsupported Web Audio does not block visual interaction.
- Pending Developer verification: inspect in a browser, test touch interaction and audio on a physical smartphone, and deploy to a public HTTPS URL.

## Scope and revisions

Record excluded ideas, the next behavior that must work, and consequential requirement changes with their evidence.

## Saving the transcript

When directed, save the complete conversation as `transcripts/spec-YYYY-MM-DD_HHMMSS.md`, label messages `Developer` and `Agent`, and confirm the path.
