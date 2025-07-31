function initCookieBar() {
  const cookieBar = document.getElementById('cookie-bar');
  const acceptButton = document.getElementById('accept-cookies');
  const localStorageKey = 'cookiesAccepted';

  if (!cookieBar || !acceptButton) {
    return setTimeout(initCookieBar, 100);
  }

  // domyślnie: działanie normalne
  let hardcoreMode = false;

  // wykrywanie Brave
  if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
    navigator.brave.isBrave().then((isBrave) => {
      hardcoreMode = isBrave;
      startLogic(hardcoreMode);
    });
  } else {
    startLogic(hardcoreMode);
  }

  function startLogic(hardcore) {
    if (hardcore) {
      // Brave – tryb hardcore: brak zapisu
      cookieBar.style.display = 'flex';
      acceptButton.addEventListener('click', () => {
        cookieBar.style.display = 'none';
      });
    } else {
      // Normalne przeglądarki – localStorage + cookies + sessionStorage
      let isAccepted = false;
      try {
        isAccepted =
          localStorage.getItem(localStorageKey) === 'true' ||
          document.cookie.includes('cookiesAccepted=true') ||
          sessionStorage.getItem('cookiesAcceptedSession') === 'true';
      } catch (e) {
        console.warn('Storage niedostępny:', e);
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
          document.cookie = "cookiesAccepted=true; path=/; max-age=31536000";
        } catch (e) {}
        try {
          sessionStorage.setItem('cookiesAcceptedSession', 'true');
        } catch (e) {}
        cookieBar.style.display = 'none';
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", initCookieBar);
