<p align="center">
    <a href="https://pogly.gg#gh-dark-mode-only" target="_blank">
	<img width="128" src="./images/dark/Pog.png" alt="Pogly Logo">
    </a>
    <a href="https://pogly.gg#gh-light-mode-only" target="_blank">
	<img width="128" src="./images/light/Pog.png" alt="Pogly Logo">
    </a>
</p>
<p align="center">
    <a href="https://pogly.gg#gh-dark-mode-only" target="_blank">
        <img width="250" src="./images/dark/pogly-text.png" alt="Pogly">
    </a>
    <a href="https://pogly.gg#gh-light-mode-only" target="_blank">
        <img width="250" src="./images/light/pogly-text.png" alt="Pogly">
    </a>
    <p style="font-style: italic; line-height: 0" align="center">
        Desktop Overlay — display your Pogly module directly on screen
    </p>
</p>

<p align="center">
    <a href="https://github.com/PoglyApp/pogly-cloud"><img src="https://img.shields.io/badge/built_for-Pogly_Cloud-6441a5.svg?style=flat-square" /></a>
    &nbsp;
    <img src="https://img.shields.io/badge/built_with-Electron-47848F.svg?style=flat-square" />
    &nbsp;
    <a href="https://github.com/PoglyApp/pogly-desktop-overlay/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-50C878.svg?style=flat-square" /></a>
</p>

<p align="center">
    <a href="https://discord.gg/pogly"><img height="25" src="./images/social/discord.svg" alt="Discord" /></a>
    &nbsp;
    <a href="https://www.twitch.tv/poglygg"><img height="25" src="./images/social/twitch.svg" alt="Twitch" /></a>
    &nbsp;
    <a href="https://www.youtube.com/@PoglyApp"><img height="25" src="./images/social/youtube.svg" alt="YouTube" /></a>
    &nbsp;
    <a href="https://x.com/PoglyApp"><img height="25" src="./images/social/twitter.svg" alt="Twitter" /></a>
</p>

<br>

## What is Pogly Desktop Overlay?

[Pogly](https://pogly.gg) is a real-time collaborative stream overlay — think Figma, but for your OBS sources. This companion app lets you display your Pogly module as a **transparent, click-through overlay directly on your desktop**, so your overlay is always visible while you game without needing OBS in the foreground.

## Getting Started

### Download

Grab the latest release from the [releases page](https://github.com/PoglyApp/pogly-desktop-overlay/releases).

### First Launch

1. On first launch you'll be prompted to enter your **Pogly module name** (e.g. `chippy`)
2. The app constructs the URL automatically: `https://cloud.pogly.gg/overlay?module=<name>`
3. The overlay loads fullscreen, transparent, and click-through — it won't interfere with your game

### Controls

| Action | How |
|---|---|
| Toggle overlay visibility | Press `Insert` (default) or your configured hotkey |
| Change module | Right-click tray icon → Change Pogly Module |
| Change hotkey | Right-click tray icon → Change Hotkey |
| Adjust opacity | Right-click tray icon → Opacity |
| Reset all settings | Right-click tray icon → Reset Settings |
| Exit | Right-click tray icon → Exit |

Double-clicking the tray icon also toggles the overlay.

> **Stream Deck tip:** Add a Hotkey button and bind it to `Insert` (or whatever you configure) for one-tap toggling.

## Building from Source

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/PoglyApp/pogly-desktop-overlay
cd pogly-desktop-overlay
npm install
npm start
```

### Build for distribution

```bash
npm run build
```

## Technical Details

### Project Structure

```
├── src/
│   ├── dialogs.js     # Module name and hotkey prompts
│   ├── shortcuts.js   # Global hotkey registration
│   ├── tray.js        # System tray menu
│   ├── webContent.js  # Content scaling (1920x1080 → native resolution)
│   └── window.js      # Main overlay window setup
├── main.js            # Entry point and IPC handlers
├── preload.js         # IPC bridge
└── package.json
```

### Notes

- The overlay window is scaled from a fixed 1920×1080 canvas to fit your actual screen resolution. This matches how Pogly Cloud renders its canvas.
- Settings (module URL, hotkey, opacity) are persisted automatically between sessions via `electron-store`.

## License

MIT
