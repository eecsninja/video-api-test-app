(function () {
  'use strict';
  chrome.idle.setDetectionInterval(15);
  chrome.idle.onStateChanged.addListener(function(state) {
    console.log("Idle state changed:", state);
  });
})();
