// 1️⃣ package.json Güncellemesi
// package.json dosyanı aç ve "build" bölümünü şu şekilde değiştir:

// 🛠 Yöntem 1: NSIS Installer (Önerilen)
// Bu yöntem, tek bir setup.exe dosyası oluşturur.

// "build": {
//   "appId": "com.electron.alarm",
//   "productName": "ElectronAlarm",
//   "win": {
//     "target": "nsis",
//     "icon": "icon.ico"
//   },
//   "nsis": {
//     "oneClick": true,
//     "perMachine": true,
//     "allowToChangeInstallationDirectory": false
//   }
// }
// ✅ Sonuç:

// Kullanıcı sadece ElectronAlarm Setup.exe dosyasını çalıştırır.
// Kurulum tamamlandıktan sonra, uygulama C:\Program Files\ElectronAlarm içine yüklenir.

// 🛠 Yöntem 2: Portable EXE (Kurulum Gerektirmeyen Tek Dosya)
// Eğer kurulum istemiyorsan, sadece tek bir .exe dosyası oluşturmak için:

// "build": {
//   "appId": "com.electron.alarm",
//   "productName": "ElectronAlarm",
//   "win": {
//     "target": "portable",
//     "icon": "icon.ico"
//   }
// }

// ✅ Sonuç:

// Tek bir ElectronAlarm.exe dosyası oluşur.
// Kullanıcı kurulum yapmadan direkt çalıştırabilir.

// 2️⃣ Tek EXE’yi Oluşturma
// Güncellenmiş package.json ile terminalde şunu çalıştır:

// npm run dist

// Çıktılar:

// Eğer NSIS Installer kullandıysan → dist/ElectronAlarm Setup.exe
// Eğer Portable EXE kullandıysan → dist/ElectronAlarm.exe

// https://chatgpt.com/share/67ab3b0f-7910-800f-9b0f-2440f09385eb
