// ─── TARGETS ──────────────────────────────────────────────────────────────────
// Functions that create and append all target types to the sky container.
// Each target is positioned and moved by the physics engine (physics.js).
// CSS fly animations are disabled; left/top/transform are set every rAF tick.
// ─────────────────────────────────────────────────────────────────────────────

import { state, MOB_SCALE, isMobile } from "./state.js";

const sky = document.getElementById("sky");

/** Collision radius (px) — scaled down on mobile. */
const RADIUS = {
  head: Math.round(46 * MOB_SCALE),
  project: Math.round(38 * MOB_SCALE),
  social: Math.round(30 * MOB_SCALE),
  lang: Math.round(32 * MOB_SCALE),
  sound: Math.round(30 * MOB_SCALE),
  music: Math.round(30 * MOB_SCALE),
};

const HUD_H = isMobile ? 42 : 62;
const GROUND_H = isMobile ? 50 : 80;

// ── Global hover tooltip (appended to body so it is never clipped) ──────────
const _tooltip = document.createElement("div");
_tooltip.id = "target-tooltip";
_tooltip.innerHTML = `<img class="tt-img" src="" alt=""><div class="tt-name"></div>`;
document.body.appendChild(_tooltip);

document.addEventListener("mousemove", (e) => {
  if (_tooltip.classList.contains("tt-visible")) {
    _tooltip.style.left = `${e.clientX + 18}px`;
    _tooltip.style.top = `${e.clientY - 10}px`;
  }
});

function _showTooltip(imgSrc, name, e) {
  _tooltip.querySelector(".tt-img").src = imgSrc;
  _tooltip.querySelector(".tt-name").textContent = name;
  _tooltip.style.left = `${e.clientX + 18}px`;
  _tooltip.style.top = `${e.clientY - 10}px`;
  _tooltip.classList.add("tt-visible");
}
function _hideTooltip() {
  _tooltip.classList.remove("tt-visible");
}

/**
 * Show / hide the hover tooltip from external code (mobile aim loop).
 * @param {string} imgSrc
 * @param {string} name
 * @param {number} x  – clientX
 * @param {number} y  – clientY
 */
export function showTooltipAt(imgSrc, name, x, y) {
  _tooltip.querySelector(".tt-img").src = imgSrc;
  _tooltip.querySelector(".tt-name").textContent = name;
  _tooltip.style.left = `${x + 18}px`;
  _tooltip.style.top = `${y - 10}px`;
  _tooltip.classList.add("tt-visible");
}
export function hideTooltip() {
  _hideTooltip();
}

// ── About-me photo pool ──────────────────────────────────────────────────────
const HEAD_PHOTOS = [
  "img/about/Me_Front.png",
  "img/about/Me_Left.png",
  "img/about/Me_Nice.png",
  "img/about/Me_Right.png",
];

let _lastHeadPhoto = 0;

/**
 * Pick a new (different) random photo for the head target and apply it.
 * Called from physics.js on collision.
 */
export function randomizeHeadPhoto(el) {
  const img = el.querySelector(".head-photo");
  if (!img) return;
  let next;
  do {
    next = Math.floor(Math.random() * HEAD_PHOTOS.length);
  } while (next === _lastHeadPhoto && HEAD_PHOTOS.length > 1);
  _lastHeadPhoto = next;
  img.src = HEAD_PHOTOS[next];
}

/**
 * Compute a random initial position (well inside viewport) and velocity.
 */
function _spawnPhysics(type, speedMin = 0.55, speedMax = 1.4) {
  const r = RADIUS[type] ?? 30;
  const W = window.innerWidth;
  const H = window.innerHeight - GROUND_H;
  const x = r + 20 + Math.random() * (W - 2 * r - 40);
  const y = HUD_H + r + 20 + Math.random() * (H - HUD_H - 2 * r - 40);
  const speed = speedMin + Math.random() * (speedMax - speedMin);
  const angle = Math.random() * Math.PI * 2;
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    active: true,
  };
}

/** Strip the CSS fly animation off a newly-created target element. */
function _disableAnim(el) {
  el.style.animation = "none";
  el.style.position = "absolute";
}

// ── Head ───────────────────────────────────────────────────────────────────
export function createHeadTarget(onHit) {
  const el = document.createElement("div");
  el.classList.add("target");
  el.id = "head-target";
  const _hs = Math.round(90 * MOB_SCALE);
  el.style.cssText = `--glow: var(--neon-pink); width:${_hs}px; height:${_hs}px;`;
  _disableAnim(el);

  // Scale the head-photo-wrap to match
  el.innerHTML = `
    <div class="head-photo-wrap" style="width:${_hs}px;height:${_hs}px;">
      <img class="head-photo" src="${HEAD_PHOTOS[0]}" alt="me" draggable="false">
      <div class="head-ring"></div>
    </div>
  `;

  el.addEventListener("click", (e) => {
    e.stopPropagation();
    onHit(el, e);
  });
  sky.appendChild(el);
  state.targets.push({ el, type: "head", ..._spawnPhysics("head", 0.5, 0.9) });
}

