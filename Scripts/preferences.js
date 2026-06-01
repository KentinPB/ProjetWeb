const STORAGE_KEY = "promoPreferences";
const defaultPreferences = {
    theme: "auto",
    langue: "francais",
    affichage: "liste"
};

const translations = {
    francais: {
        lang: "fr",
        strings: {
            "title.preferences": "Page de préférences",
            "title.index": "Page d'accueil",
            "title.informations": "Page d'informations",
            "title.carte": "Page de carte",
            "nav.home": "Accueil",
            "nav.preferences": "Préférences",
            "nav.carte": "Carte",
            "nav.informations": "Informations",
            "footer": "© 2026 Promo EDWM2605FT. Tous droits réservés.",
            "index.heading": "Liste des apprenants",
            "index.radio.liste": "Liste",
            "index.radio.carte": "Carte",
            "preferences.heading": "Préférences du site",
            "preferences.description": "Cette page est dédiée aux préférences du site. Vous pouvez personnaliser votre expérience en choisissant les options qui vous conviennent le mieux. Que ce soit pour le thème, la langue ou les notifications, nous avons tout prévu pour que vous puissiez profiter pleinement de notre site. N'hésitez pas à explorer les différentes options et à ajuster les paramètres selon vos besoins. Votre confort et votre satisfaction sont notre priorité.",
            "preferences.labelTheme": "Choisissez un thème :",
            "preferences.theme.clair": "Clair",
            "preferences.theme.sombre": "Sombre",
            "preferences.theme.auto": "Automatique",
            "preferences.labelLangue": "Choisissez une langue :",
            "preferences.langue.francais": "Français",
            "preferences.langue.anglais": "Anglais",
            "preferences.labelAffichage": "Format d'affichage de la liste des apprenants :",
            "preferences.affichage.liste": "Liste",
            "preferences.affichage.carte": "Carte",
            "preferences.btnRetour": "Retour à l'accueil",
            "preferences.btnSave": "Enregistrer les préférences",
            "informations.heading": "INFORMATIONS GÉNÉRALES",
            "informations.duration": "Formation du 04/05/2026 au 31/10/2026",
            "informations.count": "Nombre d'apprenants : 23",
            "informations.description.title": "Description de la formation :",
            "informations.description.text1": "La formation EDWM2605FT est une formation intensive de 6 mois (dont 2 mois de stage) qui vise à former des développeurs web compétents et polyvalents. Les apprenants acquièrent des compétences en développement front-end et back-end, ainsi qu'en gestion de projets web. La formation comprend des cours théoriques, des ateliers pratiques et des projets réels pour préparer les apprenants à une carrière réussie dans le domaine du développement web.",
            "informations.description.text2": "Les apprenants travaillent sur des projets concrets tout au long de la formation, ce qui leur permet de développer un portfolio solide et de se préparer à entrer sur le marché du travail. La formation met également l'accent sur les compétences en communication et en travail d'équipe, essentielles pour réussir dans le domaine du développement web.",
            "informations.description.text3": "En plus des compétences techniques, les apprenants bénéficient d'un accompagnement personnalisé pour les aider à atteindre leurs objectifs professionnels. La formation EDWM2605FT est conçue pour répondre aux besoins du marché du travail et pour préparer les apprenants à une carrière réussie dans le développement web.",
            "informations.description.text4": "En résumé, la formation EDWM2605FT offre une expérience d'apprentissage complète et immersive qui prépare les apprenants à devenir des développeurs web compétents et polyvalents, prêts à relever les défis du marché du travail.",
            "informations.links.title": "Liens utiles :",
            "informations.category.training": "Sites de formation",
            "informations.category.documentation": "Documentation",
            "informations.category.interactive": "Apprentissage interactif",
            "informations.link.trainingPage": "Page de la formation",
            "informations.link.codecademy": "Codecademy",
            "informations.link.freecodecamp": "freeCodeCamp",
            "informations.link.scrimba": "Scrimba",
            "informations.link.mdn": "MDN Web Docs",
            "informations.link.devdocs": "DevDocs",
            "informations.link.w3schools": "W3Schools",
            "informations.link.csstips": "CSS-Tricks",
            "informations.link.flexboxfroggy": "Flexbox Froggy",
            "informations.link.cssdiner": "CSS Diner",
            "informations.link.javascript30": "JavaScript 30",
            "button.back": "Retour à l'accueil",
            "carte.heading": "Carte"
        }
    },
    anglais: {
        lang: "en",
        strings: {
            "title.preferences": "Preferences Page",
            "title.index": "Home Page",
            "title.informations": "Information Page",
            "title.carte": "Map Page",
            "nav.home": "Home",
            "nav.preferences": "Preferences",
            "nav.carte": "Map",
            "nav.informations": "Information",
            "footer": "© 2026 Promo EDWM2605FT. All rights reserved.",
            "index.heading": "Student list",
            "index.radio.liste": "List",
            "index.radio.carte": "Card",
            "preferences.heading": "Site preferences",
            "preferences.description": "This page is dedicated to site preferences. You can personalize your experience by choosing the options that suit you best. Whether it is theme, language or notifications, we have everything ready so you can fully enjoy our site. Feel free to explore the different options and adjust the settings according to your needs. Your comfort and satisfaction are our priority.",
            "preferences.labelTheme": "Choose a theme:",
            "preferences.theme.clair": "Light",
            "preferences.theme.sombre": "Dark",
            "preferences.theme.auto": "Automatic",
            "preferences.labelLangue": "Choose a language:",
            "preferences.langue.francais": "French",
            "preferences.langue.anglais": "English",
            "preferences.labelAffichage": "Display format for the student list:",
            "preferences.affichage.liste": "List",
            "preferences.affichage.carte": "Card",
            "preferences.btnRetour": "Back to home",
            "preferences.btnSave": "Save preferences",
            "informations.heading": "GENERAL INFORMATION",
            "informations.duration": "Training from 04/05/2026 to 31/10/2026",
            "informations.count": "Number of students: 23",
            "informations.description.title": "Training description:",
            "informations.description.text1": "The EDWM2605FT training is an intensive 6-month program (including 2 months of internship) that aims to train competent and versatile web developers. Students acquire skills in front-end and back-end development, as well as project management. The training includes theoretical courses, practical workshops and real projects to prepare students for a successful career in web development.",
            "informations.description.text2": "Students work on concrete projects throughout the training, which allows them to build a solid portfolio and prepare to enter the job market. The training also emphasizes communication and teamwork skills, essential for success in the web development field.",
            "informations.description.text3": "In addition to technical skills, students benefit from personalized support to help them reach their professional goals. The EDWM2605FT training is designed to meet the needs of the job market and to prepare students for a successful career in web development.",
            "informations.description.text4": "In summary, the EDWM2605FT training offers a complete and immersive learning experience that prepares students to become competent and versatile web developers, ready to take on the challenges of the job market.",
            "informations.links.title": "Useful links:",
            "informations.category.training": "Training sites",
            "informations.category.documentation": "Documentation",
            "informations.category.interactive": "Interactive learning",
            "informations.link.trainingPage": "Training page",
            "informations.link.codecademy": "Codecademy",
            "informations.link.freecodecamp": "freeCodeCamp",
            "informations.link.scrimba": "Scrimba",
            "informations.link.mdn": "MDN Web Docs",
            "informations.link.devdocs": "DevDocs",
            "informations.link.w3schools": "W3Schools",
            "informations.link.csstips": "CSS-Tricks",
            "informations.link.flexboxfroggy": "Flexbox Froggy",
            "informations.link.cssdiner": "CSS Diner",
            "informations.link.javascript30": "JavaScript 30",
            "button.back": "Back to home",
            "carte.heading": "Map"
        }
    }
};

