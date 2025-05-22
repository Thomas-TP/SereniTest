# Bilan Mental Express - Application Web

Ceci est une application web front-end pour "Bilan Mental Express", un outil de check-up mental quotidien.

## Aperçu

Le site est construit avec React, TypeScript, et Tailwind CSS. Il est conçu comme une page unique (one-page) avec plusieurs sections présentant l'application, ses fonctionnalités, ses cibles, et ses offres. Un chatbot simple, basé sur des réponses prédéfinies, est également intégré côté client pour l'assistance.

## Structure du Projet

Le projet a été initialisé avec `create_react_app` (un script personnalisé qui utilise Vite et configure Tailwind).

-   `/public`: Contient les actifs statiques et `index.html`.
-   `/src`: Contient le code source de l'application.
    -   `/src/assets`: Pour les images et autres médias.
    -   `/src/components`: Contient les composants React réutilisables (Header, Footer, sections spécifiques, Chatbot, etc.).
    -   `/src/App.tsx`: Le composant principal de l'application qui assemble les différentes sections.
    -   `/src/main.tsx`: Le point d'entrée de l'application React.
    -   `/src/App.css`: Styles globaux et animations personnalisées (utilisant Tailwind CSS).
    -   `/src/index.css`: Styles de base de Tailwind.
-   `tailwind.config.js`: Configuration de Tailwind CSS.
-   `vite.config.ts`: Configuration de Vite.
-   `package.json`: Dépendances du projet et scripts.

## Scripts Disponibles

Dans le répertoire du projet, vous pouvez exécuter :

### `pnpm install`

Installe les dépendances du projet.

### `pnpm run dev`

Lance l'application en mode développement.
Ouvrez [http://localhost:5173](http://localhost:5173) (ou le port indiqué par Vite) pour la visualiser dans le navigateur.

La page se rechargera si vous faites des modifications.
Vous verrez également les erreurs de lint dans la console.

### `pnpm run build`

Construit l'application pour la production dans le dossier `dist`.
Il optimise la construction pour les meilleures performances.

Votre application est prête à être déployée !

## Contribution

Ce projet est géré par Manus, un agent IA.

## Remerciements

Basé sur le contenu fourni dans `MENTAL.pdf`.
