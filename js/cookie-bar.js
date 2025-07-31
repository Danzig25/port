// cookie-bar.js
document.addEventListener('DOMContentLoaded', initCookieBar);

async function initCookieBar() {
  const cookieBar = document.getElementById('cookie-bar');
  const acceptButton = document.getElementById('accept-cookies');

  if (!cookieBar || !acceptButton) {
    console.warn('⚠️ Brak elementów cookieBar lub acceptButton');
    return setTimeout(initCookieBar, 100);
  }

  const isPrivacyBrowser = await checkPrivacyBrowser();

  if (isPrivacyBrowser) {
    console.log('🔒 Prywatna przeglądarka wykryta – usuwam pasek cookies');
    cookieBar.remove(); // trwałe usunięcie paska
    return;
  }

  const cookiesAccepted =
    localStorage.getItem('cookiesAccepted') === 'true' ||
    document.cookie.includes('cookiesAccepted=true');

  if (cookiesAccepted) {
    console.log('✅ Ciasteczka wcześniej zaakceptowane – usuwam pasek');
    cookieBar.remove();
    return;
  }

  console.log('🍪 Wyświetlam pasek cookies');
  cookieBar.style.display = 'flex';

  acceptButton.addEventListener('click', () => {
    try {
      localStorage.setItem('cookiesAccepted', 'true');
      document.cookie = 'cookiesAccepted=true; path=/; max-age=31536000; samesite=Lax';
    } catch (err) {
      console.warn('❌ Błąd przy zapisie ciasteczek:', err);
    }

    cookieBar.remove();
  });
}

async function checkPrivacyBrowser() {
  // Brave przez navigator.brave
  if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
    try {
      const isBrave = await navigator.brave.isBrave();
      if (isBrave) return true;
    } catch (_) {}
  }

  // Brave przez UA/vendor
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('brave') || navigator.vendor === 'Brave Software, Inc.') {
    return true;
  }

  // Mullvad i inne – brak localStorage
  try {
    localStorage.setItem('test_cookie_privacy', '1');
    localStorage.removeItem('test_cookie_privacy');
  } catch (err) {
    console.warn('🛡️ localStorage zablokowane – uznaję za prywatnościową:', err);
    return true;
  }

  return false;
}
