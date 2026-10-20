const feed = document.querySelector('#feed');
const sceneWorld = document.querySelector('#scene-world');
const binocularMask = document.querySelector('#binocular-mask');
const startScreen = document.querySelector('#start-screen');
const enterButton = document.querySelector('#enter-button');
const pauseButton = document.querySelector('#pause-button');
const reduceMotion = document.querySelector('#reduce-motion');
const motionNote = document.querySelector('#motion-note');
const hint = document.querySelector('#hint');
const timestamp = document.querySelector('#timestamp');
const signal = document.querySelector('#signal');
const progressLabel = document.querySelector('#progress-label');
const storyMessage = document.querySelector('#story-message');
const focusUi = document.querySelector('#focus-ui');
const focusLabel = document.querySelector('#focus-label');
const returnOverview = document.querySelector('#return-overview');
const lampGlow = document.querySelector('.lamp-glow');
const upperWindow = document.querySelector('.upper-window');
const frontDoor = document.querySelector('.front-door');
const targets = [...document.querySelectorAll('.scene-target')];
const progressDots = [...document.querySelectorAll('.progress-dots i')];

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
reduceMotion.checked = motionQuery.matches;
motionNote.textContent = motionQuery.matches ? '(set from your device preference)' : '';

const state = {
  started: false, paused: false, reduced: reduceMotion.checked, progress: 0,
  hintSeconds: 0, hintTimer: null, ambientTimer: null, clockTimer: null,
  audio: null, ambientNodes: null, story: null, focusTarget: null,
  activeAnomaly: null, capturedAnomalies: new Set()
};

const hints = [
  'The feed is quiet. Let your eyes adjust.',
  'Watch for a change that does not belong.',
  'Anomalies can appear anywhere in the scene.',
  'Record each anomaly while it is visible.'
];
const anomalyTargets = ['lamp', 'window', 'door'];
const focusPoints = {
  lamp: { x: 0.13, y: 0.40, scale: 1.9 },
  window: { x: 0.52, y: 0.55, scale: 1.65 },
  door: { x: 0.69, y: 0.70, scale: 1.65 }
};

function formatTimestamp() {
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour12: false });
  timestamp.textContent = `${date} ${time}`;
}

function setHint(text) { hint.textContent = text; }

function updateHint() {
  state.hintSeconds += 1;
  if (state.hintSeconds === 12) setHint(hints[1]);
  if (state.hintSeconds === 28) setHint(hints[2]);
  if (state.hintSeconds === 48) setHint(hints[3]);
}

function startTimers() {
  state.hintTimer = window.setInterval(updateHint, 1000);
  state.clockTimer = window.setInterval(formatTimestamp, 1000);
  state.ambientTimer = window.setInterval(runAmbientEvent, 6500);
}

function runAmbientEvent() {
  if (state.story?.active || state.focusTarget || state.activeAnomaly) return;
  const available = anomalyTargets.filter((target) => !state.capturedAnomalies.has(target));
  if (!available.length) return;
  const chosen = available[Math.floor(Math.random() * available.length)];
  state.activeAnomaly = chosen;
  triggerEffect(`anomaly-${chosen}`);
  setHint('An anomaly is happening. Catch it on record before it fades.');
}

function stopTimers() {
  [state.hintTimer, state.clockTimer, state.ambientTimer].forEach((timer) => window.clearInterval(timer));
  state.hintTimer = state.clockTimer = state.ambientTimer = null;
}

function createAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext || state.audio) return;
  const audio = new AudioContext();
  const master = audio.createGain();
  master.gain.value = 0.16;
  master.connect(audio.destination);

  const length = audio.sampleRate * 2;
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) channel[i] = (Math.random() * 2 - 1) * 0.22;
  const noise = audio.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  const filter = audio.createBiquadFilter();
  filter.type = 'lowpass'; filter.frequency.value = 420; filter.Q.value = 0.35;
  const windGain = audio.createGain(); windGain.gain.value = 0.09;
  const drone = audio.createOscillator(); drone.type = 'sine'; drone.frequency.value = 51;
  const droneGain = audio.createGain(); droneGain.gain.value = 0.075;
  noise.connect(filter).connect(windGain).connect(master);
  drone.connect(droneGain).connect(master);
  noise.start(); drone.start();
  state.audio = audio;
  state.ambientNodes = { master, windGain, droneGain };
}

