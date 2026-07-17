
let tabCounts = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true, totalBlocked: 0 });
});

if (chrome.declarativeNetRequest.onRuleMatchedDebug) {
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
    const tabId = info.request.tabId;
    tabCounts[tabId] = (tabCounts[tabId] || 0) + 1;
    updateBadge(tabId);
    chrome.storage.local.get(['totalBlocked'], (res) => {
      chrome.storage.local.set({ totalBlocked: (res.totalBlocked || 0) + 1 });
    });
  });
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === 'ADS_REMOVED' && sender.tab) {
    const tabId = sender.tab.id;
    tabCounts[tabId] = (tabCounts[tabId] || 0) + msg.count;
    updateBadge(tabId);
    chrome.storage.local.get(['totalBlocked'], (res) => {
      chrome.storage.local.set({ totalBlocked: (res.totalBlocked || 0) + msg.count });
    });
  }
});

function updateBadge(tabId) {
  const count = tabCounts[tabId] || 0;
  chrome.action.setBadgeText({ tabId, text: count > 0 ? String(count) : '' });
  chrome.action.setBadgeBackgroundColor({ tabId, color: '#e74c3c' });
}

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabCounts[tabId];
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    tabCounts[tabId] = 0;
    updateBadge(tabId);
  }
});


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'TOGGLE_ENABLED') {
    const enabled = msg.enabled;
    if (enabled) {
      chrome.declarativeNetRequest.updateEnabledRulesets({ enableRulesetIds: ['ruleset_1'] });
    } else {
      chrome.declarativeNetRequest.updateEnabledRulesets({ disableRulesetIds: ['ruleset_1'] });
    }
    chrome.storage.local.set({ enabled });
    sendResponse({ ok: true });
  }
  return true;
});
