const storage = window.localStorage;
const formSelector = ".preferences-form";
const affichageRadiosSelector = 'input[name="affichage"]';

function getTheme() {
    return storage.getItem("theme") || "auto";
}

function getLangue() {
    return storage.getItem("langue") || "fr";
}

function getAffichage() {
    return storage.getItem("affichage") || "liste";
}

function setTheme(value) {
    storage.setItem("theme", value);
}

function setLangue(value) {
    storage.setItem("langue", value);
}

function setAffichage(value) {
    storage.setItem("affichage", value);
}

function setDefaults() {
    if (!storage.getItem("theme")) {
        storage.setItem("theme", "auto");
    }
    if (!storage.getItem("langue")) {
        storage.setItem("langue", "fr");
    }
    if (!storage.getItem("affichage")) {
        storage.setItem("affichage", "liste");
    }
}

function updateAffichageRadios(value) {
    document.querySelectorAll(affichageRadiosSelector).forEach(function (radio) {
        radio.checked = radio.value === value;
    });
}

function applyPreferences() {
    const theme = getTheme();
    const affichage = getAffichage();

    if (theme === "sombre" || (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    const apprenantsList = document.querySelector(".apprenants-liste");
    if (apprenantsList) {
        if (affichage === "carte") {
            apprenantsList.classList.add("affichage-carte");
            apprenantsList.classList.remove("affichage-liste");
        } else {
            apprenantsList.classList.add("affichage-liste");
            apprenantsList.classList.remove("affichage-carte");
        }
    }

    updateAffichageRadios(affichage);
}

function fillPreferencesForm() {
    const theme = getTheme();
    const langue = getLangue();
    const affichage = getAffichage();

    const themeSelect = document.getElementById("theme");
    const langueSelect = document.getElementById("langue");
    if (themeSelect) {
        themeSelect.value = theme;
    }
    if (langueSelect) {
        langueSelect.value = langue;
    }
    updateAffichageRadios(affichage);
}

function setupAffichageListeners() {
    document.querySelectorAll(affichageRadiosSelector).forEach(function (radio) {
        radio.addEventListener("change", function () {
            setAffichage(radio.value);
            applyPreferences();
            // caller should re-render apprenants if needed
            const event = new CustomEvent('preferences:changed', { detail: { type: 'affichage', value: radio.value } });
            window.dispatchEvent(event);
        });
    });
}

function setupFormListener() {
    const form = document.querySelector(formSelector);
    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const themeValue = document.getElementById("theme").value;
        const langueValue = document.getElementById("langue").value;
        const affichageValue = document.querySelector(affichageRadiosSelector + ":checked").value;

        setTheme(themeValue);
        setLangue(langueValue);
        setAffichage(affichageValue);

        applyPreferences();
        const eventUpdate = new CustomEvent('preferences:changed', { detail: { type: 'form', value: affichageValue } });
        window.dispatchEvent(eventUpdate);
    });
}

function init() {
    setDefaults();
    applyPreferences();
    fillPreferencesForm();
    setupAffichageListeners();
    setupFormListener();
}

export { init, applyPreferences, getAffichage };