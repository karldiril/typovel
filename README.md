# ⌨️ Typovel

[![Live Demo](https://img.shields.io/badge/Live-typovel.com-success)](https://typovel.com)
[![Tech Stack](https://img.shields.io/badge/Stack-Vanilla_JS_|_HTML5_|_CSS3-blue)](https://github.com/karldiril/typovel)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Typovel** est un moteur de dactylographie web haute performance, développé entièrement en JavaScript Vanilla. Inspiré par les standards du genre comme Monkeytype, Typovel se concentre sur une expérience de frappe fluide, minimaliste, et techniquement irréprochable.

🌍 **Essayer le projet en direct : [typovel.com](https://typovel.com)**

---

## 🎮 Fonctionnalités

*   **Mesure de performance en temps réel :** Calcul algorithmique du WPM (Mots Par Minute) et de la précision globale de l'utilisateur.
*   **Moteur de frappe intelligent :** Prise en charge des corrections complexes, incluant le retour en arrière (Backspace) avec verrouillage des mots validés et retour sur les mots erronés.
*   **Rendu dynamique :** Coloration syntaxique instantanée des lettres (correctes, incorrectes, en surplus) sans latence.
*   **Design minimaliste :** Interface utilisateur épurée pour maximiser la concentration.

---

## 🏗 Architecture du projet

L'application est structurée de manière modulaire, séparant strictement la logique métier de l'interface graphique :

```text
typovel/
├── frontend/           # Application Web
│   ├── assets/         # Ressources statiques (images, polices)
│   ├── css/            
│   │   ├── game.css    # Styles spécifiques à l'interface de jeu
│   │   └── style.css   # Styles globaux et page d'accueil
│   ├── js/             
│   │   ├── engine.js   # Cœur du moteur (Logique métier Stateless)
│   │   ├── gameUI.js   # Gestion du DOM et des événements en jeu
│   │   ├── main.js     # Contrôleur principal de l'application
│   │   └── ui.js       # Composants d'interface génériques
│   ├── game.html       # Vue de la session de dactylographie
│   ├── index.html      # Vue principale / Landing page
│   └── wip.html        # Environnement de test (Work in Progress)
├── .vscode/            # Configuration de l'éditeur
├── .gitignore          # Fichiers ignorés par Git
├── LICENSE             # Licence MIT
└── README.md           # Documentation du projet