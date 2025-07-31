function initCookieBar() {
  const cookieBar = document.getElementById('cookie-bar');
  const acceptButton = document.getElementById('accept-cookies');
  const localStorageKey = 'cookiesAccepted';
  const cookieName = 'cookiesAccepted';
  const sessionStorageKey = 'cookiesAcceptedSession';

  if (!cookieBar || !acceptButton) {
    return setTimeout(initCookieBar, 100);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // Sprawdź, czy użytkownik już zaakceptował cookies
  let isAccepted = false;
  try {
    isAccepted =
      localStorage.getItem(localStorageKey) === 'true' ||
      getCookie(cookieName) === 'true' ||
      sessionStorage.getItem(sessionStorageKey) === 'true';
  } catch (e) {
    console.warn('Storage niedostępny:', e);
  }

  if (isAccepted) {
    cookieBar.style.display = 'none';
    return;
  }

  // Pokaż pasek, jeśli cookies nie zostały jeszcze zaakceptowane
  cookieBar.style.display = 'flex';

  acceptButton.addEventListener('click', () => {
    try {
      localStorage.setItem(localStorageKey, 'true');
    } catch (e) {}

    try {
      // Ustaw cookie na rok (31536000 sekund)
      document.cookie = `${cookieName}=true; path=/; max-age=31536000; samesite=Lax`;
    } catch (e) {}

    try {
      sessionStorage.setItem(sessionStorageKey, 'true');
    } catch (e) {}
    
    // Ukryj pasek po kliknięciu
    cookieBar.style.display = 'none';
  });
}

document.addEventListener("DOMContentLoaded", initCookieBar);