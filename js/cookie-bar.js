document.addEventListener('DOMContentLoaded', () => {
    const cookieBar = document.getElementById('cookie-bar');
    const acceptButton = document.getElementById('accept-cookies');
    const localStorageKey = 'cookiesAccepted';

    const checkCookiesAccepted = () => {
        return localStorage.getItem(localStorageKey) === 'true';
    };

    const hideCookieBar = () => {
        cookieBar.classList.add('hidden');
    };

    if (checkCookiesAccepted()) {
        hideCookieBar();
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem(localStorageKey, 'true');
        hideCookieBar();
    });
});