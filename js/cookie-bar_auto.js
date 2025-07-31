// cookie-bar_auto.js — wstawia pasek cookies tylko w przeglądarkach NIE-prywatnościowych

document.addEventListener('DOMContentLoaded', async () => {
  const isPrivacyBrowser = async () => {
    try {
      // Brave przez navigator.brave
      if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
        const result = await navigator.brave.isBrave();
        if (result) return true;
      }
    } catch (_) {}

    // Brave przez UA/vendor
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('brave') || navigator.vendor === 'Brave Software, Inc.') return true;

    // Mullvad / Safari private – brak localStorage
    try {
      localStorage.setItem('privacy_test', '1');
      localStorage.removeItem('privacy_test');
    } catch (_) {
      return true;
    }

    return false;
  };

  const isPrivate = await isPrivacyBrowser();

  if (isPrivate) {
    console.log('🔒 Prywatna przeglądarka wykryta – nie pokazuję paska cookies');
    return;
  }

  // Tworzenie paska cookies
  const bar = document.createElement('div');
  bar.id = 'cookie-bar';
  bar.style = 'position:fixed;bottom:0;left:0;right:0;background:#333;color:#fff;padding:10px;text-align:center;font-family:sans-serif;z-index:9999;';
  bar.innerHTML = `
    This site uses cookies for functionality only. 
    <button id="cookie-ok" style="margin-left:10px;padding:5px 10px;">OK</button>
  `;

  document.body.appendChild(bar);

  // Obsługa przycisku
  const okBtn = document.getElementById('cookie-ok');
  okBtn.addEventListener('click', () => {
    bar.style.opacity = '0';
    bar.style.visibility = 'hidden';
    bar.style.transition = 'opacity 0.3s ease';
  });

  console.log('🍪 Pasek cookies pokazany – zwykła przeglądarka');
});
