const { app, ipcMain, globalShortcut } = require('electron')
const { createWindow } = require('./src/window')
const { setupTray } = require('./src/tray')
const { setupShortcuts, registerHotkey } = require('./src/shortcuts')
const Store = require('electron-store')

const store = new Store()
let mainWindow = null
let tray = null
let toggleOverlay = null

// Initialize default settings
if (!store.get('hotkey')) store.set('hotkey', 'Insert')
if (!store.get('url')) store.set('url', '')
if (!store.get('opacity')) store.set('opacity', 1)

// Handle URL changes
ipcMain.on('set-url', (event, newUrl) => {
  store.set('url', newUrl)
  if (mainWindow) {
    mainWindow.loadURL(newUrl)
  }
})

// Handle hotkey changes
ipcMain.on('set-hotkey', (event, newHotkey) => {
  globalShortcut.unregister(store.get('hotkey'))
  store.set('hotkey', newHotkey)
  registerHotkey(newHotkey, toggleOverlay)

  if (tray) tray.destroy()
  tray = setupTray(mainWindow, store)
})

app.whenReady().then(() => {
  mainWindow = createWindow(store)
  tray = setupTray(mainWindow, store)
  toggleOverlay = setupShortcuts(mainWindow, store)
})

app.on('will-quit', () => {
  if (tray) {
    tray.destroy()
  }
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', (e) => {
  e.preventDefault()
})

app.on('activate', () => {
  if (require('electron').BrowserWindow.getAllWindows().length === 0) {
    mainWindow = createWindow(store)
  }
})