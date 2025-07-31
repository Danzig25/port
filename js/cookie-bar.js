document.addEventListener('DOMContentLoaded', () => {
    const cookieBar = document.getElementById('cookie-bar');
    const acceptButton = document.getElementById('accept-cookies');
    const localStorageKey = 'cookiesAccepted';

    const checkCookiesAccepted = () => {
        // Sprawdzamy, czy użytkownik zaakceptował ciasteczka w localStorage
        return localStorage.getItem(localStorageKey) === 'true';
    };

    const hideCookieBar = () => {
        if (cookieBar) {
            cookieBar.style.display = 'none';
        }
    };

    // Sprawdzamy stan ciasteczek od razu po załadowaniu strony
    if (checkCookiesAccepted()) {
        hideCookieBar();
    } else {
        // Jeśli nie zaakceptowano, upewniamy się, że pasek jest widoczny
        if (cookieBar) {
            cookieBar.style.display = 'flex';
        }
    }

    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            // Zapisujemy akceptację w localStorage
            localStorage.setItem(localStorageKey, 'true');
            // Ukrywamy pasek
            hideCookieBar();
        });
    }
});