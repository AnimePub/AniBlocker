

(function () {
  if (window.__aniblockerPopupGuard) return;
  window.__aniblockerPopupGuard = true;

  const nativeOpen = window.open;

 
  function stubWindow() {
    return {
      closed: true,
      close() {},
      focus() {},
      blur() {},
      postMessage() {},
      location: { href: 'about:blank' },
    };
  }

  window.open = function (...args) {

    return stubWindow();
  };

  const origCreateElement = Document.prototype.createElement;
  Document.prototype.createElement = function (tagName, ...rest) {
    const el = origCreateElement.call(this, tagName, ...rest);
    if (typeof tagName === 'string' && tagName.toLowerCase() === 'iframe') {
      el.addEventListener('load', () => {
        try {
          if (el.contentWindow && el.contentWindow !== window) {
            el.contentWindow.open = window.open;
          }
        } catch (e) {
         
        }
      });
    }
    return el;
  };
})();
