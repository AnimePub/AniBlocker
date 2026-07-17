document.addEventListener('DOMContentLoaded', async () => {
  const enabledToggle = document.getElementById('enabledToggle');
  const pageCountEl = document.getElementById('pageCount');
  const totalCountEl = document.getElementById('totalCount');
  const reloadBtn = document.getElementById('reloadBtn');
  const tagline = document.getElementById('tagline');

  function applyState(enabled) {
    document.body.classList.toggle('paused', !enabled);
    tagline.textContent = enabled ? 'scanning this page' : 'protection paused';
  }

  const { enabled = true, totalBlocked = 0 } = await chrome.storage.local.get(['enabled', 'totalBlocked']);
  enabledToggle.checked = enabled;
  totalCountEl.textContent = totalBlocked;
  applyState(enabled);

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.id !== undefined) {
    chrome.action.getBadgeText({ tabId: tab.id }, (text) => {
      pageCountEl.textContent = text || '0';
    });
  }

  enabledToggle.addEventListener('change', () => {
    applyState(enabledToggle.checked);
    chrome.runtime.sendMessage({ type: 'TOGGLE_ENABLED', enabled: enabledToggle.checked });
  });

  reloadBtn.addEventListener('click', () => {
    if (tab && tab.id !== undefined) {
      chrome.tabs.reload(tab.id);
      window.close();
    }
  });
});
