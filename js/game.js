// ─── GAME ─────────────────────────────────────────────────────────────────────
// Hit handlers, miss handler, start-game sequence.
// This is the central coordinator — it imports all other modules.
// ─────────────────────────────────────────────────────────────────────────────

import { PROJECTS } from "../data/projects.js";
import { SOCIALS } from "../data/socials.js";
import { t, getLang, setLang, applyTranslations } from "./i18n.js";
import { state } from "./state.js";
import { updateHUD } from "./hud.js";
import { shoot, showScorePopup, spawnExplosionParticles } from "./effects.js";
import { playSFX, startBGM, stopBGM } from "./audio.js";
import { showModal, refreshModalClose } from "./modal.js";
import {
  createHeadTarget,
  createProjectTarget,
  createSocialTarget,
  createLangTarget,
  createSoundTarget,
  createMusicTarget,
} from "./targets.js";
import { initPhysics } from "./physics.js";
import {
  onHit,
  onMiss,
  onScore,
  initAchievementsHUD,
  openAchievementsViewer,
} from "./achievements.js";

// ── Explosion helper ────────────────────────────────────────────────────────
const EXPLODE_MS = 650;

/**
 * Play the explosion animation on a target, lock input, then call callback.
 * @param {HTMLElement} el
 * @param {number}      cx  - explosion centre X (client coords)
 * @param {number}      cy  - explosion centre Y (client coords)
 * @param {string}      color
 * @param {Function}    [cb]
 */
function _explodeTarget(el, cx, cy, color, cb) {
  state.exploding = true;
  el.classList.add("target-exploding");
  spawnExplosionParticles(cx, cy, color);
  setTimeout(() => {
    el.classList.remove("target-exploding");
    state.exploding = false;
    if (cb) cb();
  }, EXPLODE_MS);
}

// ── Hit: Head / Bio ────────────────────────────────────────────────────────
function hitHead(el, e) {
  if (!state.gameStarted || state.exploding) return;
  shoot(e.clientX, e.clientY);
  playSFX("hit");
  state.score += 500;
  showScorePopup(e.clientX, e.clientY, "+500");
  updateHUD();
  onHit("head");
  onScore(state.score);
  const r = el.getBoundingClientRect();
  _explodeTarget(
    el,
    r.left + r.width / 2,
    r.top + r.height / 2,
    "#ff2d78",
    () => {
      showModal(
        t("bio_modal_title"),
        `<div style="text-align:center;margin-bottom:20px">
         <div style="font-family:'Press Start 2P',monospace;font-size:8px;color:var(--neon-pink);margin-bottom:12px;text-shadow:0 0 8px var(--neon-pink)">
           ${t("bio_role")}
         </div>
         <img src="img/about/Me_Nice.png" alt="me"
              style="width:110px;height:110px;border-radius:50%;object-fit:cover;object-position:top;
                     border:2px solid var(--neon-pink);box-shadow:0 0 20px var(--neon-pink);
                     display:block;margin:0 auto 16px;">
       </div>
       <p>${t("bio_p1")}</p><br>
       <p>${t("bio_p2")}</p><br>
       <p>${t("bio_p3")}</p><br>
       <p>${t("bio_p4")}</p><br>
       <div style="font-family:'Press Start 2P',monospace;font-size:7px;color:var(--neon-yellow);border:1px solid var(--neon-yellow);padding:10px;text-shadow:0 0 6px var(--neon-yellow)">
         ${t("bio_stat1")}<br><br>
         ${t("bio_stat2")}<br><br>
         ${t("bio_stat3")}
       </div>`,
      );
    },
  );
}

// ── Hit: Project UFO ───────────────────────────────────────────────────────
function hitProject(el, proj, e) {
  if (!state.gameStarted || state.exploding) return;
  shoot(e.clientX, e.clientY);
  playSFX("hit");
  state.score += 100;
  showScorePopup(e.clientX, e.clientY, "+100");
  updateHUD();
  onHit("project", proj);
  onScore(state.score);
  const color = el.style.getPropertyValue("--glow").trim() || "#00f5ff";
  const r = el.getBoundingClientRect();
  _explodeTarget(el, r.left + r.width / 2, r.top + r.height / 2, color, () => {
    const lang = getLang();
    const desc =
      typeof proj.desc === "object"
        ? (proj.desc[lang] ?? proj.desc.en)
        : proj.desc;

    const ytEmbed = proj.video
      ? `<div class="yt-embed-wrap">
           <iframe
             src="https://www.youtube-nocookie.com/embed/${proj.video}?rel=0"
             title="${proj.title} – video"
             frameborder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowfullscreen
           ></iframe>
         </div>`
      : "";

    const thumbImg = proj.img
      ? `<img class="proj-thumb-img" src="${proj.img}" alt="${proj.title}">`
      : `<div class="thumb">${t("proj_screenshot")}</div>`;

    showModal(
      `PROJECT #${String(proj.id).padStart(2, "0")} — ${proj.title}`,
      `<div class="proj-card">
         ${thumbImg}
         <div class="proj-desc">${desc}</div>
         <div class="tags">${proj.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
       </div>
       ${ytEmbed}`,
    );
    el.classList.add("project-visited");
  });
}

// ── Hit: Social icon ───────────────────────────────────────────────────────
function hitSocial(el, social, e) {
  if (!state.gameStarted || state.exploding) return;
  shoot(e.clientX, e.clientY);
  playSFX("hit");
  state.score += 250;
  showScorePopup(e.clientX, e.clientY, "+250");
  updateHUD();
  onHit("social");
  onScore(state.score);
  const r = el.getBoundingClientRect();
  _explodeTarget(
    el,
    r.left + r.width / 2,
    r.top + r.height / 2,
    social.color,
    () => {
      window.open(social.url, "_blank");
    },
  );
}

