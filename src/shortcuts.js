const { globalShortcut } = require('electron')

function registerHotkey(key, handler) {
  const registered = globalShortcut.register(key, handler)
  if (!registered) console.error(`Failed to register hotkey: ${key} — it may be claimed by another application.`)
  return registered
}

function setupShortcuts(mainWindow, store) {
  const toggle = () => {
    if (!mainWindow) return true
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    return true
  }

  registerHotkey(store.get('hotkey'), toggle)
  return toggle
}

module.exports = { setupShortcuts, registerHotkey }