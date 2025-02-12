const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow;
let tray;
let alarmTime = null;

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

    // Pencere kapatıldığında sadece gizle (arka planda çalışmaya devam etsin)
    mainWindow.on('close', (event) => {
        event.preventDefault();
        mainWindow.hide();
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

ipcMain.on('set-alarm', (event, alarmData) => {
    alarmTime = alarmData;
    console.log(`Alarm kuruldu: ${alarmTime.hour}:${alarmTime.minute}`);
    checkAlarm();
});

function checkAlarm() {
    setInterval(() => {
        const now = new Date();
        if (alarmTime && now.getHours() === alarmTime.hour && now.getMinutes() === alarmTime.minute) {
            showAlarmModal();
            alarmTime = null;
        }
    }, 1000);
}

function showAlarmModal() {
    mainWindow.show();
    mainWindow.webContents.send('show-alarm');
}