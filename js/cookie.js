function initCookieBar() {
    const cookieBar = document.getElementById('cookie-bar');
    const acceptButton = document.getElementById('accept-cookies');
    const localStorageKey = 'cookiesAccepted';

    if (!cookieBar || !acceptButton) {
        return setTimeout(initCookieBar, 100);
    }

    let isAccepted = false;

    try {
        isAccepted = localStorage.getItem(localStorageKey) === 'true';
    } catch (e) {
        console.warn('Brak dostępu do localStorage:', e);
        // fallback: sprawdź cookie
        isAccepted = document.cookie.includes('cookiesAccepted=true');
    }

    if (isAccepted) {
        cookieBar.style.display = 'none';
        return;
    }

    cookieBar.style.display = 'flex';

    acceptButton.addEventListener('click', () => {
        try {
            localStorage.setItem(localStorageKey, 'true');
        } catch (e) {
            console.warn('Nie można zapisać do localStorage:', e);
        }
        try {
            document.cookie = "cookiesAccepted=true; path=/; max-age=31536000";
        } catch (e) {
            console.warn('Nie można ustawić cookies:', e);
        }
        cookieBar.style.display = 'none';
    });
}

document.addEventListener("DOMContentLoaded", initCookieBar);
