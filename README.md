# 🎓 Projet Trombinoscope & Carte Interactive — Promo EDWM2605FT

Ce projet a été conçu et développé de A à Z dans le cadre de la formation **DWWM (Développeur Web et Web Mobile)** à l'**ENI École Informatique**. 

L'objectif principal de cette application est de mettre en pratique et de consolider les fondamentaux du développement web front-end natif : **HTML5, CSS3 et JavaScript (Vanilla)**, sans faire appel à des frameworks externes (comme React ou Bootstrap). Le projet propose d'explorer les profils des apprenants de la promotion via un affichage hybride (liste/cartes) et une carte géographique interactive.

---

## 💻 Compétences Techniques Démontrées

### 🧱 HTML5 : Sémantique et Accessibilité
* **Structuration sémantique :** Utilisation des balises appropriées (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`) pour garantir un code lisible et accessible.
* **Gestion des attributs de données :** Utilisation intensive des attributs `data-*` (ex: `data-i18n`, `data-index`, `data-label`) pour créer un pont solide entre le HTML, le CSS et le JavaScript.
* **Intégration d'éléments riches :** Mise en place d'une fenêtre modale (pop-up) nativement intégrée dans le flux du document.
* **Accessibilité de la modale :** `role="dialog"`, `aria-modal`, bouton de fermeture avec `aria-label`, fermeture par la touche Échap et retour du focus clavier sur le bouton « Détail ».

### 🎨 CSS3 : Design Adaptatif et Thémisation
* **Variables CSS (Custom Properties) :** Définition des couleurs, typographies et espacements via `:root` pour faciliter la maintenance et la création du thème sombre.
* **Responsive Design :** Utilisation des **Media Queries** (`@media`) pour adapter l'interface aux smartphones, tablettes et écrans larges. La mise en page a été conçue d'abord pour ordinateur, puis adaptée aux petits écrans (`max-width`).
  * *Technique avancée :* Restructuration complète du tableau HTML sur les petits écrans. Les lignes (`<tr>`) deviennent des cartes empilées, et les en-têtes sont générés dynamiquement via la propriété `content: attr(data-label)` pour éviter que le tableau ne casse la mise en page.
* **Flexbox & Grid :** Alignement dynamique des éléments et création de la grille de cartes du trombinoscope.

### ⚡ JavaScript (Vanilla ES6) : Logique et Asynchronisme
* **Modules ES6 :** Découpage du code en plusieurs fichiers logiques (`apprenants.js`, `preferences.js`, `map.js`) utilisant les instructions `import` et `export` pour une architecture propre.
* **Programmation Asynchrone (Fetch API) :** Utilisation de `async` et `await` pour requêter et parser le fichier `promo.json` contenant les données des 23 apprenants, afin d'injecter dynamiquement le contenu dans le DOM.
* **Manipulation du DOM :** Création d'éléments HTML à la volée (`document.createElement`), gestion des classes CSS (`classList.add/remove`) et injection sécurisée des données textuelles.
* **Web Storage API :** Utilisation du `localStorage` pour sauvegarder de manière persistante les préférences de l'utilisateur (choix de la langue, du thème et du mode d'affichage).
* **Internationalisation (i18n) :** Création d'un mini-moteur de traduction traduisant dynamiquement le texte de la page (Français/Anglais) en parcourant un dictionnaire d'objets JS.

---

## 🚀 Fonctionnalités Clés

1. **Double Affichage Dynamique :** Bascule instantanée entre un affichage "Tableau" ou "Grille de cartes" sans rechargement de la page.
2. **Fenêtre Modale Interactive :** Affichage des détails et des anecdotes de chaque apprenant au clic sur son profil.
3. **Cartographie Leaflet :** Intégration de l'API open-source Leaflet pour placer automatiquement les apprenants sur une carte selon leurs coordonnées GPS issues du fichier JSON.
4. **Paramètres Utilisateur Sauvegardés :** Les réglages de langue et de thème (clair/sombre) sont conservés d'une session à l'autre.

---

## 📁 Structure des Fichiers

```text
ProjetWeb/
├── Data/
│   └── promo.json              # Base de données (Infos, avatars, géolocalisation)
├── HTML/
│   ├── index.html              # Trombinoscope principal
│   ├── carte.html              # Affichage de la carte
│   ├── informations.html       # Informations sur la promo
│   └── preferences.html        # Préférences (langue, thème, affichage)
├── Images/
│   ├── Avatar
│   │    └── NOM Prenom.jpg    # Avatars utilisés pour les cartes
│   ├── avatar.png             # Avatar par défaut si aucun n'est défini
│   └── logo.png               # Logo de l'école
├── Scripts/
│   ├── main.js                 # Point d'entrée, coordonne les modules
│   ├── preferences.js          # Gère le LocalStorage, l'i18n et les thèmes
│   ├── apprenants.js           # Gère le rendu HTML dynamique et la modale
│   └── map.js                  # Initialise la carte interactive Leaflet
└── Styles/
    ├── style.css               # Variables CSS globales et typographie
    ├── index.css               # Mise en page du tableau (responsive) et des cartes
    ├── carte.css               # Styles du conteneur Leaflet
    └── ...                     # Autres fichiers CSS spécifiques aux vues

---

## ▶️ Lancer le projet

Les données sont chargées avec `fetch()`, qui ne fonctionne pas en ouvrant directement le fichier (`file://`). Il faut passer par un serveur web local, par exemple :

* l'extension **Live Server** de VS Code, en ouvrant `HTML/index.html` ;
* ou, depuis la racine du projet : `php -S localhost:8000`, puis `http://localhost:8000/HTML/index.html`.
