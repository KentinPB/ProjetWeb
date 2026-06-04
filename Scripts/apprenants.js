/**
 * =========================================================================
 * GESTION DE LA PROMO ET DE L'AFFICHAGE DES APPRENANTS
 * =========================================================================
 */

// Stocke les données brutes récupérées depuis le fichier JSON de la promo
let promoData = null;

// Ciblage du conteneur HTML principal où la liste ou les cartes seront injectées
const containerSelector = ".apprenants-liste";

/**
 * Récupère le mode d'affichage ("liste" ou "carte") depuis le module préférences.
 * @param {Object} preferencesModule - Le module gérant les choix de l'utilisateur
 * @returns {string} - Le mode d'affichage ("liste" par défaut)
 */
function getAffichage(preferencesModule) {
    if (preferencesModule && typeof preferencesModule.getAffichage === 'function') {
        return preferencesModule.getAffichage();
    }
    return "liste"; // Fallback si le module n'est pas dispo
}

/**
 * Charge de manière asynchrone les données de la promo depuis le fichier JSON.
 */
async function loadData() {
    try {
        const response = await fetch("../Data/promo.json");
        if (!response.ok) {
            throw new Error("Impossible de charger promo.json");
        }
        promoData = await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement du JSON :", error);
        promoData = { apprenants: [] }; // Évite les plantages en cas d'erreur
    }
}

/**
 * Permet d'extraire de manière sécurisée un champ du JSON global.
 */
function getPromoField(key, fallback = undefined) {
    if (!promoData) {
        return fallback;
    }
    if (promoData[key] !== undefined) {
        return promoData[key];
    }
    return promoData.data?.[key] ?? fallback;
}

/**
 * Extrait et retourne proprement le tableau des apprenants.
 * @returns {Array} - Tableau contenant les objets apprenants
 */
function getApprenants() {
    const raw = getPromoField('apprenants', []);
    return Array.isArray(raw) ? raw : [];
}

/**
 * Retourne les métadonnées globales de la promo (nom de promo, dates, etc.).
 */
function getPromoMetadata() {
    return promoData || {};
}

/**
 * Génère le DOM d'une carte apprenant (Mode d'affichage en Trombinoscope / Cartes).
 * @param {Object} apprenant - Données individuelles de l'apprenant
 * @param {number} index - Position dans le tableau pour l'ouverture de la modale
 * @returns {HTMLElement} - Le bloc Div de la carte prêt à être inséré
 */
function createCard(apprenant, index) {
    // Création du conteneur principal de la carte
    const card = document.createElement("div");
    card.className = "apprenant-carte";

    // Gestion sécurisée de l'image (si vide ou absente, utilise le fallback de secours)
    const avatarSrc = (apprenant.avatar && apprenant.avatar.trim()) ? apprenant.avatar : "../Images/avatar.png";
    const avatar = document.createElement("img");
    avatar.className = "apprenant-photo";
    avatar.alt = `${apprenant.prenom || ""} ${apprenant.nom || ""}`;
    avatar.src = avatarSrc;
    
    // Sécurité si l'image définie dans le JSON renvoie une erreur 404
    avatar.onerror = function () {
        if (avatar.src !== "../Images/avatar.png") {
            avatar.src = "../Images/avatar.png"; // Remplacement par l'image par défaut
        } else {
            avatar.style.display = "none"; // Cache complètement l'image si même le défaut échoue
        }
    };
    card.appendChild(avatar);

    // Conteneur interne pour regrouper les informations textuelles
    const infoContainer = document.createElement("div");
    infoContainer.className = "apprenant-info";

    // Nom de famille
    const title = document.createElement("h3");
    title.textContent = apprenant.nom || "";
    title.className = "apprenant-nom";
    infoContainer.appendChild(title);

    // Prénom
    const subtitle = document.createElement("p");
    subtitle.textContent = apprenant.prenom || "";
    subtitle.className = "apprenant-prenom";
    infoContainer.appendChild(subtitle);

    // Bouton pour ouvrir la modale de détails
    const button = document.createElement("button");
    button.type = "button";
    button.className = "apprenant-detail-btn";
    
    // Gestion de la traduction basique du bouton selon la langue HTML courante
    const _docLangBtn = document.documentElement.lang || 'fr';
    button.textContent = _docLangBtn.startsWith('en') ? 'Detail' : 'Détail';
    button.dataset.index = index; // Stocke l'index de l'apprenant dans le DOM
    infoContainer.appendChild(button);

    card.appendChild(infoContainer);
    return card;
}

/**
 * Génère le DOM d'un tableau structuré (Mode d'affichage en Liste).
 * @param {Array} apprenants - Liste de tous les apprenants de la promo
 * @returns {HTMLTableElement} - Le composant Table complet
 */
