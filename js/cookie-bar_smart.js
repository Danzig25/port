// cookie-bar_smart.js — dynamiczny pasek cookies, pamięta kliknięcie w normalnych przeglądarkach

document.addEventListener('DOMContentLoaded', async () => {
  const isPrivacyBrowser = async () => {
    try {
      if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
        const result = await navigator.brave.isBrave();
        if (result) return true;
      }
    } catch (_) {}

    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('brave') || navigator.vendor === 'Brave Software, Inc.') return true;

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

  // Sprawdź, czy użytkownik już zaakceptował
  if (localStorage.getItem('cookieAccepted') === '1') {
    console.log('✅ Cookie bar już zaakceptowany wcześniej');
    return;
  }

  // Tworzenie paska cookies
  const bar = document.createElement('div');
  // Zmieniono na dodanie klasy zamiast inline stylów
  bar.className = 'cookie-bar';
  bar.id = 'cookie-bar'; // Zachowanie ID dla kompatybilności
  bar.innerHTML = `
    This site uses cookies for basic functionality only.
    <button id="cookie-ok">OK</button>
  `;

  document.body.appendChild(bar);

  const okBtn = document.getElementById('cookie-ok');
  okBtn.addEventListener('click', () => {
    try {
      localStorage.setItem('cookieAccepted', '1');
    } catch (_) {}
    bar.style.opacity = '0';
    bar.style.visibility = 'hidden';
    bar.style.transition = 'opacity 0.3s ease';
  });

  console.log('🍪 Pasek cookies pokazany – użytkownik jeszcze nie zaakceptował');
});
