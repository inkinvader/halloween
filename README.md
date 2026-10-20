# Night Watch — Phase 1

`Night Watch` is a static, mobile-first browser experience for Project 4. It uses no third-party assets or libraries: artwork is HTML/CSS and inline SVG, while ambience is generated through the browser Web Audio API after the player selects **Enter the feed**.

## Run locally

Open `index.html` through a local static-server extension such as VS Code Live Preview or Live Server. A server is recommended because some browsers restrict audio from `file:` URLs.

## Test before submitting

1. Select **Enter the feed**.
2. Verify the three labelled locations work by keyboard and touch.
3. Capture lamp, window, and door anomalies in any order while active.
4. Verify the final 7.25-second sequence plays, then resets for replay.
5. Toggle reduced motion before Enter; anomalies should become stable but remain recordable.
6. Pause during ambience and the final sequence; Resume should continue it.
7. Publish `dist/` to a public HTTPS host and repeat these steps on a physical phone.

## Credits

Original HTML, CSS, JavaScript, inline SVG art, and procedural audio: Project 4 developer. Replace the visible generic creator credit in `index.html` with the required name before submission if your instructor requires a specific form of attribution.
