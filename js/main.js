// ─── MAIN — ENTRY POINT ───────────────────────────────────────────────────────
// Boots the portfolio. Import order matters for DOM readiness.
// ─────────────────────────────────────────────────────────────────────────────

import { applyTranslations } from "./i18n.js";
import { updateHUD } from "./hud.js";
import { createStars, makeTrees } from "./effects.js";
import { initStartButton } from "./game.js";
import { initMobileControls } from "./mobile.js";
import { isMobile } from "./state.js";

// ── Cursor tracking ────────────────────────────────────────────────────────
const cursor = document.getElementById("cursor");
if (!isMobile) {
  // Desktop: follow the real mouse
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}

// ── Environment ────────────────────────────────────────────────────────────
const sky = document.getElementById("sky");
createStars(sky);
makeTrees();

// ── Initial render ─────────────────────────────────────────────────────────
applyTranslations(); // render intro text in default language (en)
updateHUD(); // render score / ammo bar

// ── Wireup buttons ─────────────────────────────────────────────────────────
initStartButton();

// ── Mobile controls ────────────────────────────────────────────────────────
initMobileControls();
