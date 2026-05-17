document.addEventListener('DOMContentLoaded', () => {
  // Initialize Language Settings
  initLanguage();
});

// Internationalized Page Metadata
const metaData = {
  fr: {
    title: "Systeme.io — Lancez votre activité digitale gratuitement depuis une seule plateforme",
    description: "Créez vos pages de capture, collectez des emails, envoyez vos campagnes et vendez vos produits digitaux depuis un seul outil, sans complexité et avec une offre gratuite pour commencer."
  },
  ar: {
    title: "Systeme.io — ابدأ نشاطك الرقمي مجانًا من منصة واحدة",
    description: "أنشئ صفحات الهبوط، اجمع الإيميلات، أرسل الحملات، وبع منتجاتك الرقمية من أداة واحدة، بدون تعقيد وبخطة مجانية للبدء."
  }
};

// Manage Language Preferences and Switching
function initLanguage() {
  const html = document.documentElement;
  
  // 1. Detect Initial Language (saved preference or default to French)
  let savedLang = localStorage.getItem('systeme_io_landing_lang');
  
  if (!savedLang) {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('ar')) {
      savedLang = 'ar';
    } else {
      savedLang = 'fr';
    }
  }

  // 2. Set the initial attributes on HTML
  const initialDir = savedLang === 'ar' ? 'rtl' : 'ltr';
  html.setAttribute('lang', savedLang);
  html.setAttribute('dir', initialDir);
  
  // 3. Update Title & Meta Description
  updateDocumentMeta(savedLang);

  // 4. Highlight the correct toggle segment
  updateLangToggleUI(savedLang);
}

// Set active language and apply transitions
window.setLanguage = function(lang) {
  const html = document.documentElement;
  const currentLang = html.getAttribute('lang');
  
  // Prevent redundant switching if language is already active
  if (currentLang === lang) return;

  const newDir = lang === 'ar' ? 'rtl' : 'ltr';

  // Premium fade out transition
  document.body.classList.add('switching-lang');
  
  setTimeout(() => {
    // Switch lang and dir attributes
    html.setAttribute('lang', lang);
    html.setAttribute('dir', newDir);
    
    // Update Title and Meta tags
    updateDocumentMeta(lang);

    // Update active class on segment buttons
    updateLangToggleUI(lang);
    
    // Persist language choice
    localStorage.setItem('systeme_io_landing_lang', lang);
    
    // Fade back in
    document.body.classList.remove('switching-lang');
  }, 120);
};

// Dynamically updates Title and Meta Description tag
function updateDocumentMeta(lang) {
  const data = metaData[lang];
  if (data) {
    document.title = data.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', data.description);
    }
  }
}

// Synchronizes the visual active state of the segment switcher
function updateLangToggleUI(lang) {
  const frBtns = document.querySelectorAll('.fr-btn');
  const arBtns = document.querySelectorAll('.ar-btn');
  
  if (lang === 'fr') {
    frBtns.forEach(btn => btn.classList.add('active'));
    arBtns.forEach(btn => btn.classList.remove('active'));
  } else {
    arBtns.forEach(btn => btn.classList.add('active'));
    frBtns.forEach(btn => btn.classList.remove('active'));
  }
}
