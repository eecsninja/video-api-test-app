function updateTemperatureField(fieldName, temps) {
  var output = '';
  for (var i = 0; i < temps.length; i++)
    output += (temps[i] / 1000).toFixed(3) + '\n';
  document.getElementById(fieldName).innerText = output;
}

var alarmName = 'update';
chrome.alarms.onAlarm.addListener(function( alarm ) {
  if (alarm.name == alarmName) {
    chrome.system.cpu.getTemperature(function(temps) {
      if (temps.length < 1)
        return;
      updateTemperatureField('temp-old', temps[0]);
    });
  }
});
chrome.alarms.create(alarmName, {delayInMinutes: 0.02, periodInMinutes: 0.02});
