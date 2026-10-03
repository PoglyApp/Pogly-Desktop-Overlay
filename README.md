<p align="center">
    <a href="https://pogly.gg#gh-dark-mode-only" target="_blank">
        <img width="350" src="./images/dark/logo.png" alt="Pogly">
    </a>
    <a href="https://pogly.gg#gh-light-mode-only" target="_blank">
        <img width="350" src="./images/light/logo.png" alt="Pogly">
    </a>
</p>
<p align="center"><em>Desktop Overlay — display your Pogly module directly on screen</em></p>

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

1. In Pogly, open **settings** and click **copy overlay url**
2. On first launch, paste it into the prompt (if it's already on your clipboard it's filled in for you)
3. The overlay loads fullscreen, transparent, and click-through — it won't interfere with your game

### Controls

| Action | How |
|---|---|
| Toggle overlay visibility | Press `Insert` (default) or your configured hotkey |
| Change overlay | Right-click tray icon → Change Overlay URL |
| Change hotkey | Right-click tray icon → Change Hotkey |
| Adjust opacity | Right-click tray icon → Opacity |
| Mute / unmute audio (muted by default) | Right-click tray icon → Mute Audio |
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
│   ├── dialogs.js     # Overlay URL and hotkey prompts
│   ├── overlayUrl.js  # Overlay URL validation and params
│   ├── shortcuts.js   # Global hotkey registration
│   ├── tray.js        # System tray menu
│   ├── webContent.js  # Content scaling (1920x1080 → native resolution)
│   └── window.js      # Main overlay window setup
├── main.js            # Entry point and IPC handlers
├── preload.js         # IPC bridge
└── package.json
```

### Notes

- The overlay renders at 1920×1080 (the default Pogly layout resolution) and is zoomed to fill your screen, e.g. 1440p or 4K. On screens that aren't 16:9 it's scaled to fit and centered.
- `warn=0` is always added to the overlay URL, since the zoomed overlay would otherwise show Pogly's resolution mismatch warning.
- Settings (overlay URL, hotkey, opacity) are persisted automatically between sessions via `electron-store`.

## License

MIT
