function initCookieNotice() {
    const cookieBox = document.getElementById('cb-box');
    const acceptBtn = document.getElementById('cb-ok');

    if (!cookieBox || !acceptBtn) {
        return setTimeout(initCookieNotice, 100);
    }

    cookieBox.style.visibility = 'visible';
    cookieBox.style.opacity = '1';
    cookieBox.style.transition = 'all 0.5s ease';

    acceptBtn.addEventListener('click', () => {
        cookieBox.style.opacity = '0';
        cookieBox.style.visibility = 'hidden';
    });
}

document.addEventListener("DOMContentLoaded", initCookieNotice);
