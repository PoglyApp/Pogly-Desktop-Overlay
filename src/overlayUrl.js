// A Pogly overlay URL as copied from Pogly settings → overlay url,
// e.g. https://cloud.pogly.gg/overlay?module=<identity>
// Also serialized into the URL dialog, so it must stay self-contained
function isOverlayUrl(value) {
  try {
    const url = new URL(String(value).trim())
    return (url.protocol === 'https:' || url.protocol === 'http:') &&
      url.pathname.replace(/\/+$/, '') === '/overlay' &&
      !!url.searchParams.get('module')
  } catch (_) {
    return false
  }
}

// The overlay is always rendered at 1920x1080 and zoomed to the screen (see webContent.js),
// so Pogly's "resolution mismatch" warning is turned off with warn=0
function withOverlayParams(value) {
  const url = new URL(String(value).trim())
  url.searchParams.set('warn', '0')
  return url.toString()
}

module.exports = { isOverlayUrl, withOverlayParams }
