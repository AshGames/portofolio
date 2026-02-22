// ─── GAME STATE ───────────────────────────────────────────────────────────────
// Single shared mutable state object imported by all modules.
// ─────────────────────────────────────────────────────────────────────────────

/** True when the device is a touch-screen with a narrow viewport. */
export const isMobile = "ontouchstart" in window && window.innerWidth <= 900;

/** Scale factor applied to target sizes and collision radii on mobile. */
export const MOB_SCALE = isMobile ? 0.52 : 1;

export const state = {
  score: 0,
  ammo: 10,
  gameStarted: false,
  exploding: false, // true while a target explosion animation is playing
  soundOn: true, // SFX on by default
  musicOn: false, // BGM off by default — player must shoot the music target to enable
  targets: [], // [{ el, type, data?, x, y, vx, vy, active }]
  /** Current crosshair position (set by joystick on mobile) */
  aimX: window.innerWidth / 2,
  aimY: window.innerHeight / 2,
};
