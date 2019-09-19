import { app, BrowserWindow, Tray } from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
let tray;
let settingWindow;

// 开发模式时使用webpack-dev-server的URL
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide();
  } else {
    window.show();
  }
};

const createSettingWindow = () => {

};

function createWindow() {
  /**
   * Initial window options
   */
  const options = {
    width: 1000,
    height: 563,
    title: 'water-drop',
    useContentSize: true,
    show: false,
  };

  if (process.platform === 'win32') {
    options.show = true;
    options.frame = false;
  }

  mainWindow = new BrowserWindow({

  });

  // 加载的窗口的URL
  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  const menubar = process.platform === 'darwin' ? `${__static}/menubar.png` : `${__static}/menubar-nodarwin.png`;
  tray = new Tray(menubar);
  const contextMenu = {};
  tray.on('right-click', () => {
    window.hide();
    tray.popUpContextMenu(contextMenu);
  });
  tray.on('click', () => {
    if (process.platform === 'darwin') {
      toggleWindow();
    } else {
      window.hide();
      if (settingWindow === null) {
        createSettingWindow();
        settingWindow.show();
      } else {
        settingWindow.show();
        settingWindow.focus();
      }
    }
  });
}

// 创建窗口
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // 如果当前操作系统不为macOS时
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