function createTable(apprenants) {
    const table = document.createElement("table");
    table.className = "apprenants-tableau";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    
    // Détection de la langue du document pour traduire dynamiquement les en-têtes de colonnes
    const _docLang = document.documentElement.lang || 'fr';
    const _isEn = _docLang.startsWith('en');
    const headers = _isEn ? ["Name", "First name", "City", "Detail"] : ["Nom", "Prénom", "Ville", "Détail"];
    
    headers.forEach(function (label) {
        const th = document.createElement("th");
        th.textContent = label;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    apprenants.forEach(function (apprenant, index) {
        const row = document.createElement("tr");

        // Cellule Nom
        const cellNom = document.createElement("td");
        cellNom.textContent = apprenant.nom || "";
        cellNom.setAttribute('data-label', headers[0]); // Requis pour le responsive CSS (téléphones)
        row.appendChild(cellNom);

        // Cellule Prénom
        const cellPrenom = document.createElement("td");
        cellPrenom.textContent = apprenant.prenom || "";
        cellPrenom.setAttribute('data-label', headers[1]);
        row.appendChild(cellPrenom);

        // Cellule Ville
        const cellVille = document.createElement("td");
        cellVille.textContent = apprenant.ville && apprenant.ville.trim() ? apprenant.ville : "???";
        cellVille.setAttribute('data-label', headers[2]);
        row.appendChild(cellVille);

        // Cellule Lien de détails
        const cellDetail = document.createElement("td");
        const lien = document.createElement("a");
        lien.href = "#";
        lien.className = "lien-detail";
        lien.textContent = _isEn ? "Detail" : "Détail";
        lien.dataset.index = index; // Stocke l'index pour l'événement au clic
        cellDetail.appendChild(lien);
        cellDetail.setAttribute('data-label', headers[3]);
        row.appendChild(cellDetail);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    return table;
}

/**
 * Nettoie le conteneur et reconstruit l'affichage selon les préférences sélectionnées.
 */
function render(preferencesModule) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = ""; // Vide la zone avant d'injecter la nouvelle structure
    const apprenants = getApprenants();
    const affichage = getAffichage(preferencesModule);

    // Injection conditionnelle du bon format
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

/**
 * Génère et injecte la structure HTML de la fenêtre modale dans le Body si elle n'existe pas.
 */
function createModal() {
    const existingModal = document.getElementById('apprenant-modal');
    if (existingModal) return; // Évite les doublons de modales

    const modal = document.createElement('div');
    modal.id = 'apprenant-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-body">
                <img id="modal-avatar" class="modal-avatar" src="" alt="">
                <h2 id="modal-nom"></h2>
                <p id="modal-prenom"></p>
                <p id="modal-ville"></p>
                <p id="modal-anecdotes"></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Événement pour fermer la modale lors du clic sur la croix (X)
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    
    // Événement pour fermer la modale si l'utilisateur clique en dehors de la boîte blanche
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

/**
 * Remplit dynamiquement et affiche la modale avec les données de l'apprenant sélectionné.
 * @param {number} index - Index de l'apprenant dans le tableau de la promo
 */
function showModal(index) {
    const apprenants = getApprenants();
    if (index < 0 || index >= apprenants.length) return;

    const apprenant = apprenants[index];
    const modal = document.getElementById('apprenant-modal');
    
    // Sécurité si l'appel est fait avant l'initialisation de la modale dans le DOM
    if (!modal) {
        createModal();
        return showModal(index);
    }

    // Assignation de l'image
    const avatarSrc = (apprenant.avatar && apprenant.avatar.trim()) ? apprenant.avatar : "../Images/avatar.png";
    const modalAvatar = modal.querySelector('#modal-avatar');
    modalAvatar.src = avatarSrc;
    modalAvatar.onerror = function () {
        if (this.src !== "../Images/avatar.png") {
            this.src = "../Images/avatar.png";
        }
    };
    
    // Assignation des textes
    modal.querySelector('#modal-nom').textContent = apprenant.nom || '';
    modal.querySelector('#modal-prenom').textContent = apprenant.prenom || '';
    
    // Traduction de la ville dans la modale
    const _docLangModal = document.documentElement.lang || 'fr';
    const _isEnModal = _docLangModal.startsWith('en');
    modal.querySelector('#modal-ville').textContent = _isEnModal ? `City: ${apprenant.ville || 'Not specified'}` : `Ville: ${apprenant.ville || 'Non spécifiée'}`;
    modal.querySelector('#modal-anecdotes').textContent = apprenant.anecdotes || '';
    
    modal.classList.add('active'); // Active la visibilité de la modale via CSS
}

/**
 * Ferme la fenêtre modale active.
 */
function closeModal() {
    const modal = document.getElementById('apprenant-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Parcourt le DOM généré pour attacher les écouteurs de clics aux boutons et liens "Détail".
 */
function attachDetailListeners() {
    // Écouteurs pour le mode Trombinoscope (Boutons des cartes)
    document.querySelectorAll('.apprenant-detail-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            showModal(parseInt(this.dataset.index));
        });
    });

    // Écouteurs pour le mode Liste (Liens hypertextes du tableau)
    document.querySelectorAll('.lien-detail').forEach(function (lien) {
        lien.addEventListener('click', function (event) {
            event.preventDefault(); // Évite le saut de page lié à l'ancre "#"
            showModal(parseInt(this.dataset.index));
        });
    });
}

/**
 * Point d'entrée principal initialisé au démarrage de la page.
 */
async function init(preferencesModule) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    await loadData();             // 1. Récupération asynchrone des données
    render(preferencesModule);    // 2. Premier rendu graphique de la zone
    attachDetailListeners();      // 3. Liaison des clics pour la modale

    // Écoute les changements globaux de préférences utilisateur (Ex: clic sur bouton radio)
    window.addEventListener('preferences:changed', function () {
        render(preferencesModule);
        attachDetailListeners();
    });
}

// Exportation des modules utilisables à l'extérieur
export { init, render, getApprenants, loadData, getPromoMetadata };