
function updateTemperatureField(fieldName, temps) {
  var output = '';
  for (var i = 0; i < temps.length; i++)
    output += temps[i].toFixed(3) + '\n';
  document.getElementById(fieldName).innerText = output;
}

var alarmName = 'update';
chrome.alarms.onAlarm.addListener(function( alarm ) {
  if (alarm.name == alarmName) {
    chrome.system.cpu.getInfo(function(response) {
      if ('temperatures' in response) {
        var temps = response['temperatures'];
        console.log(temps);
        updateTemperatureField('temp-old', temps);
      } else {
        console.log('Could not find temperatures in response: ' + response);
      }
    });
  }
});
chrome.alarms.create(alarmName, {delayInMinutes: 0.02, periodInMinutes: 0.02});
