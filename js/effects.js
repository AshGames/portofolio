// ─── EFFECTS ──────────────────────────────────────────────────────────────────
// Visual effects: shoot flash, burst, score popup.
// Also: environment creation (stars, trees).
// ─────────────────────────────────────────────────────────────────────────────

import { state } from "./state.js";
import { updateHUD } from "./hud.js";
import { playSFX } from "./audio.js";
import { onShot, onAmmoEmpty } from "./achievements.js";

const cursor = document.getElementById("cursor");

// ── Shoot ──────────────────────────────────────────────────────────────────
/**
 * Consume one ammo, play muzzle + burst, and trigger auto-reload at 0.
 * @param {number} x  - clientX of the shot
 * @param {number} y  - clientY of the shot
 */
export function shoot(x, y) {
  if (state.ammo <= 0) return;

  state.ammo = Math.max(0, state.ammo - 1);

  cursor.classList.add("shooting");
  setTimeout(() => cursor.classList.remove("shooting"), 150);

  playSFX("shoot");
  spawnMuzzle(x, y);
  spawnBurst(x, y);
  onShot();

  if (state.ammo === 0) {
    onAmmoEmpty();
    setTimeout(() => {
      state.ammo = 10;
      updateHUD();
    }, 2500);
  }

  updateHUD();
}

function spawnMuzzle(x, y) {
  const flash = document.createElement("div");
  flash.id = "muzzle";
  flash.style.left = `${x}px`;
  flash.style.top = `${y}px`;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 150);
}

function spawnBurst(x, y) {
  const burst = document.createElement("div");
  burst.classList.add("shot-burst");
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;
  burst.innerHTML = `
    <svg width="60" height="60" viewBox="0 0 60 60">
      ${Array.from({ length: 8 }, (_, i) => {
        const angle = i * 45;
        const r = 25;
        const x2 = 30 + r * Math.cos((angle * Math.PI) / 180);
        const y2 = 30 + r * Math.sin((angle * Math.PI) / 180);
        return `<line x1="30" y1="30" x2="${x2}" y2="${y2}" stroke="#ffe600" stroke-width="2" opacity="0.8"/>`;
      }).join("")}
      <circle cx="30" cy="30" r="6" fill="#ffe600"/>
    </svg>`;
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 500);
}

// ── Score popup ────────────────────────────────────────────────────────────
/**
 * Spawn a floating "+100" / "-10" label at (x, y).
 * @param {number} x
 * @param {number} y
 * @param {string} text
 */
export function showScorePopup(x, y, text) {
  const popup = document.createElement("div");
  popup.classList.add("score-popup");
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;
  popup.textContent = text;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1000);
}

// ── Environment ────────────────────────────────────────────────────────────
/** Populate the sky element with twinkling star divs. */
export function createStars(sky) {
  for (let i = 0; i < 120; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      width:${size}px;
      height:${size}px;
      background:white;
      --d:${(Math.random() * 3 + 1).toFixed(1)}s;
      animation-delay:${(Math.random() * 3).toFixed(1)}s;
    `;
    sky.appendChild(star);
  }
}

// ── Bump FX ────────────────────────────────────────────────────────────────

/**
 * Spawn 8 small pixel particles that burst outward from (x, y).
 * Called by the physics engine on target-to-target collision.
 */
export function spawnBumpParticles(x, y) {
  const palette = ["#ff2d78", "#00f5ff", "#ffe600", "#bf00ff", "#39ff14"];
  for (let i = 0; i < 8; i++) {
    const p = document.createElement("div");
    p.classList.add("bump-particle");
    const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 35 + Math.random() * 45;
    const color = palette[Math.floor(Math.random() * palette.length)];
    const size = 3 + Math.random() * 5;
    p.style.cssText = `
      left:${x}px;top:${y}px;
      width:${size}px;height:${size}px;
      background:${color};
      box-shadow:0 0 6px ${color};
      --bpx:${(Math.cos(angle) * dist).toFixed(1)}px;
      --bpy:${(Math.sin(angle) * dist).toFixed(1)}px;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 550);
  }
}

/**
 * Spawn a dramatic burst of particles when a target is shot.
 * @param {number} x      - centre X (clientX)
 * @param {number} y      - centre Y (clientY)
 * @param {string} color  - primary colour of the explosion
 */
export function spawnExplosionParticles(x, y, color = "#ffe600") {
  const palette = [color, "#ffffff", "#ffe600", "#ff2d78", "#00f5ff"];
  const count = 24;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.classList.add("explode-particle");
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.35;
    const dist = 65 + Math.random() * 100;
    const c = palette[Math.floor(Math.random() * palette.length)];
    const size = 4 + Math.random() * 9;
    p.style.cssText = `
      left:${x}px; top:${y}px;
      width:${size}px; height:${size}px;
      background:${c};
      box-shadow:0 0 8px ${c}, 0 0 16px ${c};
      --epx:${(Math.cos(angle) * dist).toFixed(1)}px;
      --epy:${(Math.sin(angle) * dist).toFixed(1)}px;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 700);
  }
}

/**
 * Briefly flash-highlight a target element after a bump collision.
 * Uses a CSS class so it never conflicts with the transform set by physics.js.
 */
export function shakeTarget(el) {
  el.classList.remove("target-bumped");
  void el.offsetWidth; // force reflow so animation restarts cleanly
  el.classList.add("target-bumped");
  setTimeout(() => el.classList.remove("target-bumped"), 350);
}

// ── Environment ────────────────────────────────────────────────────────────

/** Append decorative pixel trees to the document body. */
export function makeTrees() {
  const positions = [5, 12, 25, 40, 55, 68, 78, 88];
  positions.forEach((x) => {
    const tree = document.createElement("div");
    tree.classList.add("tree");
    const h = 60 + Math.random() * 60;
    tree.style.cssText = `left:${x}%;width:${14 + Math.random() * 8}px;height:${h}px;`;
    tree.innerHTML = `
      <div style="width:100%;height:70%;background:linear-gradient(180deg,#166a2c,#0d4d1f);clip-path:polygon(50% 0%,100% 100%,0% 100%);margin:0 auto;box-shadow:0 0 12px rgba(25,150,50,0.4)"></div>
      <div style="width:35%;height:35%;background:#3d2b1f;margin:0 auto"></div>
    `;
    document.body.appendChild(tree);
  });
}