function getPreferences() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        return { ...defaultPreferences };
    }
    try {
        const parsed = JSON.parse(stored);
        return {
            theme: parsed.theme || defaultPreferences.theme,
            langue: parsed.langue || defaultPreferences.langue,
            affichage: parsed.affichage || defaultPreferences.affichage
        };
    } catch (error) {
        console.warn("Préférences invalides dans le stockage, réinitialisation.", error);
        return { ...defaultPreferences };
    }
}

function savePreferences(preferences) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    window.dispatchEvent(new CustomEvent('preferences:changed', { detail: preferences }));
}

function getAffichage() {
    return getPreferences().affichage;
}

function applyLanguage(langue) {
    const locale = translations[langue] ? translations[langue] : translations.francais;
    document.documentElement.lang = locale.lang;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((element) => {
        const key = element.getAttribute('data-i18n');
        if (key && locale.strings[key]) {
            element.textContent = locale.strings[key];
        }
    });

    const valueElements = document.querySelectorAll('[data-i18n-value]');
    valueElements.forEach((element) => {
        const key = element.getAttribute('data-i18n-value');
        if (key && locale.strings[key]) {
            element.value = locale.strings[key];
        }
    });

    const titleKey = getPageTitleKey();
    if (locale.strings[titleKey]) {
        document.title = locale.strings[titleKey];
    }
}

function getPageTitleKey() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("préférences.html") || path.includes("preferences.html")) {
        return "title.preferences";
    }
    if (path.includes("informations.html")) {
        return "title.informations";
    }
    if (path.includes("carte.html")) {
        return "title.carte";
    }
    if (path.includes("index.html") || path.endsWith("/")) {
        return "title.index";
    }
    return "title.index";
}

function setPreferenceInputs(preferences) {
    const themeSelect = document.querySelector('#theme');
    if (themeSelect) {
        themeSelect.value = preferences.theme;
    }

    const langueSelect = document.querySelector('#langue');
    if (langueSelect) {
        langueSelect.value = preferences.langue;
    }

    const affichageRadio = document.querySelector(`input[name="affichage"][value="${preferences.affichage}"]`);
    if (affichageRadio) {
        affichageRadio.checked = true;
    }
}

function collectFormPreferences() {
    const theme = document.querySelector('#theme')?.value || defaultPreferences.theme;
    const langue = document.querySelector('#langue')?.value || defaultPreferences.langue;
    const affichage = document.querySelector('input[name="affichage"]:checked')?.value || defaultPreferences.affichage;
    return { theme, langue, affichage };
}

function init() {
    const preferences = getPreferences();
    applyLanguage(preferences.langue);
    setPreferenceInputs(preferences);

    const form = document.querySelector('.preferences-form');
    if (!form) {
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const newPreferences = collectFormPreferences();
        savePreferences(newPreferences);
        applyLanguage(newPreferences.langue);
    });
}

function applyPreferences(preferences) {
    const current = getPreferences();
    const updated = {
        ...current,
        ...preferences
    };
    savePreferences(updated);
    applyLanguage(updated.langue);
    return updated;
}

export { init, applyPreferences, getAffichage };