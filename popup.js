// 'use strict';

// function setAlarm(event) {
//   const minutes = parseFloat(document.getElementById('time').value);
//   console.log('Setting alarm for: ' + minutes + ' minutes');
//   chrome.action.setBadgeText({ text: 'ON' });
//   chrome.alarms.create({ delayInMinutes: minutes });
//   chrome.storage.sync.set({ minutes: minutes });
//   window.close();
// }

// function clearAlarm() {
//   chrome.action.setBadgeText({ text: '' });
//   chrome.alarms.clearAll();
//   window.close();
// }

// document.getElementById('setAlarm').addEventListener('click', setAlarm);
// document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);


// 'use strict';

// function setAlarm(event) {
//   const minutes = parseFloat(document.getElementById('time').value);
//   console.log('Setting alarm for:', minutes, 'minutes');
//   // You can add logic here to check if the current tab matches allowed URLs
//   chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//     const currentTab = tabs[0];
//     if (currentTab && matchUrl(currentTab.url)) {
//       chrome.action.setBadgeText({ text: 'ON' });
//       chrome.alarms.create({ delayInMinutes: minutes });
//       chrome.storage.sync.set({ minutes: minutes });
//     } else {
//       console.log('Current tab does not match allowed URLs.');
//     }
//   });
//   window.close();
// }

// function clearAlarm() {
//   chrome.action.setBadgeText({ text: '' });
//   chrome.alarms.clearAll();
//   window.close();
// }

// document.getElementById('setAlarm').addEventListener('click', setAlarm);
// document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
function setTimer() {
  const durationInput = document.getElementById('duration');
  const duration = parseFloat(durationInput.value);

  if (isNaN(duration) || duration <= 0) {
    alert("Please enter a valid duration (in minutes)");
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) { // Assuming the user is on the social media tab
      chrome.tabs.sendMessage(tabs[0].id, { type: 'startTimer', duration: duration });
    }
  });

  chrome.storage.sync.set({ duration: duration }); 
  window.close();
}

document.getElementById('setTimerButton').addEventListener('click', setTimer);
