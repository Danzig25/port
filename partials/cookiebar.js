function initCookieBar() {
  const bar = document.querySelector('.cookie-bar');
  if (!bar) return;

  const acceptButtons = document.querySelectorAll('#accept-cookies-pl, #accept-cookies-de');

  if (localStorage.getItem('cookiesAccepted')) {
    bar.style.display = 'none';
    return;
  }

  acceptButtons.forEach(button => {
    button.addEventListener('click', function () {
      localStorage.setItem('cookiesAccepted', 'true');
      bar.style.display = 'none';
    });
  });

  const userLang = navigator.language || navigator.userLanguage;
  const langPl = document.querySelector('[lang="pl"]');
  const langDe = document.querySelector('[lang="de"]');

  if (userLang.startsWith('de')) {
    langPl.style.display = 'none';
    langDe.style.display = 'block';
  } else {
    langPl.style.display = 'block';
    langDe.style.display = 'none';
  }
}