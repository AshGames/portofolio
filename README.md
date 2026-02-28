<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
</p>

<h1 align="center">🎯 Achraf Mezdari — Portfolio</h1>

<p align="center">
  <em>An interactive shooter-game portfolio where you <strong>aim, shoot, and discover</strong> my work.</em>
</p>

<p align="center">
  <a href="https://www.mezdariachraf.fr" target="_blank">
    <img src="https://img.shields.io/badge/🌐-Live_Demo-blue?style=flat-square" />
  </a>
</p>

---

## 🕹️ Concept

This isn't your typical portfolio. It's a **browser-based shooting game** where every target reveals something about me. Projects, social links, bio, and more. Shoot your way through to explore!

| Action                    | What happens                          |
| ------------------------- | ------------------------------------- |
| 🔫 **Shoot targets**      | Discover my work and skills           |
| 🎯 **Aim at the head**    | Opens my presentation / bio           |
| 🛸 **Blast project UFOs** | View project details, videos & links  |
| 🦋 **Hit social targets** | Open GitHub, LinkedIn, Itch.io, Email |

---

## ✨ Features

- **🎮 Shooting-game mechanics** — crosshair cursor, ammo, score, and HUD
- **🛸 Project UFOs** — animated flying targets that showcase portfolio projects
- **🏆 Achievement system** — unlock achievements as you explore (common → legendary)
- **🌐 Bilingual** — full English / French support, toggled in-game
- **🎵 DJ Truck** — ambient audio & vibes
- **📱 Mobile-friendly** — touch controls and responsive layout
- **🌌 Parallax sky** — procedural stars and trees for atmosphere
- **⚡ Zero dependencies** — pure vanilla HTML, CSS & JavaScript

---

## 📁 Project Structure

```
├── index.html              # Entry point
├── css/                    # Modular stylesheets
│   ├── base.css            #   Reset & global styles
│   ├── cursor.css          #   Custom crosshair cursor
│   ├── hud.css             #   Score, ammo, HUD overlay
│   ├── targets.css         #   Shootable target styles
│   ├── modal.css           #   Project detail modals
│   ├── effects.css         #   Particles & animations
│   ├── intro.css           #   Start screen
│   ├── achievements.css    #   Achievement pop-ups
│   ├── dj-truck.css        #   DJ truck element
│   ├── background.css      #   Sky & environment
│   ├── overlays.css        #   Overlay layers
│   └── mobile.css          #   Responsive / touch
├── js/                     # Game logic modules (ES Modules)
│   ├── main.js             #   Entry, boots everything
│   ├── game.js             #   Core game loop & start
│   ├── state.js            #   Shared state & flags
│   ├── targets.js          #   Target spawning & hit detection
│   ├── physics.js          #   Movement & collision
│   ├── hud.js              #   HUD rendering
│   ├── modal.js            #   Project modal logic
│   ├── effects.js          #   Stars, trees, particles
│   ├── audio.js            #   Sound manager
│   ├── achievements.js     #   Achievement tracker
│   ├── i18n.js             #   Internationalization
│   └── mobile.js           #   Touch / mobile controls
├── data/                   # Content data files
│   ├── projects.js         #   Portfolio projects
│   ├── socials.js          #   Social links
│   ├── achievements.js     #   Achievement definitions
│   └── translations.js     #   EN/FR translation strings
├── img/                    # Images & assets
│   ├── Projects/           #   Project screenshots
│   ├── Socials/            #   Social platform logos
│   ├── about/              #   Bio images
│   └── others/             #   Misc assets
└── audio/                  # Sound effects & music
```

---

## 🚀 Getting Started

No build tools needed, it's pure HTML/CSS/JS.

```bash
# Clone the repo
git clone https://github.com/AshGames/portfolio.git
cd portfolio

# Serve locally (any static server works)
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000` (or whichever port) and start shooting!

> **Note:** A local server is required because the project uses ES Modules (`import`/`export`).

---

## 🛠️ Customization

Want to fork this and make it your own? Here's where to look:

| What              | File                          |
| ----------------- | ----------------------------- |
| Your projects     | `data/projects.js`            |
| Your social links | `data/socials.js`             |
| Achievements      | `data/achievements.js`        |
| Translations      | `data/translations.js`        |
| Visual theme      | `css/base.css`                |
| Game mechanics    | `js/game.js`, `js/targets.js` |

---

## � Google Analytics

This portfolio uses **Google Analytics 4** to track anonymous usage events such as:

| Event                  | Description                      | Custom Parameters                |
| ---------------------- | -------------------------------- | -------------------------------- |
| `intro_passed`         | Visitor clicked START            | `device_type` (mobile / desktop) |
| `bio_opened`           | Visitor shot the bio/head target | —                                |
| `project_opened`       | Visitor shot a project UFO       | `project_id`, `project_title`    |
| `social_opened`        | Visitor shot a social target     | `social_label`, `social_url`     |
| `achievement_unlocked` | Visitor unlocked an achievement  | `achievement_id`                 |

### Using your own Google Analytics

If you fork this project, replace the GA Measurement ID with your own:

1. Create a **Google Analytics 4** property at [analytics.google.com](https://analytics.google.com).
2. Copy your Measurement ID (looks like `G-XXXXXXXXXX`).
3. In `index.html`, replace the two occurrences of `G-615NEBXSL3` with your own ID:

```html
<!-- in <head> -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-YOUR_ID");
</script>
```

4. **(Optional)** To see the custom parameters in reports, go to **Admin → Data display → Custom definitions** and register each parameter as a custom dimension.

That's it, all the `gtag("event", ...)` calls in `js/game.js` and `js/achievements.js` will automatically send data to your property.

> **To disable analytics entirely**, remove the GA `<script>` tags from `index.html`. The event calls are safely guarded with `typeof gtag === "function"` and will simply no-op.

---

## �📜 License

This project is open source under the [MIT License](LICENSE).

**Designed & coded by [Achraf Mezdari](https://www.linkedin.com/in/achraf-mezdari).**

You're free to use, modify, and distribute this code, just keep the attribution. If you build something cool with it, I'd love to see it! 🎯

---

<p align="center">
  <a href="https://github.com/AshGames">GitHub</a> •
  <a href="https://www.linkedin.com/in/achraf-mezdari">LinkedIn</a> •
  <a href="https://ashmi.itch.io/">Itch.io</a> •
  <a href="mailto:mezdariachraf@hotmail.fr">Email</a>
</p>
