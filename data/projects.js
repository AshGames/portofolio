// PROJECTS DATA
// img   -> screenshot shown in hover tooltip and modal thumbnail.
// video -> YouTube video ID embedded in the modal player.
// desc  -> object { en: "...", fr: "..." }  HTML description rendered via innerHTML.

export const PROJECTS = [
  {
    id: 1,
    title: "Reconstitution 3D – Théâtre Molière",
    video: "cBkQOML-TDU",
    img: "img/Projects/P13_TheatreMoliere.png",
    desc: {
      fr: `<p><strong>Reconstitution 3D du Théâtre du Palais-Royal</strong></p><br><p>Ce projet de 6 mois consistait à créer une application immersive permettant de visiter une reconstitution en 3D. Développée sous <strong>Unreal Engine 4</strong>, j'ai géré l'<strong>intégration 3D</strong>, l'<strong>UI</strong>, les <strong>animations</strong> et les <strong>interactions</strong>.</p><br><p><a href='https://moliere.hypotheses.org/910' target='_blank' style='color:#00f5ff'>▶ Lire l'article</a></p>`,
      en: `<p><strong>3D Reconstruction of the Palais-Royal Theatre</strong></p><br><p>A 6-month project to create an immersive application for visiting a 3D reconstruction. Built in <strong>Unreal Engine 4</strong>, I handled <strong>3D integration</strong>, <strong>UI</strong>, <strong>animations</strong>, and <strong>interactions</strong>.</p><br><p><a href='https://moliere.hypotheses.org/910' target='_blank' style='color:#00f5ff'>▶ Read the article</a></p>`,
    },
    tags: ["Unreal Engine 4", "3D", "UI", "Animation"],
  },
  {
    id: 2,
    title: "Sikaria : A Silent Hunt",
    video: "41HT3vvUQDY",
    img: "img/Projects/P16_Sikaria.png",
    desc: {
      fr: `<p><strong>Sikaria : A silent hunt</strong></p><br><p>Projet de fin d'études sous <strong>Unreal Engine 4</strong> avec ~20 personnes. Rôle : intégration <strong>UI</strong>, correction de bugs, réglages, gamefeel et big picture.</p><br><p>Récompensé par le <strong>Pégase du Meilleur Jeu Étudiant</strong>.</p><br><p><a href='https://isart-digital.itch.io/sikaria' target='_blank' style='color:#00f5ff'>▶ Jouer sur Itch.io</a></p>`,
      en: `<p><strong>Sikaria : A Silent Hunt</strong></p><br><p>Graduation project in <strong>Unreal Engine 4</strong> with ~20 people. Role: <strong>UI</strong> integration, bug fixing, tuning, game feel, and big picture.</p><br><p>Awarded the <strong>Pégase for Best Student Game</strong>.</p><br><p><a href='https://isart-digital.itch.io/sikaria' target='_blank' style='color:#00f5ff'>▶ Play on Itch.io</a></p>`,
    },
    tags: ["Unreal Engine 4", "Team Project", "UI", "Game Design", "Pégase"],
  },
  {
    id: 3,
    title: "Fruit Merge 3D",
    video: "rceFqPD_pUY",
    img: "img/Projects/P15_MergeFruit3D.png",
    desc: {
      fr: `<p><strong>Fruit Merge 3D</strong></p><br><p>Version 3D mobile du Suika Game, développée de A à Z sur <strong>Unity</strong>. Modèles 3D créés sur <strong>Blender</strong>. Version <strong>WebGL</strong> disponible en ligne.</p>`,
      en: `<p><strong>Fruit Merge 3D</strong></p><br><p>A full 3D mobile take on the Suika Game, built from scratch in <strong>Unity</strong>. 3D models created in <strong>Blender</strong>. <strong>WebGL</strong> version available online.</p>`,
    },
    tags: ["Unity", "Blender", "3D", "Mobile", "WebGL"],
  },
  {
    id: 4,
    title: "Valpalio",
    video: "pppcgXd7by0",
    img: "img/Projects/P14_Valpalio.png",
    desc: {
      fr: `<p><strong>Valpalio</strong></p><br><p>RPG développé en équipe inspiré de Valparaiso. Exploration urbaine et combats au <strong>tour par tour</strong> sur <strong>Unity</strong>. Shaders avec <strong>Shader Graph</strong>, <strong>UI</strong> et <strong>gameplay</strong>.</p>`,
      en: `<p><strong>Valpalio</strong></p><br><p>Team RPG inspired by Valparaiso. Urban exploration and <strong>turn-based</strong> combat in <strong>Unity</strong>. Shaders with <strong>Shader Graph</strong>, <strong>UI</strong>, and <strong>gameplay</strong>.</p>`,
    },
    tags: ["Unity", "Shader Graph", "UI", "RPG", "Turn-Based"],
  },
  {
    id: 5,
    title: "Under Pressure",
    video: "SxQsGRMa8lo",
    img: "img/Projects/P12_Underpressure.png",
    desc: {
      fr: `<p><strong>Under Pressure</strong></p><br><p>Jeu de plateforme <strong>2D</strong> réalisé en 3 mois sur <strong>Unity</strong> avec 15 personnes. J'ai géré le <strong>level design</strong>, <strong>game design</strong>, <strong>gameplay</strong> et la caméra <strong>Cinemachine</strong>.</p>`,
      en: `<p><strong>Under Pressure</strong></p><br><p><strong>2D</strong> platformer made in 3 months with 15 people in <strong>Unity</strong>. I handled <strong>level design</strong>, <strong>game design</strong>, <strong>gameplay</strong>, and the <strong>Cinemachine</strong> camera.</p>`,
    },
    tags: ["Unity", "2D Platformer", "Level Design", "Cinemachine"],
  },
  {
    id: 6,
    title: "Rush",
    video: "87CDLv69p48",
    img: "img/Projects/P8_RushPaper.png",
    desc: {
      fr: `<p><strong>Rush</strong></p><br><p>Recréation du jeu RUSH avec nouveau design sur <strong>Unity + Probuilder</strong>. Deux niveaux originaux : <em>Floating Islands</em> &amp; <em>Paper Crane</em>. Éléments 3D, programmation et <strong>SFX</strong>.</p>`,
      en: `<p><strong>Rush</strong></p><br><p>Recreation of the RUSH game with a fresh design in <strong>Unity + Probuilder</strong>. Two original levels: <em>Floating Islands</em> &amp; <em>Paper Crane</em>. 3D elements, programming, and <strong>SFX</strong>.</p>`,
    },
    tags: ["Unity", "Probuilder", "3D", "Level Design", "SFX"],
  },
  {
    id: 7,
    title: "Shmup",
    video: "9rZrHvGZjaI",
    img: "img/Projects/P5_Shmup.png",
    desc: {
      fr: `<p><strong>Shmup</strong></p><br><p>Niveau complet de <strong>Shoot'em up</strong> en <strong>ActionScript 3</strong> avec <strong>Animate</strong> et <strong>FlashDevelop</strong>. Level design, conception des boss et développement du niveau.</p>`,
      en: `<p><strong>Shmup</strong></p><br><p>A complete <strong>Shoot'em Up</strong> level in <strong>ActionScript 3</strong> with <strong>Animate</strong> and <strong>FlashDevelop</strong>. Level design, boss design, and full level development.</p>`,
    },
    tags: ["ActionScript 3", "Animate", "Shoot'em Up", "Level Design"],
  },
  {
    id: 8,
    title: "Hero Dash",
    video: "WiKsGlsLfZE",
    img: "img/Projects/P4_HeroDash.png",
    desc: {
      fr: `<p><strong>Hero Dash</strong></p><br><p><strong>One Button Game</strong> développé en <strong>Haxe / OpenFl</strong>. Développement intégral : game design, mécaniques de jeu et effets visuels (FX).</p>`,
      en: `<p><strong>Hero Dash</strong></p><br><p><strong>One Button Game</strong> developed in <strong>Haxe / OpenFl</strong>. Full development: game design, game mechanics, and visual effects (FX).</p>`,
    },
    tags: ["Haxe", "OpenFl", "One Button Game", "Game Design"],
  },
  {
    id: 9,
    title: "Sokoban",
    video: "K0cAXqhaCZA",
    img: "img/Projects/P11_Sokoban.PNG",
    desc: {
      fr: `<p><strong>Sokoban</strong></p><br><p>Sokoban avec mécanique de <strong>caisses jumelles</strong> développé en équipe de 3 sur <strong>Haxe / OpenFl</strong>. Pris en charge : <strong>UI</strong> et <strong>mécaniques de gameplay</strong>.</p>`,
      en: `<p><strong>Sokoban</strong></p><br><p>Sokoban featuring a <strong>twin-box</strong> mechanic, built in a team of 3 with <strong>Haxe / OpenFl</strong>. I handled <strong>UI</strong> and <strong>gameplay mechanics</strong>.</p>`,
    },
    tags: ["Haxe", "OpenFl", "Puzzle", "Teamwork"],
  },
  {
    id: 10,
    title: "Nice Cube",
    video: "aXbGtn89mfg",
    img: "img/Projects/P7_NiceCube.png",
    desc: {
      fr: `<p><strong>Nice Cube</strong></p><br><p>Projet <strong>Unity 3D</strong> Android développé en 2 mois. Base de données en <strong>PHP / SQL</strong>, boutique avec diamants, personnalisation et <strong>roue de la fortune</strong>.</p>`,
      en: `<p><strong>Nice Cube</strong></p><br><p><strong>Unity 3D</strong> Android project built over 2 months. Backend with <strong>PHP / SQL</strong>, diamond shop, customization, and a <strong>fortune wheel</strong>.</p>`,
    },
    tags: ["Unity", "Android", "PHP", "SQL", "Shop System"],
  },
  {
    id: 11,
    title: "Tiny Animal Town",
    video: "75XekJfMeiA",
    img: "img/Projects/P10_TinyAnimalTown.png",
    desc: {
      fr: `<p><strong>Tiny Animal Town</strong></p><br><p>Projet <strong>Unity</strong> de la Game Week Isart Digital. Concept pitché et retenu par vote, équipe de 6 personnes. Jeu de réflexion sur grille de cubes.</p>`,
      en: `<p><strong>Tiny Animal Town</strong></p><br><p><strong>Unity</strong> project for the Isart Digital Game Week. Concept pitched and selected by vote, team of 6 people. Grid-based cube puzzle game.</p>`,
    },
    tags: ["Unity", "Mobile", "Puzzle", "Game Week", "Game Design"],
  },
  {
    id: 12,
    title: "The Report",
    video: "vBGanXJ8rR4",
    img: "img/Projects/P9_TheReport.png",
    desc: {
      fr: `<p><strong>The Report</strong></p><br><p>Introduction narrative de 10 minutes développée en équipe de 5 sur <strong>Unreal Engine / Blueprints</strong>. Scénario, gameplay, level design, UI design et programmation Blueprint.</p>`,
      en: `<p><strong>The Report</strong></p><br><p>A 10-minute narrative intro developed by a team of 5 in <strong>Unreal Engine / Blueprints</strong>. Scenario, gameplay, level design, UI design, and Blueprint programming.</p>`,
    },
    tags: ["Unreal Engine", "Blueprints", "Narrative", "Level Design"],
  },
  {
    id: 13,
    title: "Carre Jumper",
    video: "4Vr3cbKROxc",
    img: "img/Projects/P1_CarreJumper.png",
    desc: {
      fr: `<p><strong>Carre Jumper</strong></p><br><p>Premier jeu mobile hyper casual sur <strong>Unity 3D</strong>. Mécaniques de jeu, UI, <strong>classement Google</strong>, système de <strong>missions</strong>, personnalisation et boutique virtuelle.</p>`,
      en: `<p><strong>Carre Jumper</strong></p><br><p>First hyper casual mobile game in <strong>Unity 3D</strong>. Game mechanics, UI, <strong>Google leaderboard</strong>, <strong>mission</strong> system, customization, and virtual shop.</p>`,
    },
    tags: ["Unity", "Mobile", "Hyper Casual", "Leaderboard"],
  },
  {
    id: 14,
    title: "Chilly Space",
    video: "ArPxwL1Jhbs",
    img: "img/Projects/P3_ChillySpace.png",
    desc: {
      fr: `<p><strong>Chilly Space</strong></p><br><p>Jeu mobile <strong>One Button</strong> sur <strong>Unity</strong> : vaisseau spatial dans un univers infini généré de façon <strong>procédurale</strong>. Développement complet avec personnalisation et niveaux infinis.</p>`,
      en: `<p><strong>Chilly Space</strong></p><br><p><strong>One Button</strong> mobile game in <strong>Unity</strong>: a spaceship navigating an infinite <strong>procedurally generated</strong> universe. Complete development with customization and endless levels.</p>`,
    },
    tags: ["Unity", "Mobile", "One Button", "Procedural"],
  },
  {
    id: 15,
    title: "Linear Escape",
    video: "BHbv6BlrkbI",
    img: "img/Projects/P2_LinearEscape.png",
    desc: {
      fr: `<p><strong>Linear Escape</strong></p><br><p>Prototype de <strong>puzzle 3D</strong> sur <strong>Unity3D</strong>. Le personnage se déplace sur une grille de cubes et interagit avec des plaques.</p>`,
      en: `<p><strong>Linear Escape</strong></p><br><p>A <strong>3D puzzle</strong> prototype in <strong>Unity3D</strong>. The character moves across a grid of cubes and interacts with pressure plates.</p>`,
    },
    tags: ["Unity3D", "Mobile", "3D Puzzle", "Grid System"],
  },
  {
    id: 16,
    title: "Memory Match",
    video: "w5fWTvMUpAw",
    img: "img/Projects/P0_MemoryMatch.png",
    desc: {
      fr: `<p><strong>Memory Match</strong></p><br><p>Mon tout premier jeu mobile développé sur <strong>Android Studio</strong>. Memory Match classique avec gestion complète du score, des niveaux et de l'interface utilisateur.</p>`,
      en: `<p><strong>Memory Match</strong></p><br><p>My very first mobile game, developed in <strong>Android Studio</strong>. Classic Memory Match with full score management, levels, and user interface.</p>`,
    },
    tags: ["Android Studio", "Java", "Mobile", "Memory Game"],
  },
  {
    id: 17,
    title: "Space Walk",
    video: "CpHPxHHjL8I",
    img: "img/Projects/P6_SpaceWalk.png",
    desc: {
      fr: `<p><strong>Space Walk</strong></p><br><p>Mon premier projet sur <strong>Unreal Engine 4.27</strong>, thème <em>Floor is Lava</em>. <strong>First-person platformer</strong> avec <strong>intelligence artificielle</strong>. Mécaniques, level design et IA.</p>`,
      en: `<p><strong>Space Walk</strong></p><br><p>My first project in <strong>Unreal Engine 4.27</strong>, themed <em>Floor is Lava</em>. A <strong>first-person platformer</strong> featuring <strong>artificial intelligence</strong>. Mechanics, level design, and AI.</p>`,
    },
    tags: ["Unreal Engine 4", "FPS", "AI", "Platformer"],
  },
];
