function initCookieBar() {
  const cookieBar = document.getElementById('cookie-bar');
  const acceptButton = document.getElementById('accept-cookies');
  const cookieName = 'cookiesAccepted';

  if (!cookieBar || !acceptButton) {
    // Elementy jeszcze się nie załadowały – spróbuj ponownie za chwilę
    return setTimeout(initCookieBar, 100);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  // Sprawdzenie, czy użytkownik już zaakceptował ciasteczka
  const isAccepted = getCookie(cookieName) === 'true';

  if (isAccepted) {
    // Jeśli zaakceptowane – ukryj pasek
    cookieBar.style.display = 'none';
    return;
  }

  // W przeciwnym razie – pokaż pasek
  cookieBar.style.display = 'flex';

  // Obsługa kliknięcia przycisku "Akceptuję"
  acceptButton.addEventListener('click', () => {
    // Ustaw ciasteczko ważne przez 1 rok
    try {
      document.cookie = `${cookieName}=true; path=/; max-age=31536000; samesite=Lax`;
    } catch (e) {
      console.warn('Nie udało się zapisać ciasteczka:', e);
    }

    // Ukryj pasek natychmiast
    cookieBar.style.display = 'none';
  });
}

// Uruchom po załadowaniu DOM
document.addEventListener('DOMContentLoaded', initCookieBar);
