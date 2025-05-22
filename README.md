# serenitest - Application Web

## Présentation

Bilan Mental Express est une application web front-end conçue pour permettre aux utilisateurs d'effectuer un bilan rapide de leur état mental, d'obtenir des suggestions personnalisées et de trouver des ressources utiles. Ce projet a été développé avec React, TypeScript, et Tailwind CSS, en mettant l'accent sur une expérience utilisateur de haute qualité, des animations fluides et un design responsive.

Le site s'inspire des meilleures pratiques en matière de design web moderne et vise à offrir une interface intuitive et engageante pour aborder le sujet important du bien-être mental.

**Lien vers le dépôt GitHub :** [https://github.com/Thomas-TP/Bilan-mental-app](https://github.com/Thomas-TP/Bilan-mental-app)

## Fonctionnalités Clés

1.  **Design Premium et Animations :**
    *   Interface utilisateur soignée et moderne, inspirée par des sites de référence comme `ciaokombucha.com`.
    *   Palette de couleurs harmonisée avec les logos fournis (tons `Vert Espoir`, `Craie Douce`, `Nuit Sereine`, `Encre Profonde`, `Bleu Confiance`).
    *   Animations fluides et transitions subtiles sur les éléments de page et au défilement pour une expérience dynamique.
    *   Utilisation de polices de caractères modernes et lisibles (`Poppins` pour les titres, `Open Sans` pour le corps du texte).

2.  **Bilan Mental Interactif :**
    *   Un questionnaire de 7 questions évaluant différents aspects du bien-être (énergie, sommeil, humeur, concentration, stress, relations, satisfaction).
    *   Calcul d'un score global et affichage de résultats avec des messages personnalisés et encourageants.
    *   Suggestions d'actions concrètes basées sur le score obtenu.

3.  **Recommandation de Professionnels (Simulation) :**
    *   Section "Trouver un Soutien Professionnel" permettant aux utilisateurs de rechercher des professionnels de la santé mentale.
    *   Intégration de la géolocalisation du navigateur (avec consentement de l'utilisateur) pour suggérer une ville.
    *   Champ de saisie manuelle pour rechercher par ville.
    *   Affichage d'une liste simulée de professionnels (nom, spécialité, adresse, contact) basée sur la localisation. *Note : En l'absence d'API publique exhaustive et directement utilisable, cette fonctionnalité utilise actuellement des données simulées à des fins de démonstration.*

4.  **Chatbot Amélioré :**
    *   Assistant virtuel accessible via une icône flottante.
    *   Réponses plus contextuelles, empathiques et engageantes.
    *   Capacité à comprendre des questions plus variées sur l'application, le bien-être général, et à offrir un soutien de base.
    *   Suggestions de questions pour guider l'utilisateur.
    *   Interface du chatbot revue pour s'intégrer au design premium du site.

5.  **Sections de Contenu Enrichies :**
    *   **Accueil (Hero Section) :** Présentation impactante de l'application.
    *   **Le Problème :** Contexte sur l'importance de la santé mentale.
    *   **Notre Solution :** Comment Bilan Mental Express répond au besoin.
    *   **Le Bilan :** Accès au questionnaire interactif.
    *   **Tableau de Bord Personnel (Placeholder) :** Espace prévu pour un futur suivi personnalisé.
    *   **Des Clés pour Votre Quotidien :** Suggestions concrètes pour améliorer le bien-être.
    *   **Coach IA (Vision) :** Présentation d'une future fonctionnalité de coaching par IA.
    *   **Données Passives (Vision) :** Idées pour une future analyse de données passives.
    *   **Personas Cibles :** À qui s'adresse l'application.
    *   **Notre Vision :** Ambitions à long terme du projet.
    *   **Notre Modèle Économique :** Transparence sur les offres gratuites et futures options premium.
    *   **Pied de Page (Footer) :** Liens utiles et informations de copyright, avec intégration du logo.

6.  **Technique :**
    *   Développé avec React (Vite), TypeScript.
    *   Stylisé avec Tailwind CSS, configuré avec la nouvelle palette de couleurs et les polices personnalisées.
    *   Code structuré en composants réutilisables.
    *   Responsive design pour une adaptation sur ordinateurs, tablettes et mobiles.
    *   Fichier `.gitignore` configuré pour exclure les dépendances et fichiers de build.

## Installation et Lancement Local

Pour lancer le projet en local, suivez ces étapes :

1.  **Clonez le dépôt :**
    ```bash
    git clone https://github.com/Thomas-TP/Bilan-mental-app.git
    cd Bilan-mental-app
    ```

2.  **Installez les dépendances :**
    Assurez-vous d'avoir Node.js et pnpm (ou npm/yarn) installés.
    ```bash
    pnpm install 
    # ou npm install / yarn install
    ```

3.  **Lancez le serveur de développement :**
    ```bash
    pnpm run dev
    # ou npm run dev / yarn dev
    ```
    L'application devrait être accessible sur `http://localhost:5173` (ou un port similaire indiqué dans la console).

4.  **Pour construire la version de production :**
    ```bash
    pnpm run build
    # ou npm run build / yarn build
    ```
    Les fichiers statiques seront générés dans le dossier `dist`.

## Structure du Projet (Principaux Dossiers)

```
Bilan-mental-app/
├── public/ # Fichiers statiques (favicon, etc.)
├── src/
│   ├── assets/ # Images, logos
│   ├── components/ # Composants React réutilisables (Header, Footer, Sections, Chatbot, etc.)
│   ├── App.css # Styles globaux et animations CSS
│   ├── App.tsx # Composant principal de l'application
│   ├── main.tsx # Point d'entrée de l'application
│   └── index.css # Styles Tailwind de base
├── .gitignore
├── index.html # Fichier HTML principal
├── package.json
├── pnpm-lock.yaml (ou package-lock.json/yarn.lock)
├── postcss.config.js
├── tailwind.config.js # Configuration de Tailwind CSS
├── tsconfig.json
├── tsconfig.node.json
└── README.md # Ce fichier
```

## Contributions

Les contributions sont les bienvenues. Veuillez ouvrir une issue pour discuter des changements majeurs avant de soumettre une pull request.

## Licence

Ce projet est fourni à des fins de démonstration et de développement. Veuillez consulter le propriétaire du dépôt pour les questions de licence spécifiques si vous souhaitez l'utiliser ou le modifier.