function storyTone(frequency, duration, volume = 0.16) {
  if (!state.audio || state.paused) return;
  const osc = state.audio.createOscillator();
  const gain = state.audio.createGain();
  osc.type = 'triangle'; osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, state.audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume, state.audio.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, state.audio.currentTime + duration);
  osc.connect(gain).connect(state.audio.destination); osc.start(); osc.stop(state.audio.currentTime + duration + 0.04);
}

function renderProgress() {
  progressLabel.textContent = `ANOMALIES RECORDED ${state.capturedAnomalies.size} / 3`;
  progressDots.forEach((dot, index) => dot.classList.toggle('active', index < state.capturedAnomalies.size));
}

function clearAnomaly() {
  feed.classList.remove('anomaly-lamp', 'anomaly-window', 'anomaly-door');
  state.activeAnomaly = null;
}

function triggerEffect(effectClass) {
  feed.classList.remove(effectClass);
  void feed.offsetWidth;
  feed.classList.add(effectClass);
}

function openFocus(target) {
  if (!state.started || state.paused || state.story?.active) return;
  state.focusTarget = target;
  feed.classList.remove('zoom-lamp', 'zoom-window', 'zoom-door');
  feed.classList.add('zoom-active', `zoom-${target}`);
  const point = focusPoints[target];
  const width = feed.clientWidth;
  const height = feed.clientHeight;
  const translateX = width / 2 - width * point.x * point.scale;
  const translateY = height * 0.48 - height * point.y * point.scale;
  sceneWorld.style.transform = `translate(${translateX}px, ${translateY}px) scale(${point.scale})`;
  binocularMask.classList.add('raised');
  focusLabel.textContent = `${target === 'lamp' ? 'DRIVEWAY LIGHT' : target === 'window' ? 'UPSTAIRS WINDOW' : 'FRONT DOOR'} — OBSERVING`;
  focusLabel.textContent = `${target === 'lamp' ? 'DRIVEWAY LIGHT' : target === 'window' ? 'UPSTAIRS WINDOW' : 'FRONT DOOR'} — OBSERVING`;
  focusUi.hidden = false;
  targets.forEach((sceneTarget) => { sceneTarget.disabled = true; });
}

function closeFocus() {
  if (!state.focusTarget) return;
  feed.classList.remove('zoom-active', 'zoom-lamp', 'zoom-window', 'zoom-door');
  sceneWorld.style.removeProperty('transform');
  binocularMask.classList.remove('raised');
  feed.classList.remove('anomaly-lamp', 'anomaly-window', 'anomaly-door');
  focusUi.hidden = true;
  state.focusTarget = null;
  if (!state.paused && !state.story?.active) targets.forEach((target) => { target.disabled = false; });
}

function recordObservation(selected) {
  if (selected !== state.activeAnomaly) {
    focusLabel.textContent = 'NOTHING TO RECORD';
    setHint('Nothing unusual is happening here. Return to overview and keep watch.');
    storyTone(125, 0.14, 0.08);
    return;
  }
  state.capturedAnomalies.add(selected);
  renderProgress();
  state.activeAnomaly = null;
  storyTone(selected === 'lamp' ? 370 : selected === 'window' ? 286 : 220, 0.18);
  focusLabel.textContent = 'ANOMALY RECORDED';
  setHint(state.capturedAnomalies.size === anomalyTargets.length ? 'All anomalies are on record.' : 'Recorded. Return to overview and watch for another anomaly.');
  if (state.capturedAnomalies.size === anomalyTargets.length) beginStory();
}

function handleTarget(event) {
  if (!state.started || state.paused || state.story?.active) return;
  const selected = event.currentTarget.dataset.target;
  openFocus(selected);
  recordObservation(selected);
}

function showStoryMessage(text) {
  storyMessage.textContent = text;
  storyMessage.classList.add('visible');
}

function clearStoryTimers() {
  if (!state.story) return;
  state.story.timers.forEach((timer) => window.clearTimeout(timer));
  state.story.timers = [];
}

function applyStoryEvents(elapsed) {
  const { events } = state.story;
  events.filter((event) => event.at <= elapsed && !event.done).forEach((event) => { event.done = true; event.run(); });
}

function scheduleStoryEvents() {
  const story = state.story;
  applyStoryEvents(story.elapsed);
  story.events.filter((event) => !event.done).forEach((event) => {
    const timer = window.setTimeout(() => {
      if (!state.paused && story.active) { event.done = true; event.run(); }
    }, event.at - story.elapsed);
    story.timers.push(timer);
  });
}

