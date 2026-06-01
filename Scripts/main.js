// Import des modules qui gèrent les préférences et la liste des apprenants
import { init as initPreferences, applyPreferences, getAffichage } from './preferences.js';
import { init as initApprenants } from './apprenants.js';

function initIndexAffichage() {
    const affichageInputs = document.querySelectorAll('input[name="affichage"]');
    if (!affichageInputs.length) {
        return;
    }

    affichageInputs.forEach((input) => {
        input.addEventListener('change', (event) => {
            const value = event.target.value;
            applyPreferences({ affichage: value });
        });
    });
}

// Attendre que la page soit complètement chargée avant d'initialiser
document.addEventListener("DOMContentLoaded", function () {
    // Initialiser les préférences utilisateur
    initPreferences();

    // Initialiser la liste des apprenants en passant la fonction de choix d'affichage
    initApprenants({ getAffichage });

    // Si la page contient les contrôles d'affichage, activer le changement direct
    initIndexAffichage();
});
