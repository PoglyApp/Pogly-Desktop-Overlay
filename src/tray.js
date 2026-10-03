const { Tray, Menu, globalShortcut } = require('electron')
const path = require('path')
const { promptForUrl, promptForHotkey } = require('./dialogs')
const { registerHotkey } = require('./shortcuts')

function setupTray(mainWindow, store) {
  const tray = new Tray(path.join(__dirname, '../pogly.ico'))

  function toggleWindowVisibility() {
    if (!mainWindow) return
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  }

  function setOpacity(value) {
    if (mainWindow) {
      mainWindow.setOpacity(value)
      store.set('opacity', value)
      tray.setContextMenu(buildMenu())
    }
  }

  function setMuted(muted) {
    if (mainWindow) {
      mainWindow.webContents.setAudioMuted(muted)
      store.set('muted', muted)
      tray.setContextMenu(buildMenu())
    }
  }

  function resetSettings() {
    globalShortcut.unregisterAll()
    store.clear()
    store.set('hotkey', 'Insert')
    store.set('url', '')
    store.set('opacity', 1)
    store.set('muted', true)
    if (mainWindow) {
      mainWindow.setOpacity(1)
      mainWindow.webContents.setAudioMuted(true)
      mainWindow.hide()
    }
    registerHotkey('Insert', toggleWindowVisibility)
    tray.setContextMenu(buildMenu())
    promptForUrl(store, mainWindow)
  }

  function buildMenu() {
    return Menu.buildFromTemplate([
      {
        label: `Toggle Overlay (${store.get('hotkey')})`,
        click: toggleWindowVisibility
      },
      {
        label: 'Opacity',
        submenu: [
          { label: '25%', type: 'radio', checked: store.get('opacity') === 0.25, click: () => setOpacity(0.25) },
          { label: '50%', type: 'radio', checked: store.get('opacity') === 0.50, click: () => setOpacity(0.50) },
          { label: '75%', type: 'radio', checked: store.get('opacity') === 0.75, click: () => setOpacity(0.75) },
          { label: '100%', type: 'radio', checked: store.get('opacity') === 1, click: () => setOpacity(1) }
        ]
      },
      {
        label: 'Mute Audio',
        type: 'checkbox',
        checked: store.get('muted'),
        click: (item) => setMuted(item.checked)
      },
      { type: 'separator' },
      {
        label: 'Change Overlay URL',
        click: () => promptForUrl(store, mainWindow)
      },
      {
        label: 'Change Hotkey',
        click: () => promptForHotkey(store)
      },
      { type: 'separator' },
      {
        label: 'Reset Settings',
        click: () => resetSettings()
      },
      {
        label: 'Exit',
        click: () => require('electron').app.quit()
      }
    ])
  }

  tray.setContextMenu(buildMenu())
  tray.setToolTip('Pogly Overlay')
  tray.on('double-click', toggleWindowVisibility)

  return tray
}

module.exports = { setupTray }