// ─── MOBILE CONTROLS ──────────────────────────────────────────────────────────
// Virtual joystick (aim) + fire button for touch devices.
// The joystick moves the crosshair continuously; the fire button dispatches
// a synthetic click at the crosshair position.
// ─────────────────────────────────────────────────────────────────────────────

import { state, isMobile } from "./state.js";

const cursor = document.getElementById("cursor");

/** Joystick state */
let _joyActive = false;
let _joyCenterX = 0;
let _joyCenterY = 0;
let _joyDx = 0;
let _joyDy = 0;
const JOY_MAX = 40; // max knob displacement (px)
const AIM_SPEED = 2; // crosshair px per frame per unit deflection

let _rafId = null;

/**
 * Initialise mobile controls (joystick + fire).
 * No-op on desktop.
 */
export function initMobileControls() {
  if (!isMobile) return;

  // Show the mobile controls container
  const controls = document.getElementById("mobile-controls");
  if (controls) controls.classList.add("mobile-visible");

  // Hide native cursor, show our crosshair-cursor
  document.body.classList.add("is-mobile");

  // Position crosshair in centre initially
  state.aimX = window.innerWidth / 2;
  state.aimY = window.innerHeight / 2;
  _syncCursor();

  // ── Joystick ────────────────────────────────────────────────────────────
  const base = document.getElementById("joystick-base");
  const knob = document.getElementById("joystick-knob");

  base.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      _joyActive = true;
      const rect = base.getBoundingClientRect();
      _joyCenterX = rect.left + rect.width / 2;
      _joyCenterY = rect.top + rect.height / 2;
      _onJoyMove(e);
    },
    { passive: false },
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      if (!_joyActive) return;
      _onJoyMove(e);
    },
    { passive: false },
  );

  document.addEventListener("touchend", (e) => {
    // Check if the ended touch was on the joystick
    if (!_joyActive) return;
    // Only reset if NO remaining touches are on the joystick area
    let stillOnJoy = false;
    for (const t of e.touches) {
      if (t.target === base || t.target === knob || base.contains(t.target)) {
        stillOnJoy = true;
        break;
      }
    }
    if (!stillOnJoy) {
      _joyActive = false;
      _joyDx = 0;
      _joyDy = 0;
      knob.style.transform = "translate(-50%,-50%)";
    }
  });

  function _onJoyMove(e) {
    // Find the touch that's on the joystick side (left half)
    let touch = null;
    for (const t of e.touches) {
      if (t.clientX < window.innerWidth / 2) {
        touch = t;
        break;
      }
    }
    if (!touch) return;
    let dx = touch.clientX - _joyCenterX;
    let dy = touch.clientY - _joyCenterY;
    const dist = Math.hypot(dx, dy);
    if (dist > JOY_MAX) {
      dx = (dx / dist) * JOY_MAX;
      dy = (dy / dist) * JOY_MAX;
    }
    _joyDx = dx / JOY_MAX; // normalised  -1 … 1
    _joyDy = dy / JOY_MAX;
    knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  }

  // ── Fire button ─────────────────────────────────────────────────────────
  const fireBtn = document.getElementById("fire-btn");
  fireBtn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      _fireAtAim();
    },
    { passive: false },
  );

  // ── Aim update loop ─────────────────────────────────────────────────────
  function _aimLoop() {
    if (_joyActive && (Math.abs(_joyDx) > 0.05 || Math.abs(_joyDy) > 0.05)) {
      state.aimX += _joyDx * AIM_SPEED;
      state.aimY += _joyDy * AIM_SPEED;
      // Clamp within viewport
      state.aimX = Math.max(0, Math.min(window.innerWidth, state.aimX));
      state.aimY = Math.max(0, Math.min(window.innerHeight, state.aimY));
      _syncCursor();
    }
    _rafId = requestAnimationFrame(_aimLoop);
  }
  _aimLoop();

  // ── Prevent default touch-to-click on the sky (no accidental shots) ──
  document.getElementById("sky")?.addEventListener(
    "touchstart",
    (e) => {
      // Allow default on modals / buttons, but prevent direct-aiming on sky
      if (
        !e.target.closest("#modal-overlay") &&
        !e.target.closest("#mobile-controls") &&
        !e.target.closest("#intro") &&
        !e.target.closest("#ach-hud-btn")
      ) {
        e.preventDefault();
      }
    },
    { passive: false },
  );

  // Also prevent touchstart on body from firing
  document.body.addEventListener(
    "touchstart",
    (e) => {
      if (
        e.target.closest("#mobile-controls") ||
        e.target.closest("#modal-overlay") ||
        e.target.closest("#intro") ||
        e.target.closest("#ach-hud-btn") ||
        e.target.closest("#hud")
      )
        return;
      e.preventDefault();
    },
    { passive: false },
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Position the custom cursor element at the current aim coords. */
function _syncCursor() {
  cursor.style.left = `${state.aimX}px`;
  cursor.style.top = `${state.aimY}px`;
}

/**
 * Dispatch a synthetic click event at the crosshair position.
 * The game's existing click handlers on targets + sky will pick it up.
 */
function _fireAtAim() {
  // Find the topmost element at aim coords (ignoring pointer-events:none layers)
  const el = document.elementFromPoint(state.aimX, state.aimY);
  if (!el) return;
  const evt = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    clientX: state.aimX,
    clientY: state.aimY,
    view: window,
  });
  el.dispatchEvent(evt);
}
