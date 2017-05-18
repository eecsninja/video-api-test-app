
var readerId = null;
var alarmName = 'update';
chrome.alarms.onAlarm.addListener(function( alarm ) {
  if (alarm.name == alarmName) {
    chrome.feedbackPrivate.readLogSource(
        "messages",
        true,
        readerId,
        function(id, result) {
          //console.log(id, result);
          for (var i = 0, len = result.length; i < len; ++i) {
            console.log(result[i]);
          }
          readerId = id;
        });
  }
});
chrome.alarms.create(alarmName, {delayInMinutes: 0.02, periodInMinutes: 0.02});
