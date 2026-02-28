// ─── ACHIEVEMENTS ENGINE ──────────────────────────────────────────────────────
// Handles unlock logic, toast queue, and achievement viewer.
// Call the exported event hooks from game.js / effects.js at the right moments.
// ─────────────────────────────────────────────────────────────────────────────

import { ACHIEVEMENTS } from "../data/achievements.js";
import { PROJECTS } from "../data/projects.js";
import { getLang } from "./i18n.js";
import { showModal } from "./modal.js";
import { playSFX } from "./audio.js";

// ── Internal state ─────────────────────────────────────────────────────────
const _unlocked = new Set(); // ids of already-unlocked achievements
const _projHit = new Set(); // project ids that have been blasted
let _combo = 0; // consecutive hits without a miss
let _shotFired = false; // first-shot guard

const TOTAL = ACHIEVEMENTS.length;

// ── Toast queue ────────────────────────────────────────────────────────────
const _queue = [];
let _toastActive = false;

/** Unlock an achievement by id (no-op if already unlocked). */
export function unlock(id) {
  if (_unlocked.has(id)) return;
  const ach = ACHIEVEMENTS.find((a) => a.id === id);
  if (!ach) return;

  _unlocked.add(id);
  _updateHUDBtn();
  _enqueueToast(ach);

  // ── GA: achievement unlocked ──────────────────────────────────────────
  if (typeof gtag === "function") {
    gtag("event", "achievement_unlocked", {
      achievement_id: id,
    });
  }
}

function _enqueueToast(ach) {
  _queue.push(ach);
  if (!_toastActive) _showNextToast();
}

function _showNextToast() {
  if (_queue.length === 0) {
    _toastActive = false;
    return;
  }
  _toastActive = true;
  const ach = _queue.shift();
  const lang = getLang();

  // Try to play a chime; silently ignore if SFX are off
  try {
    playSFX("hit");
  } catch (_) {}

  const toast = document.createElement("div");
  toast.className = `ach-toast ach-rarity-${ach.rarity}`;
  toast.innerHTML = `
    <div class="ach-toast-header">
      <span class="ach-toast-header-text">◆ ACHIEVEMENT UNLOCKED ◆</span>
    </div>
    <div class="ach-toast-body">
      <div class="ach-toast-icon">${ach.icon}</div>
      <div class="ach-toast-info">
        <div class="ach-toast-title">${ach.title[lang] ?? ach.title.en}</div>
        <div class="ach-toast-desc">${ach.desc[lang] ?? ach.desc.en}</div>
      </div>
    </div>
    <div class="ach-toast-bar">
      <div class="ach-toast-bar-fill"></div>
    </div>`;

  document.body.appendChild(toast);

  // Trigger slide-in on next frame
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      toast.classList.add("ach-toast-in");
    }),
  );

  // Dismiss after 3.5 s
  setTimeout(() => {
    toast.classList.remove("ach-toast-in");
    toast.classList.add("ach-toast-out");
    setTimeout(() => {
      toast.remove();
      _showNextToast();
    }, 500);
  }, 3500);
}

// ── HUD counter ────────────────────────────────────────────────────────────
function _updateHUDBtn() {
  const btn = document.getElementById("ach-hud-btn");
  const count = document.getElementById("ach-count");
  if (!btn || !count) return;
  count.textContent = _unlocked.size;
  if (_unlocked.size === TOTAL) btn.classList.add("ach-btn-complete");
}

export function initAchievementsHUD() {
  const total = document.getElementById("ach-total");
  if (total) total.textContent = TOTAL;
  _updateHUDBtn();
}

