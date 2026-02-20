// ─── PHYSICS ──────────────────────────────────────────────────────────────────
// JS-driven rAF loop that replaces CSS fly animations.
// • Keeps every target inside the viewport (wall bounce).
// • Detects target-to-target collisions, resolves them with elastic velocity
//   exchange, and triggers bump FX (particles + flash) via effects.js.
// ─────────────────────────────────────────────────────────────────────────────

import { state } from "./state.js";
import { spawnBumpParticles, shakeTarget } from "./effects.js";
import { randomizeHeadPhoto } from "./targets.js";

const HUD_H = 62; // height of top HUD bar in px
const GROUND_H = 80; // height of bottom ground bar in px

/** Collision radius (px) per target type — matches half the SVG viewBox. */
export const TARGET_RADIUS = {
  head: 46,
  project: 38,
  social: 30,
  lang: 32,
  sound: 30,
  music: 30,
};

/** Debounce table so the same pair doesn't fire bump FX every frame. */
const bumpTimers = new Map();

let _running = false;

/** Start the physics loop. Safe to call multiple times (idempotent). */
export function initPhysics() {
  if (_running) return;
  _running = true;
  requestAnimationFrame(_tick);
}

// ─────────────────────────────────────────────────────────────────────────────

function _tick() {
  const W = window.innerWidth;
  const H = window.innerHeight - GROUND_H;

  // Only process entries that have physics state (x,y,vx,vy) and are active
  const alive = state.targets.filter(
    (t) => t.active !== false && t.x !== undefined,
  );

  // ── 1. Integrate & wall-bounce ──────────────────────────────────────────
  for (const t of alive) {
    t.x += t.vx;
    t.y += t.vy;

    const r = TARGET_RADIUS[t.type] ?? 30;

    if (t.x - r < 0) {
      t.x = r;
      t.vx = Math.abs(t.vx);
    }
    if (t.x + r > W) {
      t.x = W - r;
      t.vx = -Math.abs(t.vx);
    }
    if (t.y - r < HUD_H) {
      t.y = HUD_H + r;
      t.vy = Math.abs(t.vy);
    }
    if (t.y + r > H) {
      t.y = H - r;
      t.vy = -Math.abs(t.vy);
    }

    // Position element — left/top are the top-left corner of the element
    t.el.style.left = `${t.x - r}px`;
    t.el.style.top = `${t.y - r}px`;
  }

  // ── 2. Pairwise collision detection & resolution ─────────────────────────
  for (let i = 0; i < alive.length - 1; i++) {
    const a = alive[i];
    const ra = TARGET_RADIUS[a.type] ?? 30;

    for (let j = i + 1; j < alive.length; j++) {
      const b = alive[j];
      const rb = TARGET_RADIUS[b.type] ?? 30;

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy);
      const minD = ra + rb;

      if (dist >= minD || dist < 0.001) continue; // no overlap

      // Push both apart by half the overlap distance
      const overlap = (minD - dist) * 0.5;
      const nx = dx / dist;
      const ny = dy / dist;

      a.x -= nx * overlap;
      a.y -= ny * overlap;
      b.x += nx * overlap;
      b.y += ny * overlap;

      // Elastic velocity exchange along the collision normal
      const relVx = a.vx - b.vx;
      const relVy = a.vy - b.vy;
      const dot = relVx * nx + relVy * ny;

      if (dot <= 0) continue; // already separating

      a.vx -= dot * nx;
      a.vy -= dot * ny;
      b.vx += dot * nx;
      b.vy += dot * ny;

      // ── Bump FX (debounced per pair) ───────────────────────────────────
      const key = `${Math.min(i, j)}_${Math.max(i, j)}`;
      const now = performance.now();
      if (!bumpTimers.has(key) || now - bumpTimers.get(key) > 500) {
        bumpTimers.set(key, now);
        spawnBumpParticles((a.x + b.x) / 2, (a.y + b.y) / 2);
        shakeTarget(a.el);
        shakeTarget(b.el);
        // Randomise the about-me photo whenever the head target collides
        if (a.type === "head") randomizeHeadPhoto(a.el);
        if (b.type === "head") randomizeHeadPhoto(b.el);
      }
    }
  }

  requestAnimationFrame(_tick);
}
