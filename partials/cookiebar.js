(function () {
  const cookieKey = "cookieAccepted";
  if (localStorage.getItem(cookieKey) === "true") return;

  const lang = navigator.language.startsWith("de") ? "de" : "pl";
  const barId = `cookiebar-${lang}`;
  const btnId = `accept-cookies-${lang}`;

  const bar = document.getElementById(barId);
  const btn = document.getElementById(btnId);

  if (bar && btn) {
    bar.style.display = "block";
    btn.addEventListener("click", () => {
      localStorage.setItem(cookieKey, "true");
      bar.style.display = "none";
    });
  }
})();
