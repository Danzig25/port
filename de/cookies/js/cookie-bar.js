function initCookieBar() {
    const cookieBar = document.getElementById('cookie-bar');
    const acceptButton = document.getElementById('accept-cookies');
    const localStorageKey = 'cookiesAccepted';

    if (!cookieBar || !acceptButton) {
        return setTimeout(initCookieBar, 100);
    }

    const isAccepted = localStorage.getItem(localStorageKey) === 'true';

    if (isAccepted) {
        cookieBar.style.display = 'none';
        return;
    }

    cookieBar.style.display = 'flex';

    acceptButton.addEventListener('click', () => {
        localStorage.setItem(localStorageKey, 'true');
        cookieBar.style.display = 'none';
    });
}

initCookieBar();