// ── Hit: Language toggle ───────────────────────────────────────────────────
function hitLang(el, e) {
  if (!state.gameStarted || state.exploding) return;
  shoot(e.clientX, e.clientY);
  playSFX("hit");
  showScorePopup(e.clientX, e.clientY, "🌐");
  onHit("lang");
  const r = el.getBoundingClientRect();
  _explodeTarget(
    el,
    r.left + r.width / 2,
    r.top + r.height / 2,
    "#ffe600",
    () => {
      const next = getLang() === "en" ? "fr" : "en";
      // Remove the old lang target from state and DOM
      const idx = state.targets.findIndex((t) => t.el === el);
      if (idx !== -1) state.targets.splice(idx, 1);
      el.remove();
      // Spawn a new lang target first so applyTranslations() can update its label
      createLangTarget(hitLang);
      // Switch language — calls applyTranslations() which updates #lang-target-label
      setLang(next);
      refreshModalClose();
      updateHUD();
    },
  );
}

// ── Hit: Sound FX toggle ───────────────────────────────────────────────────
function hitSound(el, e) {
  if (!state.gameStarted || state.exploding) return;
  shoot(e.clientX, e.clientY);
  const r = el.getBoundingClientRect();
  _explodeTarget(
    el,
    r.left + r.width / 2,
    r.top + r.height / 2,
    "#00f5ff",
    () => {
      state.soundOn = !state.soundOn;
      showScorePopup(
        e.clientX,
        e.clientY,
        state.soundOn ? "SFX ON" : "SFX OFF",
      );
      // Update label inside the SVG
      const lbl = el.querySelector(".sfx-state-label");
      if (lbl) lbl.textContent = state.soundOn ? "SFX:ON" : "SFX:OFF";
      // Toggle glow color as visual feedback
      el.style.filter = state.soundOn
        ? "drop-shadow(0 0 10px #00f5ff)"
        : "drop-shadow(0 0 4px #333) brightness(0.4) grayscale(1)";
      updateHUD();
    },
  );
}

// ── Hit: Music toggle ──────────────────────────────────────────────────────
function hitMusic(el, e) {
  if (!state.gameStarted || state.exploding) return;
  shoot(e.clientX, e.clientY);
  const r = el.getBoundingClientRect();
  _explodeTarget(
    el,
    r.left + r.width / 2,
    r.top + r.height / 2,
    "#bf00ff",
    () => {
      state.musicOn = !state.musicOn;
      showScorePopup(
        e.clientX,
        e.clientY,
        state.musicOn ? "BGM ON" : "BGM OFF",
      );
      // Update label inside the SVG
      const lbl = el.querySelector(".bgm-state-label");
      if (lbl) lbl.textContent = state.musicOn ? "BGM:ON" : "BGM:OFF";
      // Toggle glow color as visual feedback
      el.style.filter = state.musicOn
        ? "drop-shadow(0 0 10px #bf00ff)"
        : "drop-shadow(0 0 4px #333) brightness(0.4) grayscale(1)";
      if (state.musicOn) {
        startBGM();
        onHit("music");
      } else {
        stopBGM();
      }
      updateHUD();
    },
  );
}

// ── Miss handler (click on empty sky) ─────────────────────────────────────
document.addEventListener("click", (e) => {
  if (!state.gameStarted || state.exploding) return;
  if (
    e.target.closest(".target") ||
    e.target.closest("#modal-overlay") ||
    e.target.closest("#start-btn") ||
    e.target.closest("#lang-btn")
  )
    return;
  shoot(e.clientX, e.clientY);
  state.score = Math.max(0, state.score - 10);
  updateHUD();
  onMiss();
});

// ── Game boot ──────────────────────────────────────────────────────────────
export function startGame() {
  state.gameStarted = true;
  updateHUD();

  // Spawn all targets (staggered so they don't all start in the same spot)
  createHeadTarget(hitHead);
  createLangTarget(hitLang);
  createSoundTarget(hitSound);
  createMusicTarget(hitMusic);

  PROJECTS.forEach((proj, i) => {
    setTimeout(() => createProjectTarget(proj, i, hitProject), i * 400);
  });

  SOCIALS.forEach((soc, i) => {
    setTimeout(() => createSocialTarget(soc, i, hitSocial), 600 + i * 350);
  });

  // Start the JS physics loop (positions all .target elements)
  initPhysics();

  // Boot achievement HUD counter and viewer button
  initAchievementsHUD();
  const achBtn = document.getElementById("ach-hud-btn");
  if (achBtn) {
    achBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openAchievementsViewer();
    });
  }
}

// ── Intro / Start button ───────────────────────────────────────────────────
export function initStartButton() {
  const intro = document.getElementById("intro");
  const startBtn = document.getElementById("start-btn");
  const langBtn = document.getElementById("lang-btn");

  // Language toggle on intro screen
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const next = getLang() === "en" ? "fr" : "en";
    setLang(next);
  });

  // Start game
  startBtn.addEventListener("click", () => {
    const style = document.createElement("style");
    style.textContent =
      "@keyframes introFade{to{opacity:0;pointer-events:none}}";
    document.head.appendChild(style);
    intro.style.animation = "introFade 0.6s forwards";
    setTimeout(() => {
      intro.remove();
      startGame();
    }, 600);
  });
}
