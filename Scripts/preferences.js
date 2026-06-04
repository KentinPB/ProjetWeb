/**
 * =========================================================================
 * MODULE DE GESTION DES PRÉFÉRENCES (THEME, LANGUE, LOCALSTORAGE)
 * =========================================================================
 */

// Clé unique pour stocker l'objet des configurations dans le LocalStorage du navigateur
const STORAGE_KEY = "promoPreferences";

// Configuration par défaut appliquée si l'utilisateur n'a encore rien enregistré
const defaultPreferences = {
    theme: "auto",
    langue: "francais",
    affichage: "liste"
};

// Dictionnaire contenant l'intégralité des traductions du site (FR / EN)
const translations = {
    francais: {
        lang: "fr", // Code de langue officiel pour l'attribut HTML lang
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
            "informations.durationPattern": "Formation du {0} au {1}",
            "informations.count": "Nombre d'apprenants : 23",
            "informations.countPattern": "Nombre d'apprenants : {0}",
            "informations.promoDescription": "Formation de développeur web et mobile à l'ENI Ecole Informatique",
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
            "informations.durationPattern": "Training from {0} to {1}",
            "informations.count": "Number of students: 23",
            "informations.countPattern": "Number of students: {0}",
            "informations.promoDescription": "Web and mobile developer training at ENI Computer School",
            "informations.description.title": "Training description :",
            "informations.description.text1": "The EDWM2605FT training is an intensive 6-month program (including 2 months of internship) that aims to train competent and versatile web developers. Students acquire skills in front-end and back-end development, as well as project management. The training includes theoretical courses, practical workshops and real projects to prepare students for a successful career in web development.",
            "informations.description.text2": "Students work on concrete projects throughout the training, which allows them to build a solid portfolio and prepare to enter the job market. The training also emphasizes communication and teamwork skills, essential for success in the web development field.",
            "informations.description.text3": "In addition to technical skills, students benefit from personalized support to help them reach their professional goals. The EDWM2605FT training is designed to meet the needs of the job market and to prepare students for a successful career in web development.",
            "informations.description.text4": "In summary, the EDWM2605FT training offers a complete and immersive learning experience that prepares students to become competent and versatile web developers, ready to take on the challenges of the job market.",
            "informations.links.title": "Useful links :",
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

/**
 * Récupère les préférences depuis le LocalStorage avec sécurisation et fallback.
 * @returns {Object} - Un objet contenant le thème, la langue et le type d'affichage
 */
function getPreferences() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        return { ...defaultPreferences }; // Retourne une copie par défaut si vide
    }
    try {
        const parsed = JSON.parse(stored);
        // On fusionne avec les valeurs par défaut en cas de données partielles manquantes
        return {
            theme: parsed.theme || defaultPreferences.theme,
            langue: parsed.langue || defaultPreferences.langue,
            affichage: parsed.affichage || defaultPreferences.affichage
        };
    } catch (error) {
        // En cas de JSON corrompu ou invalide dans le stockage, on réinitialise proprement
        console.warn("Préférences invalides dans le stockage, réinitialisation.", error);
        return { ...defaultPreferences };
    }
}

/**
 * Enregistre les préférences dans le LocalStorage et propage l'information dans l'application.
 * @param {Object} preferences - Le nouvel objet de préférences à stocker
 */
function savePreferences(preferences) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    // Émission d'un événement global personnalisé pour informer les autres scripts du changement
    window.dispatchEvent(new CustomEvent('preferences:changed', { detail: preferences }));
}

/**
 * Raccourci pour lire uniquement la valeur courante du format d'affichage.
 */
function getAffichage() {
    return getPreferences().affichage;
}

/**
 * Applique graphiquement le thème (Clair / Sombre) sur le document.
 * @param {string} theme - "clair", "sombre" ou "auto"
 */
function applyTheme(theme) {
    // Évalue si le mode sombre doit être activé (si forcé ou si "auto" match la préférence système)
    const isDarkMode = theme === "sombre" || 
                       (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDarkMode) {
        document.body.classList.add("dark-mode"); // Classe CSS gérant les variables de couleurs sombres
    } else {
        document.body.classList.remove("dark-mode");
    }
}

/**
 * Traduit dynamiquement tous les éléments textuels de la page courante dotés des attributs i18n.
 * @param {string} langue - "francais" ou "anglais"
 */