// ── UFO / Project ──────────────────────────────────────────────────────────
export function createProjectTarget(proj, index, onHit) {
  const el = document.createElement("div");
  el.classList.add("target", "project-target");

  const palette = ["#00f5ff", "#bf00ff", "#ff2d78", "#39ff14", "#ffe600"];
  const col = palette[index % palette.length];
  const num = String(proj.id).padStart(2, "0");

  // Short title shown on the UFO dome (max ~12 chars, truncated)
  const shortTitle =
    proj.title.length > 14 ? proj.title.slice(0, 13) + "…" : proj.title;

  const _ps = Math.round(75 * MOB_SCALE);
  el.style.cssText = `--glow:${col}; width:${_ps}px; height:${_ps}px;`;
  _disableAnim(el);
  el.innerHTML = `
    <svg width="75" height="75" viewBox="0 0 75 75">
      <ellipse cx="37.5" cy="40" rx="30" ry="12" fill="${col}" opacity="0.15"/>
      <ellipse cx="37.5" cy="40" rx="30" ry="12" fill="none" stroke="${col}" stroke-width="1.5" opacity="0.8"/>
      <ellipse cx="37.5" cy="36" rx="18" ry="14" fill="#0d0221" stroke="${col}" stroke-width="1.5"/>
      <ellipse cx="37.5" cy="36" rx="12" ry="9" fill="none" stroke="${col}" stroke-width="1" opacity="0.5"/>
      <text x="37.5" y="39" font-family="'Press Start 2P',monospace" font-size="8" fill="${col}" text-anchor="middle" font-weight="bold">${num}</text>
      <circle cx="22"   cy="44" r="3" fill="${col}" opacity="0.8"/>
      <circle cx="37.5" cy="47" r="3" fill="${col}" opacity="0.8"/>
      <circle cx="53"   cy="44" r="3" fill="${col}" opacity="0.8"/>
      <polygon points="27,52 48,52 42,68 33,68" fill="${col}" opacity="0.08"/>
      <line x1="33" y1="52" x2="33" y2="68" stroke="${col}" stroke-width="0.5" opacity="0.3"/>
      <line x1="42" y1="52" x2="42" y2="68" stroke="${col}" stroke-width="0.5" opacity="0.3"/>
    </svg>
    <div class="proj-seen-badge">&#10003;</div>
  `;

  el.addEventListener("mouseenter", (e) =>
    _showTooltip(proj.img, proj.title, e),
  );
  el.addEventListener("mouseleave", _hideTooltip);
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    _hideTooltip();
    onHit(el, proj, e);
  });
  sky.appendChild(el);
  state.targets.push({
    el,
    type: "project",
    data: proj,
    ..._spawnPhysics("project"),
  });
}

// ── Social icon ────────────────────────────────────────────────────────────
export function createSocialTarget(social, index, onHit) {
  const el = document.createElement("div");
  el.classList.add("target", "social-target");

  const _ss = Math.round(60 * MOB_SCALE);
  el.style.cssText = `--glow:${social.color}; width:${_ss}px; height:${_ss}px;`;
  _disableAnim(el);
  el.innerHTML = `
    <div class="social-logo-wrap" style="border-color:${social.color}; box-shadow:0 0 10px ${social.color}66;">
      <img class="social-logo" src="${social.img}" alt="${social.label}" draggable="false">
    </div>
  `;

  el.addEventListener("mouseenter", (e) =>
    _showTooltip(social.img, social.label, e),
  );
  el.addEventListener("mouseleave", _hideTooltip);
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    _hideTooltip();
    onHit(el, social, e);
  });
  sky.appendChild(el);
  state.targets.push({
    el,
    type: "social",
    data: social,
    ..._spawnPhysics("social"),
  });
}

// ── Language toggle ────────────────────────────────────────────────────────
/**
 * A shootable floating target that toggles EN ↔ FR.
 * Shooting it removes the element; game.js re-creates a fresh one at a new spot.
 * The text label (showing the OTHER language) is updated by applyTranslations().
 */
