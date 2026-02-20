// ─── GAME STATE ───────────────────────────────────────────────────────────────
// Single shared mutable state object imported by all modules.
// ─────────────────────────────────────────────────────────────────────────────

export const state = {
  score: 0,
  ammo: 10,
  gameStarted: false,
  exploding: false, // true while a target explosion animation is playing
  soundOn: true, // SFX on by default
  musicOn: false, // BGM off by default — player must shoot the music target to enable
  targets: [], // [{ el, type, data?, x, y, vx, vy, active }]
};
