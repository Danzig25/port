function initCookieBar() {
  const cookieBar = document.getElementById('cookie-bar');
  const acceptButton = document.getElementById('accept-cookies');
  const cookieName = 'cookiesAccepted';
  const localStorageKey = 'cookiesAccepted';

  if (!cookieBar || !acceptButton) {
    return setTimeout(initCookieBar, 100);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  async function isPrivacyBrowser() {
    // 1. Brave przez isBrave()
    if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
      try {
        const isBrave = await navigator.brave.isBrave();
        if (isBrave) return true;
      } catch (e) {
        // ignoruj
      }
    }

    // 2. Brave przez userAgent/vendor
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('brave') || navigator.vendor === 'Brave Software, Inc.') {
      return true;
    }

    // 3. Mullvad i inne – brak localStorage
    try {
      localStorage.setItem('test_cookie_bar', '1');
      localStorage.removeItem('test_cookie_bar');
    } catch (e) {
      console.warn('localStorage blocked – traktujemy jako przeglądarkę prywatnościową:', e);
      return true;
    }

    return false;
  }

  isPrivacyBrowser().then((isPrivate) => {
    if (isPrivate) {
      console.log('Pasek cookies ukryty – prywatna przeglądarka wykryta (Brave, Mullvad itd).');
      cookieBar.style.display = 'none';
      return;
    }

    // normalne przeglądarki
    let isAccepted = false;
    try {
      isAccepted =
        localStorage.getItem(localStorageKey) === 'true' ||
        getCookie(cookieName) === 'true';
    } catch (e) {
      console.warn('Brak dostępu do storage:', e);
    }

    if (isAccepted) {
      cookieBar.style.display = 'none';
      return;
    }

    // Pokaż pasek
    cookieBar.style.display = 'flex';

    acceptButton.addEventListener('click', () => {
      try {
        localStorage.setItem(localStorageKey, 'true');
      } catch (e) {}

      try {
        document.cookie = `${cookieName}=true; path=/; max-age=31536000; samesite=Lax`;
      } catch (e) {}

      cookieBar.style.display = 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', initCookieBar);
