// ─── i18n — LANGUAGE MANAGER ──────────────────────────────────────────────────
// Usage:
//   import { t, setLang, getLang } from './i18n.js';
//   t('start_btn')        → translated string for current lang
//   setLang('fr')         → switch to French and refresh all DOM text
// ─────────────────────────────────────────────────────────────────────────────

import { TRANSLATIONS } from "../data/translations.js";

let currentLang = "en";

/** Return translated string for the current language. Falls back to 'en'. */
export function t(key) {
  return TRANSLATIONS[currentLang]?.[key] ?? TRANSLATIONS["en"][key] ?? key;
}

/** Return current language code ('en' | 'fr'). */
export function getLang() {
  return currentLang;
}

/** Switch language and re-render all [data-i18n] elements in the DOM. */
export function setLang(lang) {
  if (!TRANSLATIONS[lang]) {
    console.warn(`[i18n] Unknown language: "${lang}"`);
    return;
  }
  currentLang = lang;
  document.documentElement.lang = lang;
  applyTranslations();
}

/**
 * Walk every [data-i18n] element and set its textContent.
 * Walk every [data-i18n-html] element and set its innerHTML.
 * Called automatically by setLang(); can also be called manually on init.
 */
export function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  // Update the floating lang-toggle target label (shows the OTHER language)
  const langLabel = document.getElementById("lang-target-label");
  if (langLabel) langLabel.textContent = t("lang_target_label");
}
