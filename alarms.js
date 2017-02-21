goog.require('proto.videoconf.gvc.hotrodapi.VideoConfSendDataParams');
goog.require('proto.videoconf.gvc.hotrodapi.VideoConfSendDataResponse');
goog.require('proto.videoconf.gvc.hotrodapi.VideoConfSendDataResponse.GetCPUTemperature');

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

    // Set up the protobuf for the API call.
    var params = new proto.videoconf.gvc.hotrodapi.VideoConfSendDataParams();
    params.setCommand('GetCPUTemperature');
    chrome.videoconfPrivate.sendData(
      new TextDecoder("utf-8").decode(params.serializeBinary()),
      function(response) {
        // |response| is an array containing the callback arguments.
        if (response.length < 2) {
          console.log("Expected response with 2 elements, but got " +
                      response.length);
          return;
        }
        var status = response[0];
        if (status != "SUCCESS") {
          console.log("Got status " + status);
          return;
        }
        var responseString = response[1];
        var splitString = responseString.split("");
        var bytes = new Uint8Array(splitString.length);
        for (var i = 0, len = bytes.length; i < len; ++i) {
          bytes[i] = splitString[i].charCodeAt(0);
          console.log("  Byte: " + bytes[i]);
        }
        var response =
            proto.videoconf.gvc.hotrodapi.VideoConfSendDataResponse.
                deserializeBinary(bytes);
        var temp = response.getCpuTemperature();
        var temp_obj = temp.toObject();
        var temp2 = temp.getTemperatureList();
        //var temp = response.getCpuTemperature().getTemperature();
        console.log(status, temp2);
      }
    );
  }
});
chrome.alarms.create(alarmName, {delayInMinutes: 0.02, periodInMinutes: 0.02});
