let activeTimer = null;

function checkAndHandleTimer() {
  if (activeTimer) {
    const now = Date.now();
    const timeElapsed = now - activeTimer.startTime;

    if (timeElapsed >= activeTimer.duration) {
      alert('Time\'s up!');
      clearInterval(activeTimer);
      activeTimer = null;
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'startTimer') {
    const duration = request.duration * 60000; // Convert minutes to milliseconds
    activeTimer = {
      startTime: Date.now(),
      duration: duration
    };

    // Wake-up Strategy (Example): Check timer every 15 seconds
    setInterval(checkAndHandleTimer, 15000); 
  }
});

// Logic to detect if you're on a social media website (using matchUrl)
if (matchUrl(document.URL)) {
  chrome.storage.sync.get(['duration'], (data) => {
    if (data.duration) {
      chrome.runtime.sendMessage({ type: 'startTimer', duration: data.duration });
    }
  });
}

function matchUrl(url) {
    if (!url) { return false; } // Handle undefined URLs
  
    const socialMediaUrls = [
      "*://twitter.com/*",
      "*://www.instagram.com/*",
      "*://www.facebook.com/        *",
      "*://web.whatsapp.com/*",
      "*://*.reddit.com/*"
    ];
  
    return socialMediaUrls.some(pattern => url.includes(pattern.replace('*', '')));
  }