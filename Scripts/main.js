// Import des modules qui gèrent les préférences et la liste des apprenants
import { init as initPreferences, applyPreferences, getAffichage } from './preferences.js';
import { init as initApprenants } from './apprenants.js';

// Attendre que la page soit complètement chargée avant d'initialiser
document.addEventListener("DOMContentLoaded", function () {
    // Initialiser les préférences utilisateur
    initPreferences();

    // Initialiser la liste des apprenants en passant la fonction de choix d'affichage
    initApprenants({ getAffichage });
});
