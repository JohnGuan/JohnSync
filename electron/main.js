const path = require('path');
const { spawn } = require('child_process');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');


// Import Binaries Path
const { syncthingPath } = require('./binaries-path');
// Set Syncthing Config File Path 
const syncthingConfigPath = path.join(app.getPath('userData'), 'syncthing')
// Create Syncthing child_process
const syncthing = spawn(syncthingPath, ['--no-browser', '--home=' + syncthingConfigPath]);

// Handle Syncthin output and events
syncthing.stdout.on('data', (data) => {
  console.log(`syncthing stdout: ${data}`);
});
syncthing.stderr.on('data', (data) => {
  console.error(`syncthing stderr: ${data}`);
});
syncthing.on('close', (code) => {
  console.log(`syncthing exited with code ${code}`);
});



function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow);
app.on('ready', () => {
  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});