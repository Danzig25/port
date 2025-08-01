
document.addEventListener('DOMContentLoaded', async () => {
  const isPrivacyBrowser = async () => {
    try {
      if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
        const result = await navigator.brave.isBrave();
        if (result) return true;
      }
    } catch (_) {}

    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('brave') || navigator.vendor === 'Brave Software, Inc.') return true;

    try {
      localStorage.setItem('privacy_test', '1');
      localStorage.removeItem('privacy_test');
    } catch (_) {
      return true;
    }

    return false;
  };

  const isPrivate = await isPrivacyBrowser();

  if (isPrivate) {
    console.log('🔒 Prywatna przeglądarka – usuwam pasek cookies');
    return;
  }

  if (!localStorage.getItem('cookies-accepted')) {
    const bar = document.createElement('div');
    bar.className = 'cookie-bar';

    bar.innerHTML = \`
      Ta strona używa plików cookie, by zapewnić najlepsze wrażenia.
      <button id="accept-cookies">Akceptuję</button>
    \`;

    document.body.appendChild(bar);

    document.getElementById('accept-cookies').addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'true');
      bar.remove();
    });
  }
});