// ── Viewer modal ───────────────────────────────────────────────────────────
export function openAchievementsViewer() {
  const lang = getLang();

  // Build rarity order
  const rarityOrder = { common: 0, uncommon: 1, rare: 2, legendary: 3 };
  const sorted = [...ACHIEVEMENTS].sort(
    (a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity],
  );

  const rarityLabel = {
    common: "COMMON",
    uncommon: "UNCOMMON",
    rare: "RARE",
    legendary: "LEGENDARY",
  };
  const rarityColor = {
    common: "var(--neon-cyan)",
    uncommon: "var(--neon-green)",
    rare: "var(--neon-pink)",
    legendary: "var(--neon-yellow)",
  };

  const cards = sorted
    .map((ach) => {
      const done = _unlocked.has(ach.id);
      const color = rarityColor[ach.rarity];
      return `
      <div class="ach-card ${done ? "ach-card-done" : "ach-card-locked"}" data-rarity="${ach.rarity}">
        <div class="ach-card-icon">${done ? ach.icon : "?"}</div>
        <div class="ach-card-info">
          <div class="ach-card-title" style="color:${color}">${done ? (ach.title[lang] ?? ach.title.en) : "???"}</div>
          <div class="ach-card-desc">${done ? (ach.desc[lang] ?? ach.desc.en) : "[ LOCKED ]"}</div>
          <div class="ach-card-rarity" style="color:${color}">${rarityLabel[ach.rarity]}</div>
        </div>
        ${done ? '<div class="ach-card-check">✓</div>' : ""}
      </div>`;
    })
    .join("");

  const pct = Math.round((_unlocked.size / TOTAL) * 100);
  const progressBar = `
    <div class="ach-viewer-progress">
      <div class="ach-viewer-progress-label">
        COMPLETION — ${_unlocked.size} / ${TOTAL} &nbsp;(${pct}%)
      </div>
      <div class="ach-viewer-progress-track">
        <div class="ach-viewer-progress-fill" style="width:${pct}%"></div>
      </div>
    </div>`;

  showModal(
    "🏆 ACHIEVEMENTS",
    `${progressBar}<div class="ach-grid">${cards}</div>`,
  );
}

// ── Event hooks (call these from game.js / effects.js) ─────────────────────

/** Call every time a shot is fired. */
export function onShot() {
  if (!_shotFired) {
    _shotFired = true;
    unlock("FIRST_BLOOD");
  }
}

/** Call when ammo hits zero. */
export function onAmmoEmpty() {
  unlock("OUT_OF_AMMO");
}

/** Call on every successful target hit.
 *  @param {"head"|"project"|"social"|"lang"|"sound"|"music"} type
 *  @param {object} [data] - project object if type is "project"
 */
export function onHit(type, data) {
  _combo++;

  if (type === "head") unlock("HEADHUNTER");
  if (type === "social") unlock("SOCIAL_BUTTERFLY");
  if (type === "lang") unlock("LINGUIST");
  if (type === "music") unlock("MAESTRO");
  if (type === "sun") unlock("SUN_HUNTER");

  if (type === "project" && data?.id) {
    unlock("UFO_DOWN");
    _projHit.add(data.id);
    if (_projHit.size >= PROJECTS.length) unlock("COMPLETIONIST");
  }

  if (_combo >= 3) unlock("COMBO_3");
  if (_combo >= 5) unlock("SHARPSHOOTER");
}

/** Call whenever a shot misses (hits empty sky). */
export function onMiss() {
  _combo = 0;
}

/** Call whenever the score changes. */
export function onScore(score) {
  if (score >= 1000) unlock("HIGH_SCORE");
  if (score >= 2500) unlock("ELITE");
}

// ── Idle timer — unlock IDLE_5 after 5 minutes of no activity ──────────────
let _idleTimer = null;
const IDLE_MS = 5 * 60 * 1000;

function _resetIdle() {
  if (_idleTimer) clearTimeout(_idleTimer);
  _idleTimer = setTimeout(() => unlock("IDLE_5"), IDLE_MS);
}

/** Call once after the game starts to begin tracking idle time. */
export function startIdleTimer() {
  _resetIdle();
  ["mousemove", "click", "keydown", "touchstart", "touchmove"].forEach((evt) =>
    document.addEventListener(evt, _resetIdle, { passive: true }),
  );
}
