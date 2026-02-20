// ─── MODAL ────────────────────────────────────────────────────────────────────
// Controls the info modal overlay.
// ─────────────────────────────────────────────────────────────────────────────

import { t } from "./i18n.js";

const overlay = document.getElementById("modal-overlay");
const titleEl = document.getElementById("modal-title");
const bodyEl = document.getElementById("modal-body");
const closeBtn = document.getElementById("modal-close");

// ── Public API ─────────────────────────────────────────────────────────────
/** Open the modal with a title string and raw HTML body. */
export function showModal(title, bodyHTML) {
  titleEl.textContent = title;
  bodyEl.innerHTML = bodyHTML;
  overlay.classList.add("open");
}

export function closeModal() {
  overlay.classList.remove("open");
}

// ── Event listeners ────────────────────────────────────────────────────────
closeBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

/** Update the close button label when language changes (called from i18n). */
export function refreshModalClose() {
  closeBtn.textContent = t("modal_close");
}
