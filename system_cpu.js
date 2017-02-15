(function () {
  'use strict';
  function doUpdateInfo() {
  }
  function getCPUInfo() {
    chrome.system.cpu.getInfo(function(info) {
      console.log(info);
      document.getElementById('heading').innerText = info.archName;
    });
  }
  document.getElementById('toggleAlarm').addEventListener('click', getCPUInfo);
})();
