// Données de la promo qui seront chargées depuis promo.json
let promoData = null;

// Conteneur HTML où seront affichés les apprenants
const containerSelector = ".apprenants-liste";

// Récupère le mode d'affichage choisi dans le module préférences
function getAffichage(preferencesModule) {
    if (preferencesModule && typeof preferencesModule.getAffichage === 'function') {
        return preferencesModule.getAffichage();
    }
    return "liste";
}

// Charge les apprenants depuis le fichier JSON de la promo
async function loadData() {
    try {
        const response = await fetch("../Data/promo.json");
        if (!response.ok) {
            throw new Error("Impossible de charger promo.json");
        }
        promoData = await response.json();
    } catch (error) {
        console.error(error);
        promoData = { apprenants: [] };
    }
}

// Retourne le tableau d'apprenants ou un tableau vide si aucune donnée
function getApprenants() {
    return (promoData && promoData.apprenants) ? promoData.apprenants : [];
}

// Crée une carte HTML pour un apprenant (affichage en mode carte)
function createCard(apprenant, index) {
    const card = document.createElement("div");
    card.className = "apprenant-carte";

    const avatarSrc = (apprenant.avatar && apprenant.avatar.trim()) ? apprenant.avatar : "../Images/avatar.png";
    const avatar = document.createElement("img");
    avatar.className = "apprenant-photo";
    avatar.alt = `${apprenant.prenom || ""} ${apprenant.nom || ""}`;
    avatar.src = avatarSrc;
    avatar.onerror = function () {
        if (avatar.src !== "../Images/avatar.png") {
            avatar.src = "../Images/avatar.png";
        } else {
            avatar.style.display = "none";
        }
    };
    card.appendChild(avatar);

    const title = document.createElement("h3");
    title.textContent = apprenant.nom || "";
    title.className = "apprenant-nom";
    card.appendChild(title);

    const subtitle = document.createElement("p");
    subtitle.textContent = apprenant.prenom || "";
    subtitle.className = "apprenant-prenom";
    card.appendChild(subtitle);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "apprenant-detail-btn";
    button.textContent = "Détail";
    button.dataset.index = index;
    card.appendChild(button);

    return card;
}

// Crée un tableau HTML pour afficher les apprenants en mode liste
function createTable(apprenants) {
    const table = document.createElement("table");
    table.className = "apprenants-tableau";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Nom", "Prénom", "Ville", "Détail"].forEach(function (label) {
        const th = document.createElement("th");
        th.textContent = label;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    apprenants.forEach(function (apprenant, index) {
        const row = document.createElement("tr");

        const cellNom = document.createElement("td");
        cellNom.textContent = apprenant.nom || "";
        row.appendChild(cellNom);

        const cellPrenom = document.createElement("td");
        cellPrenom.textContent = apprenant.prenom || "";
        row.appendChild(cellPrenom);

        const cellVille = document.createElement("td");
        cellVille.textContent = apprenant.ville && apprenant.ville.trim() ? apprenant.ville : "???";
        row.appendChild(cellVille);

        const cellDetail = document.createElement("td");
        const lien = document.createElement("a");
        lien.href = "#";
        lien.className = "lien-detail";
        lien.textContent = "Détail";
        lien.dataset.index = index;
        cellDetail.appendChild(lien);
        row.appendChild(cellDetail);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    return table;
}

function render(preferencesModule) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        return;
    }

    container.innerHTML = "";
    const apprenants = getApprenants();
    const affichage = getAffichage(preferencesModule);

    if (affichage === "liste") {
        container.classList.add("affichage-liste");
        container.classList.remove("affichage-carte");
        container.appendChild(createTable(apprenants));
    } else {
        container.classList.add("affichage-carte");
        container.classList.remove("affichage-liste");
        apprenants.forEach(function (apprenant, index) {
            container.appendChild(createCard(apprenant, index));
        });
    }
}

async function init(preferencesModule) {
    await loadData();
    render(preferencesModule);

    // réagir aux changements de préférences
    window.addEventListener('preferences:changed', function () {
        render(preferencesModule);
    });
}

export { init, render, getApprenants };