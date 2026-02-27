// ─── ACHIEVEMENTS DATA ─────────────────────────────────────────────────────────
// Each achievement has an id, icon, bilingual title/desc, and rarity tier.
// Rarity: "common" | "uncommon" | "rare" | "legendary"
// ─────────────────────────────────────────────────────────────────────────────

export const ACHIEVEMENTS = [
  {
    id: "FIRST_BLOOD",
    icon: "🔫",
    title: { en: "FIRST BLOOD", fr: "PREMIER SANG" },
    desc: {
      en: "Fire your first shot.",
      fr: "Tirez votre premier coup de feu.",
    },
    rarity: "common",
  },
  {
    id: "HEADHUNTER",
    icon: "🎯",
    title: { en: "HEADHUNTER", fr: "CHASSEUR DE TÊTES" },
    desc: { en: "Hit the bio target.", fr: "Touchez la cible bio." },
    rarity: "uncommon",
  },
  {
    id: "UFO_DOWN",
    icon: "🛸",
    title: { en: "UFO DOWN", fr: "UFO ABATTU" },
    desc: {
      en: "Destroy your first project UFO.",
      fr: "Détruisez votre premier UFO projet.",
    },
    rarity: "common",
  },
  {
    id: "SOCIAL_BUTTERFLY",
    icon: "🦋",
    title: { en: "SOCIAL BUTTERFLY", fr: "PAPILLON SOCIAL" },
    desc: { en: "Hit a social target.", fr: "Touchez une cible sociale." },
    rarity: "common",
  },
  {
    id: "LINGUIST",
    icon: "🌐",
    title: { en: "POLYGLOT", fr: "POLYGLOTTE" },
    desc: { en: "Switch the language.", fr: "Changez de langue." },
    rarity: "uncommon",
  },
  {
    id: "MAESTRO",
    icon: "🎵",
    title: { en: "MAESTRO", fr: "MAESTRO" },
    desc: {
      en: "Enable the background music.",
      fr: "Activez la musique de fond.",
    },
    rarity: "uncommon",
  },
  {
    id: "COMBO_3",
    icon: "⚡",
    title: { en: "COMBO HIT", fr: "COMBO !" },
    desc: {
      en: "3 consecutive hits without missing.",
      fr: "3 touches d'affilée sans rater.",
    },
    rarity: "uncommon",
  },
  {
    id: "SHARPSHOOTER",
    icon: "💥",
    title: { en: "SHARPSHOOTER", fr: "TIREUR D'ÉLITE" },
    desc: {
      en: "5 consecutive hits without missing.",
      fr: "5 touches d'affilée sans rater.",
    },
    rarity: "rare",
  },
  {
    id: "HIGH_SCORE",
    icon: "⭐",
    title: { en: "HIGH SCORE", fr: "HIGH SCORE" },
    desc: { en: "Reach 1 000 points.", fr: "Atteignez 1 000 points." },
    rarity: "uncommon",
  },
  {
    id: "ELITE",
    icon: "👑",
    title: { en: "ELITE SCORER", fr: "SCORE ÉLITE" },
    desc: { en: "Reach 2 500 points.", fr: "Atteignez 2 500 points." },
    rarity: "rare",
  },
  {
    id: "OUT_OF_AMMO",
    icon: "💀",
    title: { en: "EMPTY CLIP", fr: "CHARGEUR VIDE" },
    desc: { en: "Run out of ammo.", fr: "Tombez à court de munitions." },
    rarity: "common",
  },
  {
    id: "SUN_HUNTER",
    icon: "☀️",
    title: { en: "SUN HUNTER", fr: "CHASSEUR DE SOLEIL" },
    desc: {
      en: "Shoot the sun. Is it really a moon?",
      fr: "Tirez sur le soleil. Est-ce vraiment une lune ?",
    },
    rarity: "rare",
  },
  {
    id: "IDLE_5",
    icon: "💤",
    title: { en: "ARE YOU HERE?", fr: "T'ES LÀ ?" },
    desc: {
      en: "Stay idle for 5 minutes.",
      fr: "Restez inactif pendant 5 minutes.",
    },
    rarity: "rare",
  },
  {
    id: "COMPLETIONIST",
    icon: "🏆",
    title: { en: "COMPLETIONIST", fr: "COMPLÉTIONNISTE" },
    desc: {
      en: "Blast every project UFO.",
      fr: "Détruisez tous les UFOs projet.",
    },
    rarity: "legendary",
  },
];
