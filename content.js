
(function () {
  const AD_SELECTORS = [
    'iframe[src*="doubleclick"]',
    'iframe[src*="googlesyndication"]',
    'iframe[src*="googleadservices"]',
    'iframe[id^="google_ads_iframe"]',
    'ins.adsbygoogle',
    '[id^="div-gpt-ad"]',
    '[class*="ad-container"]',
    '[class*="sponsored-post"]',
    '[data-ad-slot]',
    '[data-google-query-id]'
  ];

  let blockedCount = 0;

  function sweepClickCatchers(root) {
    const candidates = root.querySelectorAll('div, a, span');
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    candidates.forEach((el) => {
      if (el.dataset.aniblockerChecked) return;
      el.dataset.aniblockerChecked = '1';

      let style;
      try {
        style = window.getComputedStyle(el);
      } catch (e) {
        return;
      }
      const positioned = style.position === 'fixed' || style.position === 'absolute';
      if (!positioned) return;

      const rect = el.getBoundingClientRect();
      const coversViewport = rect.width >= vw * 0.75 && rect.height >= vh * 0.6;
      if (!coversViewport) return;

      const containsVideo = !!el.querySelector('video, audio');
      if (containsVideo) return;

      const zIndex = parseInt(style.zIndex, 10) || 0;
      const looksTransparentOrThin =
        el.children.length <= 2 &&
        (style.backgroundColor === 'transparent' ||
          style.backgroundColor === 'rgba(0, 0, 0, 0)' ||
          parseFloat(style.opacity) < 0.15);

      if (zIndex >= 999 && looksTransparentOrThin) {
        el.remove();
        blockedCount++;
      }
    });
  }

  function removeAds(root) {
    AD_SELECTORS.forEach((sel) => {
      let nodes;
      try {
        nodes = root.querySelectorAll(sel);
      } catch (e) {
        return;
      }
      nodes.forEach((node) => {
        if (node && node.isConnected) {
          node.remove();
          blockedCount++;
        }
      });
    });
  }

  
  document.addEventListener('DOMContentLoaded', () => {
    removeAds(document);
    sweepClickCatchers(document);
  });
  removeAds(document);
  sweepClickCatchers(document);


  document.addEventListener(
    'click',
    () => {
      setTimeout(() => sweepClickCatchers(document), 0);
    },
    true
  );


  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.addedNodes.length) {
        removeAds(document);
        sweepClickCatchers(document);
        break;
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  
  setInterval(() => {
    if (blockedCount > 0) {
      chrome.runtime.sendMessage({ type: 'ADS_REMOVED', count: blockedCount });
      blockedCount = 0;
    }
  }, 2000);
})();
