i18next.init({
  lng: localStorage.getItem("lang") || "ht", // default to Creole
  resources: {
    en: {
      translation: {
        home: "Home",
        archive: "Archive",
        about: "About",
        contact: "Contact",
        footer: "Life is like a box of chocolates..."
      }
    },
    ht: {
      translation: {
        home: "Lakay",
        archive: "Achiv",
        about: "Sou nou",
        contact: "Kontak",
        footer: "Lavi se tankou yon bwat chokola..."
      }
    }
  }
}, function(err, t) {
  document.querySelector('[data-i18n="home"]').textContent = t('home');
  document.querySelector('[data-i18n="archive"]').textContent = t('archive');
  document.querySelector('[data-i18n="about"]').textContent = t('about');
  document.querySelector('[data-i18n="contact"]').textContent = t('contact');
  document.querySelector('[data-i18n="footer"]').textContent = t('footer');
});

function changeLanguage(lng) {
  localStorage.setItem("lang", lng);
  location.reload();
}
