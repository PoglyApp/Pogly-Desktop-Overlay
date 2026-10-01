const { screen } = require('electron')

// Nearly every Pogly layout uses the default 1920x1080 resolution
const OVERLAY_WIDTH = 1920
const OVERLAY_HEIGHT = 1080

function setupWebContent(window) {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().bounds
  // Zooming (instead of a CSS transform) shrinks the page's viewport to 1920x1080, so vw/vh units,
  // fixed elements and embeds all lay out exactly as they would in a 1080p OBS browser source
  const zoom = Math.min(screenWidth / OVERLAY_WIDTH, screenHeight / OVERLAY_HEIGHT)

  // Centers the canvas on screens that aren't 16:9; both are 0 on 16:9 screens
  const offsetX = (screenWidth / zoom - OVERLAY_WIDTH) / 2
  const offsetY = (screenHeight / zoom - OVERLAY_HEIGHT) / 2

  window.webContents.setZoomFactor(zoom)
  window.webContents.insertCSS(`
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: ${OVERLAY_WIDTH}px !important;
      height: ${OVERLAY_HEIGHT}px !important;
      ${offsetX || offsetY ? `transform: translate(${offsetX}px, ${offsetY}px);` : ''}
    }
    html, body {
      background: transparent !important;
      background-color: transparent !important;
      overflow: hidden !important;
    }
  `)

  window.show()
}

module.exports = { setupWebContent }
