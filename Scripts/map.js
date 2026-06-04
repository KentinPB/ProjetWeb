/**
 * =========================================================================
 * INITIALISATION ET GESTION DE LA CARTE INTERACTIVE (LEAFLET)
 * =========================================================================
 */

// Importation des fonctions de gestion de données du module apprenants
import { loadData, getPromoMetadata, getApprenants } from './apprenants.js';

// Création de l'instance de carte Leaflet rattachée à la div ID 'map' et centrage initial sur Paris [Lat, Lng], Zoom 12
let map = L.map('map').setView([48.8566, 2.3522], 12);

// Chargement des tuiles graphiques de fond de carte OpenStreetMap (Version gratuite alternative à Google Maps)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors' // Mention légale obligatoire OSM
}).addTo(map);

/**
 * Fonction maîtresse asynchrone chargeant les données JSON pour peupler la carte de marqueurs (pins).
 */
async function initializeMap() {
    try {
        // 1. Récupération asynchrone des données de la promo
        await loadData();
        const promoMeta = getPromoMetadata();
        const promoName = promoMeta.nom_promo || promoMeta.nom || '';

        // --- Gestion dynamique des titres de la page selon le nom de la promo ---
        if (promoName) {
            const pageTitle = document.querySelector('.page-title');
            if (pageTitle) {
                pageTitle.textContent = promoName; // Injecte le nom de promo dans le header H1
            }
            // Concatène le nom de la promo devant le titre de l'onglet actuel du navigateur
            document.title = promoName ? `${promoName} - ${document.title}` : document.title;
        }

        const markers = []; // Tableau technique pour stocker les marqueurs créés
        const apprenants = getApprenants(); // Récupération de la liste complète des apprenants

        // 2. Parcours du tableau des apprenants pour placer les épingles géographiques
        apprenants.forEach(apprenant => {
            // Extraction et conversion forcée des coordonnées en nombres flottants décimaux
            const lat = parseFloat(apprenant.coordonnees?.latitude);
            const lng = parseFloat(apprenant.coordonnees?.longitude);

            // Sécurité : si les coordonnées sont absentes, corrompues ou égales à NaN, on ignore l'apprenant
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
                return; // Passe à l'apprenant suivant sans bloquer le script
            }

            // Création de l'épingle sur la carte, liaison d'une popup au clic, et stockage dans notre tableau
            markers.push(
                L.marker([lat, lng])
                    .addTo(map)
                    // Texte HTML affiché à l'intérieur de la bulle lors d'un clic sur l'épingle
                    .bindPopup(`<b>${apprenant.nom || ''}</b> ${apprenant.prenom || ''}`)
            );
        });

        // 3. RECADRAGE AUTOMATIQUE DU ZOOM DE LA CARTE (Auto-fit)
        // Permet d'ajuster automatiquement la vue de la carte pour afficher TOUTES les épingles en même temps
        if (markers.length > 0) {
            // Crée un groupe virtuel regroupant l'intégralité de nos points géographiques
            const group = L.featureGroup(markers);
            
            // Ordonne à Leaflet de calculer la zone d'affichage maximale englobant le groupe
            // Ajoute un padding de sécurité de 40 pixels aux bordures pour éviter de coller les pins aux bords de l'écran
            map.fitBounds(group.getBounds(), { padding: [40, 40] });
        }
    } catch (error) {
        // Capture des erreurs réseau ou fichiers manquants pour éviter le crash complet de la page
        console.error('Impossible de récupérer les données des apprenants pour la carte :', error);
    }
}

// Lancement automatique du script de cartographie dès le chargement du fichier JS
initializeMap();