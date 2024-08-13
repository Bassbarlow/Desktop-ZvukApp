const { app, BrowserWindow,nativeImage, Menu, Tray } = require('electron');
const { updateElectronApp, UpdateSourceType } = require('update-electron-app');
const { join } = require('path');

updateElectronApp(); // additional configuration options available

app.on('before-quit', function () {
  isQuiting = true;
});
let win = null
const gotTheLock = app.requestSingleInstanceLock()
const createWindow = () => {
  icon = nativeImage.createFromPath(join(__dirname, "src", "icons", "32x32.png"))
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'ZvukApp',
    icon: icon,
  });
  win.on('page-title-updated', (evt) => {
    evt.preventDefault();
    win.setTitle("ZvukApp");
  });

  win.loadURL('https://zvuk.com/');
  win.on('minimize',function(event){
    event.preventDefault();
    win.hide();
});

}

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to start a second instance, focus our window.
    if (win) {
      if (win.isMinimized()) win.show()
    }
  })

  // Create myWindow, load the rest of the application, etc.
  app.whenReady().then(() => {
    createWindow()
    icon = nativeImage.createFromPath(join(__dirname, "src", "icons", "32x32.png"))
    tray = new Tray(icon)
    tray.setContextMenu(Menu.buildFromTemplate([
      {
        label: 'Show App', click: function () {
          win.show();
        }
      },
      {
        label: 'Quit', click: function () {
          isQuiting = true;
          app.quit();
        }
      }
    ]));
    tray.on('click', function(e){
      if (!win.isVisible()){
        win.show();
      }
    });
    tray.on('double-click', function(e){
      if (win.isVisible()){
        win.hide();
      }
    });
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