function beginStory() {
  if (state.paused || state.story?.active) return;
  closeFocus();
  feed.classList.add('story-running');
  targets.forEach((target) => { target.disabled = true; });
  state.story = {
    active: true, elapsed: 0, beganAt: Date.now(), timers: [], events: [
      { at: 0, done: false, run: () => { showStoryMessage('THE HOUSE RESPONDS'); feed.classList.add('lamp-flicker'); storyTone(92, 0.55, 0.22); } },
      { at: 1450, done: false, run: () => { feed.classList.add('story-window'); showStoryMessage('A LIGHT CROSSES UPSTAIRS'); storyTone(190, 0.35, 0.18); } },
      { at: 3500, done: false, run: () => { feed.classList.add('signal-lost'); showStoryMessage('SIGNAL INTERFERENCE'); storyTone(62, 0.8, 0.25); } },
      { at: 5100, done: false, run: () => { feed.classList.remove('signal-lost'); feed.classList.add('story-door'); showStoryMessage('THE DOOR ISN\'T CLOSED'); storyTone(145, 0.5, 0.2); } },
      { at: 7250, done: false, run: endStory }
    ]
  };
  signal.textContent = 'SIGNAL: TRACKING';
  scheduleStoryEvents();
}

function endStory() {
  clearStoryTimers();
  feed.classList.remove('story-running', 'lamp-flicker', 'story-window', 'signal-lost', 'story-door');
  clearAnomaly();
  feed.classList.add('story-complete');
  state.story.active = false;
  targets.forEach((target) => { target.disabled = false; });
  signal.textContent = 'SIGNAL: STABLE';
  storyMessage.classList.remove('visible');
  setHint('The anomalies will return. Watch closely.');
  state.capturedAnomalies.clear();
  renderProgress();
  storyTone(84, 0.38, 0.12);
}

function pauseStory() {
  if (!state.story?.active) return;
  state.story.elapsed = Date.now() - state.story.beganAt;
  clearStoryTimers();
}

function resumeStory() {
  if (!state.story?.active) return;
  state.story.beganAt = Date.now() - state.story.elapsed;
  scheduleStoryEvents();
}

async function togglePause() {
  if (!state.started) return;
  state.paused = !state.paused;
  document.body.classList.toggle('is-paused', state.paused);
  pauseButton.textContent = state.paused ? 'Resume feed' : 'Pause feed';
  pauseButton.setAttribute('aria-pressed', String(state.paused));
  if (state.paused) {
    stopTimers(); pauseStory();
    targets.forEach((target) => { target.disabled = true; });
    returnOverview.disabled = true;
    if (state.audio?.state === 'running') await state.audio.suspend();
    setHint('Feed paused. Motion, sound, and interaction are on hold.');
  } else {
    if (state.audio?.state === 'suspended') await state.audio.resume();
    startTimers(); resumeStory();
    returnOverview.disabled = false;
    if (!state.story?.active && !state.focusTarget) targets.forEach((target) => { target.disabled = false; });
    setHint(state.story?.active ? 'The feed continues.' : state.capturedAnomalies.size ? 'Keep watch for another anomaly.' : hints[Math.min(3, Math.floor(state.hintSeconds / 16))]);
  }
}

function enterFeed() {
  state.started = true;
  state.reduced = reduceMotion.checked;
  document.body.classList.toggle('reduced-motion', state.reduced);
  createAudio();
  state.audio?.resume();
  startScreen.classList.add('hidden');
  pauseButton.disabled = false;
  formatTimestamp(); startTimers();
  setHint(state.reduced ? 'Reduced motion is active. Static anomaly markers can still be recorded.' : 'Watch for an anomaly, then select that location to record it.');
  runAmbientEvent();
}

reduceMotion.addEventListener('change', () => { state.reduced = reduceMotion.checked; });
enterButton.addEventListener('click', enterFeed);
pauseButton.addEventListener('click', togglePause);
targets.forEach((target) => target.addEventListener('click', handleTarget));
returnOverview.addEventListener('click', () => { closeFocus(); setHint('Select another location to continue the trace.'); });
lampGlow.addEventListener('animationend', () => feed.classList.remove('lamp-flicker'));
upperWindow.addEventListener('animationend', (event) => {
  if (event.animationName === 'window-light') feed.classList.remove('window-event');
  if (event.animationName === 'window-anomaly' && state.activeAnomaly === 'window') clearAnomaly();
});
lampGlow.addEventListener('animationend', (event) => {
  if (event.animationName === 'lamp-anomaly' && state.activeAnomaly === 'lamp') clearAnomaly();
});
frontDoor.addEventListener('animationend', (event) => {
  if (event.animationName === 'door-anomaly' && state.activeAnomaly === 'door') clearAnomaly();
});
