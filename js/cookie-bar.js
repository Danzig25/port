async function isBraveBrowser() {
  return navigator.brave && await navigator.brave.isBrave?.();
}

function isMullvadBrowser() {
  return navigator.userAgent.includes('Mullvad');
}

async function initCookieBar() {
  const brave = await isBraveBrowser();
  const mullvad = isMullvadBrowser();

  // Nie pokazuj paska w Brave i Mullvad
  if (brave || mullvad) {
    console.log("Brave lub Mullvad wykryty – pasek cookies nie zostanie pokazany.");
    return;
  }

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

  if (isAcc
