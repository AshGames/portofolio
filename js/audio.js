// ─── AUDIO MANAGER ────────────────────────────────────────────────────────────
// BGM: randomly cycles through all tracks in BGM_TRACKS.
// SFX: clones a fresh Audio node each call so rapid shots never cut off.
// Both channels respect state.soundOn / state.musicOn.
// ─────────────────────────────────────────────────────────────────────────────

import { state } from "./state.js";

// ── Track lists ────────────────────────────────────────────────────────────

/** Add / remove entries here as you drop new files into audio/. */
const BGM_TRACKS = ["audio/bgm0.mp3", "audio/bgm1.mp3"];

const SFX_FILES = {
  shoot: "audio/sfx_shoot.mp3",
  // hit uses the same file but at a higher pitch for a distinct "ping"
  hit: "audio/sfx_hit.mp3",
};

// ── BGM ────────────────────────────────────────────────────────────────────

let _bgm = null; // current HTMLAudioElement
let _bgmIdx = -1; // index of currently loaded track

function _randomIdx() {
  if (BGM_TRACKS.length === 1) return 0;
  let n;
  do {
    n = Math.floor(Math.random() * BGM_TRACKS.length);
  } while (n === _bgmIdx);
  return n;
}

function _playTrack(idx) {
  if (_bgm) {
    _bgm.pause();
    _bgm.src = "";
  }
  _bgmIdx = idx;
  _bgm = new Audio(BGM_TRACKS[idx]);
  _bgm.volume = 0.35;
  // When a track ends, automatically pick and play a different random one
  _bgm.addEventListener("ended", () => {
    if (state.musicOn) _playTrack(_randomIdx());
  });
  _bgm.play().catch(() => {});
}

/** Start playing a random BGM track (only if musicOn is true). */
export function startBGM() {
  if (!state.musicOn) return;
  _playTrack(_randomIdx());
}

/** Pause the current BGM track. */
export function stopBGM() {
  if (_bgm) _bgm.pause();
}

// ── SFX ────────────────────────────────────────────────────────────────────

/**
 * Play a sound effect. A fresh Audio node is created each call so rapid
 * successive shots never get cut off by each other.
 *
 * @param {'shoot' | 'hit'} name
 */
export function playSFX(name) {
  if (!state.soundOn) return;
  const src = SFX_FILES[name];
  if (!src) return;
  const a = new Audio(src);
  a.volume = name === "hit" ? 0.65 : 0.45;
  if (name === "hit") a.playbackRate = 1.7; // higher pitch = satisfying "ping"
  a.play().catch(() => {});
}
