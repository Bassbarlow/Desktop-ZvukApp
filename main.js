const { app, BrowserWindow, Menu, Tray } = require('electron');
const { updateElectronApp } = require('update-electron-app');

updateElectronApp(); // additional configuration options available

app.on('before-quit', function () {
  isQuiting = true;
});

const createWindow = () => {
  console.log(process.env.CERT_PASS);
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'ZvukApp',
    icon:'./music-player.ico',
  });
  win.on('page-title-updated', (evt) => {
    evt.preventDefault();
    win.setTitle("ZvukApp");
  });

  win.loadURL('https://zvuk.com/');
  win.reload();
  win.on('minimize',function(event){
    event.preventDefault();
    win.hide();
});

const tray = new Tray('./music-player.png');

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

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})