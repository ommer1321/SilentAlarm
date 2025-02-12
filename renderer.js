const { ipcRenderer } = require('electron');

function setAlarm() {
    const hour = parseInt(document.getElementById('hour').value);
    const minute = parseInt(document.getElementById('minute').value);

    if (isNaN(hour) || isNaN(minute)) {
        alert("Lütfen geçerli bir saat ve dakika girin.");
        return;
    }

    ipcRenderer.send('set-alarm', { hour, minute });
    alert(`Alarm kuruldu: ${hour}:${minute}`);
}

ipcRenderer.on('show-alarm', () => {
    const modal = document.getElementById('alarmModal');
    modal.style.display = 'block';
});

function closeAlarm() {
    document.getElementById('alarmModal').style.display = 'none';
}

function snoozeAlarm() {
    document.getElementById('alarmModal').style.display = 'none';

    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);

    ipcRenderer.send('set-alarm', { hour: now.getHours(), minute: now.getMinutes() });
    alert("Alarm 5 dakika ertelendi.");
}