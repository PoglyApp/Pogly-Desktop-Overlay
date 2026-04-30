const { BrowserWindow } = require('electron')
const path = require('path')

function getModuleFromUrl(url) {
  try {
    const params = new URLSearchParams(new URL(url).search);
    return params.get('module') || '';
  } catch (_) {
    return '';
  }
}

function promptForUrl(store, mainWindow) {
  const urlWindow = new BrowserWindow({
    width: 500,
    height: 220,
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
    minWidth: 400,
    minHeight: 220
  })

  const currentUrl = store.get('url')
  const currentModule = getModuleFromUrl(currentUrl)
  const htmlContent = encodeURIComponent(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Enter Pogly Module</title>
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
            gap: 14px;
          }

          h3 {
            color: #1a1a1a;
            font-size: 16px;
            font-weight: 600;
          }

          .input-group {
            display: flex;
            gap: 8px;
            width: 100%;
          }

          input {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            transition: all 0.2s ease;
          }

          input:focus {
            outline: none;
            border-color: #6441a5;
            box-shadow: 0 0 0 3px rgba(100, 65, 165, 0.12);
          }

          .url-preview {
            font-size: 11px;
            color: #888;
            word-break: break-all;
            min-height: 16px;
          }

          .url-preview span {
            color: #6441a5;
            font-weight: 500;
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
          <h3>Enter Pogly Module Name</h3>
          <div class="input-group">
            <input
              type="text"
              id="moduleName"
              value="${currentModule}"
              placeholder="e.g. chippy"
              spellcheck="false"
              autocomplete="off"
              autofocus
            >
          </div>
          <div class="url-preview" id="preview"></div>
          <div class="actions">
            <button id="saveBtn" onclick="submit()">Connect</button>
          </div>
        </div>

        <script>
          const BASE_URL = 'https://cloud.pogly.gg/overlay?module=';
          const input = document.getElementById('moduleName');
          const preview = document.getElementById('preview');
          const saveBtn = document.getElementById('saveBtn');

          function updatePreview() {
            const name = input.value.trim();
            if (name) {
              preview.innerHTML = BASE_URL + '<span>' + name + '</span>';
              saveBtn.disabled = false;
            } else {
              preview.textContent = '';
              saveBtn.disabled = true;
            }
          }

          function submit() {
            const name = input.value.trim();
            if (!name) return;
            window.electronAPI.setUrl(BASE_URL + name);
            window.close();
          }

          input.addEventListener('input', updatePreview);
          input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') submit();
          });

          updatePreview();
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