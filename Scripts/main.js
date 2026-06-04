/**
 * =========================================================================
 * GESTION ET INITIALISATION DE LA PAGE D'ACCUEIL (INDEX / PROMO)
 * =========================================================================
 */

// Importation des modules gérant les préférences utilisateur et la liste des apprenants
import { init as initPreferences, applyPreferences, getAffichage, getTranslation } from './preferences.js';
import { init as initApprenants, loadData, getPromoMetadata, getApprenants } from './apprenants.js';

/**
 * Initialise les écouteurs d'événements sur les boutons radios de changement d'affichage.
 * Permet de basculer instantanément entre le mode "carte" et le mode "liste".
 */
function initIndexAffichage() {
    // Sélection de tous les inputs radio nommés "affichage"
    const affichageInputs = document.querySelectorAll('input[name="affichage"]');
    if (!affichageInputs.length) {
        return; // Quitte la fonction si les boutons radios ne sont pas présents sur la page actuelle
    }

    // Ajout d'un écouteur de changement ('change') sur chaque bouton radio
    affichageInputs.forEach((input) => {
        input.addEventListener('change', (event) => {
            const value = event.target.value; // Récupère la valeur ("liste" ou "carte")
            applyPreferences({ affichage: value }); // Sauvegarde et applique la nouvelle préférence
        });
    });
}

/**
 * Formate une chaîne de date ISO (AAAA-MM-JJ) au format localisé (JJ-MM-AAAA ou MM-JJ-AAAA).
 * @param {string} isoDate - La date brute issue du fichier JSON
 * @returns {string} - La date formatée ou la chaîne originale si invalide
 */
function formatDate(isoDate) {
    const date = new Date(isoDate);
    // Sécurité : si la chaîne n'est pas une date valide, on retourne le texte brut
    if (Number.isNaN(date.getTime())) {
        return isoDate;
    }
    
    // Extraction du jour, mois et année avec ajout d'un zéro initial si nécessaire (ex: "05")
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 car les mois commencent à 0 en JS
    const year = date.getFullYear();
    
    // Vérification de la langue pour appliquer le format US (MM-JJ-AAAA) ou FR (JJ-MM-AAAA)
    const isEnglish = document.documentElement.lang.startsWith('en');
    return isEnglish ? `${month}-${day}-${year}` : `${day}-${month}-${year}`;
}

/**
 * Récupère les métadonnées de la promo (JSON) et met à jour dynamiquement les textes de la page.
 */
async function initPromoInfo() {
    // Ciblage des éléments d'affichage présents dans le HTML
    const pageTitle = document.querySelector('.page-title');
    const formationDate = document.querySelector('.formation-date');
    const nbrApprenants = document.querySelector('.nbr-apprenants');

    // Si aucun de ces éléments n'est trouvé, inutile de continuer l'exécution
    if (!pageTitle && !formationDate && !nbrApprenants) {
        return;
    }

    // Attente du chargement asynchrone des données du fichier JSON
    await loadData();
    const metadata = getPromoMetadata(); // Récupération des infos globales de la promo

    // --- 1. MISE À JOUR DU TITRE DE LA PROMO ---
    const promoName = metadata.nom_promo || metadata.nom || '';
    if (promoName && pageTitle) {
        pageTitle.textContent = promoName; // Injecte le nom dans le titre principal de la page
    }
    if (promoName) {
        const baseTitle = document.title || "";
        // Met à jour la balise <title> de l'onglet du navigateur sans écraser le reste
        document.title = `${promoName} - ${baseTitle}`.trim();
    }

    // --- 2. MISE À JOUR DES DATES DE FORMATION ---
    if (formationDate) {
        const dateDebut = metadata.date_debut;
        const dateFin = metadata.date_fin;
        if (dateDebut && dateFin) {
            // Détermination de la clé de traduction linguistique
            const languageKey = document.documentElement.lang.startsWith('en') ? 'anglais' : 'francais';
            
            // Récupère le modèle textuel traduit ou utilise un modèle de secours par défaut
            const pattern = getTranslation(languageKey, 'informations.durationPattern') || (languageKey === 'anglais'
                ? 'Training from {0} to {1}'
                : 'Formation du {0} au {1}');
                
            // Remplace les balises de position {0} et {1} par les dates formatées
            formationDate.textContent = pattern
                .replace('{0}', formatDate(dateDebut))
                .replace('{1}', formatDate(dateFin));
        }
    }

    // --- 3. MISE À JOUR DU NOMBRE D'APPRENANTS ---
    if (nbrApprenants) {
        // Récupère le compte pré-calculé du JSON, sinon compte la taille du tableau des apprenants
        const count = metadata.nombre_apprenants ?? getApprenants().length;
        const languageKey = document.documentElement.lang.startsWith('en') ? 'anglais' : 'francais';
        
        // Récupère le modèle textuel traduit ou applique le fallback textuel
        const pattern = getTranslation(languageKey, 'informations.countPattern') || (languageKey === 'anglais'
            ? 'Number of students: {0}'
            : "Nombre d'apprenants : {0}");
            
        nbrApprenants.textContent = pattern.replace('{0}', count);
    }

    // --- 4. MISE À JOUR DE LA DESCRIPTION DE LA PROMO ---
// --- 4. MISE À JOUR DE LA DESCRIPTION DE LA PROMO ---
if (metadata.description) {
    // On cible le conteneur qui possède la classe 'description-liens'
    const descriptionContainer = document.querySelector('.description-liens'); 
    if (descriptionContainer) {
        // On cherche ou crée le paragraphe DANS ce conteneur
        let promoDescription = descriptionContainer.querySelector('.promo-description');
        if (!promoDescription) {
            promoDescription = document.createElement('h2');
            promoDescription.className = 'promo-description';
            // On l'insère au début du bloc description-liens
            descriptionContainer.insertBefore(promoDescription, descriptionContainer.firstChild);
        }
        
        const languageKey = document.documentElement.lang.startsWith('en') ? 'anglais' : 'francais';
        const translatedDescription = getTranslation(languageKey, 'informations.promoDescription') || metadata.description;
        promoDescription.textContent = translatedDescription;
    }
}
}

/**
 * ÉVENEMENT PRINCIPAL : Attend le chargement complet du DOM (HTML) avant d'exécuter le script.
 */
document.addEventListener("DOMContentLoaded", async function () {
    // 1. Initialisation et application des préférences (Thème, Langue, Affichage)
    initPreferences();
    
    // 2. Chargement et affichage des données générales de la promo
    await initPromoInfo();

    // 3. Initialise le module d'affichage des apprenants uniquement si la zone de liste existe
    if (document.querySelector('.apprenants-liste')) {
        initApprenants({ getAffichage });
    }

    // 4. Active la surveillance des changements sur les boutons radios de la page d'accueil
    initIndexAffichage();

    // 5. Écoute l'événement personnalisé pour rafraîchir les textes si l'utilisateur change de langue
    window.addEventListener('preferences:changed', async () => {
        await initPromoInfo();
    });
});