// ─── HUD ──────────────────────────────────────────────────────────────────────
// Reads from state + i18n, writes to the HUD DOM elements.
// ─────────────────────────────────────────────────────────────────────────────

import { state } from "./state.js";
import { t } from "./i18n.js";

const scoreEl = document.getElementById("score-display");
const ammoEl = document.getElementById("ammo-display");

/** Re-render score and ammo bar using the current language labels. */
export function updateHUD() {
  scoreEl.textContent = `${t("score_label")}: ${String(state.score).padStart(6, "0")}`;

  const filled = state.ammo;
  ammoEl.textContent = `${t("ammo_label")}: ${"◉".repeat(filled)}${"○".repeat(10 - filled)}`;
}