function applyLanguage(langue) {
    // Sélection du dictionnaire approprié
    const locale = translations[langue] ? translations[langue] : translations.francais;
    
    // Modification de l'attribut lang natif de la page (<html lang="fr/en">)
    document.documentElement.lang = locale.lang;

    // --- Traduction des textes standards (boutons, titres, paragraphes) ---
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((element) => {
        const key = element.getAttribute('data-i18n');
        if (key && locale.strings[key]) {
            element.textContent = locale.strings[key];
        }
    });

    // --- Traduction des valeurs d'inputs (ex: texte d'un bouton de validation) ---
    const valueElements = document.querySelectorAll('[data-i18n-value]');
    valueElements.forEach((element) => {
        const key = element.getAttribute('data-i18n-value');
        if (key && locale.strings[key]) {
            element.value = locale.strings[key];
        }
    });

    // --- Mise à jour du titre de l'onglet du navigateur selon le dictionnaire ---
    const titleKey = getPageTitleKey();
    if (locale.strings[titleKey]) {
        document.title = locale.strings[titleKey];
    }
}

/**
 * Permet d'extraire de manière isolée une chaîne traduite précise.
 */
function getTranslation(langue, key) {
    const locale = translations[langue] ? translations[langue] : translations.francais;
    return locale.strings[key] || '';
}

/**
 * Analyse l'URL actuelle du navigateur pour déterminer sur quelle page se trouve l'utilisateur.
 * @returns {string} - La clé du dictionnaire de traduction correspondant à la page
 */
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
    return "title.index"; // Fallback par défaut sur l'index
}

/**
 * Pré-remplit les éléments de formulaire de la page préférences avec les valeurs actuellement sauvegardées.
 * @param {Object} preferences - Les préférences utilisateur actuelles
 */
function setPreferenceInputs(preferences) {
    // Sélection et calage du menu déroulant Thème
    const themeSelect = document.querySelector('#theme');
    if (themeSelect) {
        themeSelect.value = preferences.theme;
    }

    // Sélection et calage du menu déroulant Langue
    const langueSelect = document.querySelector('#langue');
    if (langueSelect) {
        langueSelect.value = preferences.langue;
    }

    // Sélection et coche du bouton radio d'Affichage actif
    const affichageRadio = document.querySelector(`input[name="affichage"][value="${preferences.affichage}"]`);
    if (affichageRadio) {
        affichageRadio.checked = true;
    }
}

/**
 * Parcourt le formulaire HTML pour collecter les choix de l'utilisateur.
 * @returns {Object} - Un objet préférences frais prêt à être sauvegardé
 */
function collectFormPreferences() {
    const theme = document.querySelector('#theme')?.value || defaultPreferences.theme;
    const langue = document.querySelector('#langue')?.value || defaultPreferences.langue;
    const affichage = document.querySelector('input[name="affichage"]:checked')?.value || defaultPreferences.affichage;
    return { theme, langue, affichage };
}

/**
 * Initialisation au chargement de la page : lit les préférences, les applique,
 * et configure l'écouteur du formulaire de soumission s'il est présent sur la page.
 */
function init() {
    const preferences = getPreferences();
    
    // Application immédiate des configurations graphiques au chargement
    applyTheme(preferences.theme);
    applyLanguage(preferences.langue);
    setPreferenceInputs(preferences);

    // Recherche de la présence du formulaire sur la page (uniquement présent sur preferences.html)
    const form = document.querySelector('.preferences-form');
    if (!form) {
        return; // Arrêt si on se situe sur une autre page que celle des configurations
    }

    // Écoute de la soumission (clic sur Enregistrer)
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Stoppe le rechargement natif de la page
        const newPreferences = collectFormPreferences(); // Extraction
        
        savePreferences(newPreferences);       // Stockage dans le LocalStorage
        applyTheme(newPreferences.theme);     // Application visuelle immédiate
        applyLanguage(newPreferences.langue);   // Traduction immédiate
    });
}

/**
 * Permet de modifier à la volée une ou plusieurs préférences de manière externe (ex: depuis l'index).
 * @param {Object} preferences - Un objet partiel (ex: { affichage: 'carte' })
 * @returns {Object} - Le nouvel objet préférences mis à jour
 */
function applyPreferences(preferences) {
    const current = getPreferences();
    const updated = {
        ...current,
        ...preferences // Écrase les anciennes clés par les nouvelles transmises
    };
    savePreferences(updated);
    
    // Application ciblée des changements graphiques provoqués
    if (preferences.theme) {
        applyTheme(updated.theme);
    }
    if (preferences.langue) {
        applyLanguage(updated.langue);
    }
    return updated;
}

// Exportation des modules essentiels pour le reste de l'application
export { init, applyPreferences, getAffichage, getTranslation };