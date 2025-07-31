function initCookieBar() {
  const cookieBar = document.getElementById('cookie-bar');
  const acceptButton = document.getElementById('accept-cookies');
  const localStorageKey = 'cookiesAccepted';

  if (!cookieBar || !acceptButton) {
    return setTimeout(initCookieBar, 100);
  }

  // Funkcja do wykrywania Brave i podobnych przeglądarek
  async function isPrivacyBrowser() {
    // Wykrywanie Brave
    if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
      try {
        const isBrave = await navigator.brave.isBrave();
        if (isBrave) {
          return true;
        }
      } catch (e) {
        console.warn('Błąd wykrywania Brave:', e);
      }
    }
    
    // Prosta heurystyka dla innych przeglądarek z silnymi blokadami (jak Mulvad)
    // Sprawdza, czy localStorage jest dostępny i czy da się w nim zapisać dane
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
    } catch (e) {
        // Jeśli localStorage jest niedostępny lub blokowany, uznajemy przeglądarkę za "prywatną"
        return true;
    }

    return false;
  }

  // Uruchomienie logiki po sprawdzeniu przeglądarki
  isPrivacyBrowser().then((isPrivate) => {
    if (isPrivate) {
      // Jeśli przeglądarka jest "prywatna", ukrywamy pasek całkowicie
      cookieBar.style.display = 'none';
      return;
    }

    // Normalna logika dla pozostałych przeglądarek
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
  });
}

document.addEventListener("DOMContentLoaded", initCookieBar);