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
    // 1. Direct Brave detection
    if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
      try {
        const isBrave = await navigator.brave.isBrave();
        if (isBrave) {
          return true;
        }
      } catch (e) {
        console.warn('Error during Brave detection:', e);
      }
    }

    // 2. User-Agent string check (as an additional check for Brave)
    if (navigator.userAgent.includes('Brave')) {
      return true;
    }
    
    // 3. Heuristic for browsers that block storage (like Mulvad)
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
    } catch (e) {
      // If we can't use localStorage, assume it's a privacy-focused browser
      console.warn('Storage blocked, assuming privacy browser:', e);
      return true;
    }

    return false;
  }

  isPrivacyBrowser().then((isPrivate) => {
    if (isPrivate) {
      cookieBar.style.display = 'none';
      return;
    }

    // Normal logic for other browsers
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