function initCookieBar() {
  const cookieBar = document.getElementById('cookie-bar');
  const acceptButton = document.getElementById('accept-cookies');
  const localStorageKey = 'cookiesAccepted';
  const cookieName = 'cookiesAccepted';

  if (!cookieBar || !acceptButton) {
    return setTimeout(initCookieBar, 100);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  async function isPrivacyBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isBraveUA = userAgent.includes('brave');
    const isBraveVendor = navigator.vendor === 'Brave Software, Inc.';
    if (isBraveUA || isBraveVendor) {
      return true;
    }

    // Heurystyka dla przeglądarek takich jak Mullvad
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
    } catch (e) {
      console.warn('localStorage blocked, assuming privacy browser:', e);
      return true;
    }

    return false;
  }

  isPrivacyBrowser().then((isPrivate) => {
    if (isPrivate) {
      console.log('Prywatna przeglądarka wykryta – pasek cookies NIE zostanie pokazany.');
      cookieBar.style.display = 'none';
      return;
    }

    let isAccepted = false;
    try {
      isAccepted =
        localStorage.getItem(localStorageKey) === 'true' ||
        getCookie(cookieName) === 'true';
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }

    if (isAccepted) {
      cookieBar.style.display = 'none';
      return;
    }

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

document.addEventListener("DOMContentLoaded", initCookieBar);

