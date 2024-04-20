// 'use strict';

// chrome.alarms.onAlarm.addListener(() => {
//   chrome.action.setBadgeText({ text: '' });
//   chrome.notifications.create({
//     type: 'basic',
//     iconUrl: 'clock-icon.png',
//     title: 'Limit Exceeded',
//     message: "You have exceeded Time Limit for the day!",
//     buttons: [{ title: 'Limit Exceeded' }],
//     priority: 0
//   });
// });

// chrome.notifications.onButtonClicked.addListener(async () => {
//   const item = await chrome.storage.sync.get(['minutes']);
//   chrome.action.setBadgeText({ text: 'ON' });
//   chrome.alarms.create({ delayInMinutes: item.minutes });
// });

// 'use strict';

// chrome.tabs.onActivated.addListener(tab => {
//   chrome.tabs.get(tab.tabId, async currentTab => {
//     if (currentTab && matchUrl(currentTab.url)) {
//       // Run your timer logic here
//       console.log('Timer is active on:', currentTab.url);
//       // Example: chrome.alarms.create({ delayInMinutes: 1 });
//     }
//   });
// });

// function matchUrl(url) {
//   const allowedUrls = [
//     "*://twitter.com/*",
//     "*://www.instagram.com/*",
//     "*://www.facebook.com/*",
//     "*://web.whatsapp.com/*",
//     "*://www.reddit.com/*"
//   ];
//   return allowedUrls.some(pattern => new RegExp(pattern).test(url));
// }
// 'use strict';

// let activeTimers = {}; // Stores timers per tabId

// chrome.tabs.onActivated.addListener(async tab => {
//   chrome.tabs.get(tab.tabId, currentTab => {
//     if (!currentTab) return; 

//     const tabId = currentTab.id;

//     if (matchUrl(currentTab.url)) {
//       resumeTimer(tabId);
//     } else {
//       pauseTimer(tabId);
//     }
//   });
// });

// chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
//     delete activeTimers[tabId]; 
// });

// chrome.alarms.onAlarm.addListener(alarm => {
//   if (alarm.name.startsWith('socialMediaTimer')) { 
//     const tabId = parseInt(alarm.name.split('-')[1]);
    
//     chrome.notifications.create({
//       type: 'basic',
//       iconUrl: 'clock-icon.png',
//       title: 'Time\'s up!',
//       message: 'You\'ve spent your allocated time on this social media site.',
//       priority: 0
//     });
//     delete activeTimers[tabId]; 
//   }
// });

// function matchUrl(url) {
//   if (!url) { return false; } // Handle undefined URLs

//   const socialMediaUrls = [
//     "*://twitter.com/*",
//     "*://www.instagram.com/*",
//     "*://www.facebook.com/        *",
//     "*://web.whatsapp.com/*",
//     "*://*.reddit.com/*"
//   ];

//   return socialMediaUrls.some(pattern => url.includes(pattern.replace('*', '')));
// }


// function startTimer(tabId, duration) {
//   activeTimers[tabId] = {
//     duration: duration,
//     startTime: Date.now() 
//   };
//   createAlarm(tabId);
// }

// function resumeTimer(tabId) {
//   if (activeTimers[tabId]) {
//     const now = Date.now();
//     const timeElapsed = now - activeTimers[tabId].startTime;
//     const remainingDuration = activeTimers[tabId].duration - timeElapsed;

//     if (remainingDuration > 0) {
//       createAlarm(tabId, remainingDuration);
//     } else {
//       delete activeTimers[tabId]; 
//     }
//   }
// }

// function pauseTimer(tabId) {
//   if (activeTimers[tabId]) {
//     chrome.alarms.clear(`socialMediaTimer-${tabId}`); 
//   }
// }

// function createAlarm(tabId, duration = 0) {
//   chrome.alarms.create(`socialMediaTimer-${tabId}`, { delayInMinutes: duration / 60000 });
// }