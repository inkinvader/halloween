# Research

> EDITING DIRECTIVE: DEVELOPER AND AGENT EDIT THIS FILE COLLABORATIVELY. THE DEVELOPER MUST REVIEW AND APPROVE ITS CONTENT.

Purpose: Keep the evidence and creative decisions that currently guide the build.

## Working agreement

Developer: Run the starter first. Direct the inquiry, judge sources and options, make consequential decisions, and keep this file current.

Agent: Read `AGENTS.md`, `brief.md`, and this file, then inspect the project. Help compare possibilities, test assumptions quickly, and verify external sources without delaying the prototype for exhaustive research.

Start a fresh chat with:

`Read brief.md and research.md, inspect the running project, and help me develop the scene and three spooky stories.`

## Inquiry and decisions

Record only what informs the next build decisions:

- creative alternatives for the scene, stories, and audiovisual direction, with reasons for your choices
- useful sources and references, what they support, and important limitations
- experiments that resolve uncertainty, the results, and consequential trade-offs

Investigate unfamiliar techniques or asset sources as needed. Verify usage terms and keep source links and required credits here. Distinguish evidence from assumptions; the Agent's recommendation alone is not evidence.

### Approved Phase 1 direction — Night Watch

- **Chosen setting:** A fixed night-security view of an ordinary house at the edge of a quiet neighborhood. The house is the focal point; the streetlamp, driveway/front door, upstairs window, hedges, and mailbox establish the setting.
- **Tone:** Grounded, eerie, and age-appropriate. Tension comes from ambiguous changes to an apparently empty scene; no person, violence, gore, or real-world suffering is shown.
- **Viewer role:** The User is the unseen, intrusive observer. The house and its occupant are not a threat to the User; the unease comes from choosing to look closer and realizing the house may be responding to that attention. The experience keeps this implication nonviolent and avoids depicting fear, confrontation, or harm.
- **Reference boundary:** The surveillance-feed tension of *Night Trap* (1992) is a creative reference only. This build uses original layout, story, graphics, text, and sound.
- **Asset decision:** The visual scene is authored in HTML/CSS. Ambient wind/drone and story tones are generated with the browser Web Audio API after the User enters; no external audio, visual, code, or AI assets are used. No third-party asset licenses or attribution obligations apply beyond crediting the Developer.
- **Realism revision:** CSS detail and contrast now support a closer surveillance-camera feeling, but a photographic background will be the material visual upgrade later. The layout keeps environmental elements separate so a licensed/original still can replace the CSS scene without changing the interaction system.
- **Anomaly direction:** The viewer is concealed by original CSS hedge and branch silhouettes. Three non-graphic anomalies may be captured in any order: a streetlamp flashes twice, appears to shed glass, then reverses; a lit window briefly contains two contradictory human-like shadows; an ajar door shows multiple dark, jointed silhouettes reaching only from one side before retracting. The lamp animation uses two flashes over its 5.4-second cycle, below the three-flashes-per-second guidance in [WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold).
- **Asset decision revision:** The build stays asset-free. Clearer window and door anatomy is supplied by original inline SVG paths rather than a generated asset. This retains editability and avoids a licensing/source burden, while accepting that a photographic asset would be the later path to realism beyond the CSS/SVG style.

## Revisions

Update decisions when new evidence changes the direction, linking to playtest observations in `plan.md` rather than copying them. Keep chosen behavior and asset requirements in `spec.md`. The Developer confirms when the inquiry is sufficient to continue building; exhaustive research is not a prerequisite.

## Saving the transcript

When directed, save the complete conversation as `transcripts/research-YYYY-MM-DD_HHMMSS.md`, label messages `Developer` and `Agent`, and confirm the path.