export function createLangTarget(onHit) {
  const el = document.createElement("div");
  el.classList.add("target", "lang-target");
  el.id = "lang-target-el";

  const _ls = Math.round(64 * MOB_SCALE);
  el.style.cssText = `--glow:#ffe600; width:${_ls}px; height:${_ls}px;`;
  _disableAnim(el);

  el.innerHTML = `
    <svg width="64" height="64" viewBox="0 0 64 64">
      <!-- Outer ring -->
      <circle cx="32" cy="32" r="29" fill="#0d0221" stroke="#ffe600" stroke-width="2"/>
      <circle cx="32" cy="32" r="29" fill="#ffe600" opacity="0.06"/>
      <!-- Globe lines -->
      <ellipse cx="32" cy="32" rx="29" ry="14" fill="none" stroke="#ffe600" stroke-width="0.8" opacity="0.4"/>
      <line x1="3" y1="32" x2="61" y2="32" stroke="#ffe600" stroke-width="0.8" opacity="0.3"/>
      <line x1="32" y1="3" x2="32" y2="61" stroke="#ffe600" stroke-width="0.8" opacity="0.3"/>
      <!-- Label — updated by applyTranslations() via #lang-target-label -->
      <text id="lang-target-label" x="32" y="38"
        font-family="'Press Start 2P',monospace"
        font-size="11"
        fill="#ffe600"
        text-anchor="middle"
        font-weight="bold">FR</text>
    </svg>
  `;
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    onHit(el, e);
  });
  sky.appendChild(el);
  state.targets.push({ el, type: "lang", ..._spawnPhysics("lang", 0.6, 1.1) });
}

// ── Sound FX toggle ─────────────────────────────────────────────────────────
/**
 * Persistent toggle target for Sound FX (on/off).
 * Shooting toggles state without removing the target.
 */
export function createSoundTarget(onHit) {
  const el = document.createElement("div");
  el.classList.add("target", "sound-target");
  el.id = "sound-target-el";

  const _sndS = Math.round(64 * MOB_SCALE);
  el.style.cssText = `--glow:#00f5ff; width:${_sndS}px; height:${_sndS}px;`;
  _disableAnim(el);

  el.innerHTML = `
    <svg width="64" height="64" viewBox="0 0 64 64">
      <rect x="3" y="3" width="58" height="58" rx="10" fill="#0d0221" stroke="#00f5ff" stroke-width="2"/>
      <rect x="3" y="3" width="58" height="58" rx="10" fill="#00f5ff" opacity="0.06"/>
      <!-- Speaker icon -->
      <polygon points="18,22 26,22 34,15 34,49 26,42 18,42" fill="#00f5ff" opacity="0.9"/>
      <path d="M37 24 Q44 32 37 40" fill="none" stroke="#00f5ff" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M41 20 Q51 32 41 44" fill="none" stroke="#00f5ff" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      <!-- State label -->
      <text class="sfx-state-label" x="32" y="59"
        font-family="'Press Start 2P',monospace"
        font-size="5" fill="#00f5ff" text-anchor="middle">SFX:ON</text>
    </svg>
  `;
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    onHit(el, e);
  });
  sky.appendChild(el);
  state.targets.push({
    el,
    type: "sound",
    ..._spawnPhysics("sound", 0.4, 0.9),
  });
}

// ── Music toggle ────────────────────────────────────────────────────────────
/**
 * Persistent toggle target for Background Music (on/off).
 */
export function createMusicTarget(onHit) {
  const el = document.createElement("div");
  el.classList.add("target", "music-target");
  el.id = "music-target-el";

  const _musS = Math.round(64 * MOB_SCALE);
  el.style.cssText = `--glow:#bf00ff; width:${_musS}px; height:${_musS}px;`;
  _disableAnim(el);
  // Reflect the current musicOn state visually at spawn time
  if (!state.musicOn) {
    el.style.filter = "drop-shadow(0 0 4px #333) brightness(0.4) grayscale(1)";
  }

  el.innerHTML = `
    <svg width="64" height="64" viewBox="0 0 64 64">
      <rect x="3" y="3" width="58" height="58" rx="10" fill="#0d0221" stroke="#bf00ff" stroke-width="2"/>
      <rect x="3" y="3" width="58" height="58" rx="10" fill="#bf00ff" opacity="0.06"/>
      <!-- Music note -->
      <path d="M27 44 L27 22 L45 18 L45 38" stroke="#bf00ff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="23" cy="46" r="5" fill="#bf00ff" opacity="0.9"/>
      <circle cx="41" cy="40" r="5" fill="#bf00ff" opacity="0.9"/>
      <!-- State label -->
      <text class="bgm-state-label" x="32" y="59"
        font-family="'Press Start 2P',monospace"
        font-size="5" fill="#bf00ff" text-anchor="middle">${state.musicOn ? "BGM:ON" : "BGM:OFF"}</text>
    </svg>
  `;
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    onHit(el, e);
  });
  sky.appendChild(el);
  state.targets.push({
    el,
    type: "music",
    ..._spawnPhysics("music", 0.4, 0.9),
  });
}
