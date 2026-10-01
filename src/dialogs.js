const { BrowserWindow, clipboard } = require('electron')
const path = require('path')
const { isOverlayUrl } = require('./overlayUrl')

function promptForUrl(store, mainWindow) {
  const urlWindow = new BrowserWindow({
    width: 520,
    height: 300,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.js')
    },
    autoHideMenuBar: true,
    frame: true,
    resizable: true,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    minWidth: 420,
    minHeight: 300
  })

  // Prefill with the saved URL, or with the clipboard when the user already copied one
  const savedUrl = store.get('url')
  const clipboardUrl = clipboard.readText().trim()
  const initialUrl = isOverlayUrl(savedUrl) ? savedUrl : isOverlayUrl(clipboardUrl) ? clipboardUrl : ''

  const htmlContent = encodeURIComponent(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Pogly Overlay URL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            padding: 24px;
            margin: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
            overflow: hidden;
          }

          .container {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          h3 {
            color: #1a1a1a;
            font-size: 16px;
            font-weight: 600;
          }

          ol {
            font-size: 13px;
            color: #444;
            padding-left: 18px;
            line-height: 1.6;
          }

          b {
            color: #1a1a1a;
            font-weight: 600;
          }

          input {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 13px;
            transition: all 0.2s ease;
          }

          input:focus {
            outline: none;
            border-color: #6441a5;
            box-shadow: 0 0 0 3px rgba(100, 65, 165, 0.12);
          }

          input.invalid {
            border-color: #d9534f;
          }

          .error {
            font-size: 11px;
            color: #d9534f;
            min-height: 14px;
          }

          .actions {
            display: flex;
            justify-content: flex-end;
          }

          button {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            background: #6441a5;
            color: white;
          }

          button:hover {
            background: #503289;
          }

          button:disabled {
            background: #ccc;
            cursor: default;
          }
        </style>

        <div class="container">
          <h3>Paste your Pogly overlay URL</h3>
          <ol>
            <li>In Pogly, open <b>settings</b> and click <b>copy overlay url</b></li>
            <li>Paste it below (Ctrl+V)</li>
          </ol>
          <input
            type="text"
            id="overlayUrl"
            placeholder="https://cloud.pogly.gg/overlay?module=..."
            spellcheck="false"
            autocomplete="off"
            autofocus
          >
          <div class="error" id="error"></div>
          <div class="actions">
            <button id="saveBtn" onclick="submit()">Connect</button>
          </div>
        </div>

        <script>
          ${isOverlayUrl.toString()}

          const input = document.getElementById('overlayUrl');
          const error = document.getElementById('error');
          const saveBtn = document.getElementById('saveBtn');

          function validate() {
            const value = input.value.trim();
            const valid = isOverlayUrl(value);
            const showError = value !== '' && !valid;
            input.classList.toggle('invalid', showError);
            error.textContent = showError ? "That isn't a Pogly overlay URL, it should look like https://cloud.pogly.gg/overlay?module=..." : '';
            saveBtn.disabled = !valid;
            return valid;
          }

          function submit() {
            if (!validate()) return;
            window.electronAPI.setUrl(input.value.trim());
            window.close();
          }

          input.addEventListener('input', validate);
          input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') submit();
          });

          input.value = ${JSON.stringify(initialUrl).replace(/</g, '\\u003c')};
          input.select();
          validate();
        </script>
      </body>
    </html>
  `)

  urlWindow.loadURL(`data:text/html;charset=UTF-8,${htmlContent}`)
  urlWindow.removeMenu()
}

function promptForHotkey(store) {
  const hotkeyWindow = new BrowserWindow({
    width: 400,
    height: 250,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.js')
    },
    autoHideMenuBar: true,
    frame: true,
    resizable: true,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    minWidth: 300,
    minHeight: 250
  })

  const currentHotkey = store.get('hotkey')
  const htmlContent = encodeURIComponent(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Set Hotkey</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            padding: 24px;
            margin: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
            overflow: hidden;
          }
          
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          
          h3 { 
            color: #1a1a1a;
            font-size: 16px;
            font-weight: 600;
            text-align: center;
          }
          
          #key { 
            font-size: 32px;
            font-weight: 600;
            padding: 20px 40px;
            background: #f8f8f8;
            border: 2px solid #2196F3;
            border-radius: 8px;
            min-width: 140px;
            text-align: center;
            color: #1a1a1a;
            transition: all 0.2s ease;
            user-select: none;
          }
          
          #key:empty:before {
            content: "${currentHotkey || 'F22'}";
            color: #666;
          }
          
          #instruction {
            font-size: 13px;
            color: #666;
            text-align: center;
          }
        </style>

        <div class="container">
          <h3>Press any key to set as hotkey</h3>
          <div id="key"></div>
          <div id="instruction">Press Esc to cancel</div>
        </div>

        <script>
          const keyDisplay = document.getElementById('key');
          
          document.addEventListener('keydown', (e) => {
            e.preventDefault();
            
            if (e.key === 'Escape') {
              window.close();
              return;
            }
            
            const key = e.key.toUpperCase();
            keyDisplay.textContent = key;
            window.electronAPI.setHotkey(key);
            // Close the window after a brief delay to show the key
            setTimeout(() => window.close(), 200);
          });
        </script>
      </body>
    </html>
  `)

  hotkeyWindow.loadURL(`data:text/html;charset=UTF-8,${htmlContent}`)
  hotkeyWindow.removeMenu()
}

module.exports = { promptForUrl, promptForHotkey }