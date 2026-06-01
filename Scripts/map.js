// Création de la carte Leaflet et centrage initial sur Paris
let map = L.map('map').setView([48.8566, 2.3522], 12);

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Chargement des données de la promo depuis le fichier JSON
fetch('../Data/promo.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau lors de la récupération du JSON');
        }
        return response.json();
    })
    .then(data => {
        const markers = [];
        const apprenants = data.apprenants || [];

        // Parcours des apprenants et ajout d'un marqueur pour chacun
        apprenants.forEach(apprenant => {
            const lat = parseFloat(apprenant.coordonnees?.latitude);
            const lng = parseFloat(apprenant.coordonnees?.longitude);

            // Ignorer les entrées sans coordonnées valides
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
                return;
            }

            markers.push(
                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(`${apprenant.nom || ''} ${apprenant.prenom || ''}`)
            );
        });

        // Si au moins un marqueur a été créé, ajuster la vue pour l'afficher
        if (markers.length > 0) {
            const group = L.featureGroup(markers);
            map.fitBounds(group.getBounds(), { padding: [40, 40] });
        }
    })
    .catch(error => {
        console.error('Impossible de récupérer les données des apprenants :', error);
    });
