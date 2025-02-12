const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow;
let tray;

app.whenReady().then(() => {
    createMainWindow();
    createTray();
});

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');

    // "X" butonuna basınca uygulama tamamen kapansın
    mainWindow.on('close', () => {
        app.quit();
    });
}

function createTray() {
    tray = new Tray(path.join(__dirname, 'icon.png')); // Bir icon ekleyebilirsin
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Göster', click: () => mainWindow.show() },
        { label: 'Çıkış', click: () => { app.quit(); } }
    ]);
    tray.setToolTip('Electron Alarm');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        mainWindow.show();
    });
}

ipcMain.on('hide-app', () => {
    mainWindow.hide();
});

ipcMain.on('show-app', () => {
    mainWindow.show();
});