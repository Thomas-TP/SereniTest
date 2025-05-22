# Documentation SereniTest - Refonte du site avec animations et fonctionnalités avancées

## Vue d'ensemble

Cette documentation détaille la refonte complète du site SereniTest, incluant l'intégration du nouveau branding, l'ajout d'animations avancées déclenchées au défilement, l'implémentation d'effets parallax et l'enrichissement des fonctionnalités interactives.

## Branding SereniTest

### Palette de couleurs
- **Primaire Bleu-vert (Teal)**: #4FBFB9
- **Primaire Violet**: #8A85FF
- **Secondaire Bleu-vert foncé**: #3A8F8A
- **Secondaire Violet foncé**: #6A66CC
- **Accent Jaune**: #FFD166
- **Neutre Clair**: #F8F9FA
- **Neutre Moyen**: #E1E5EB
- **Neutre Foncé**: #2D3748
- **Neutre Noir**: #1A202C

### Typographie
- **Titres**: Poppins, sans-serif
- **Corps de texte**: Inter, sans-serif

### Logo
Le logo SereniTest est disponible en plusieurs formats:
- `serenitest-logo-simple.png` - Version simplifiée
- `serenitest-logo.png` - Version complète

## Structure des fichiers

### Composants principaux
- `App.tsx` - Composant racine avec intégration globale
- `Header.tsx` - En-tête avec navigation et animations
- `HeroSection.tsx` - Section d'accueil avec animations parallax
- `ProblemSection.tsx` - Section présentant les défis
- `SolutionSection.tsx` - Section présentant la solution SereniTest
- `PersonasSection.tsx` - Section présentant les personas cibles
- `VisionSection.tsx` - Section présentant la vision de SereniTest
- `MonetizationSection.tsx` - Section présentant les offres
- `Footer.tsx` - Pied de page avec animations
- `Chatbot.tsx` - Chatbot interactif
- `InteractiveFeaturesSection.tsx` - Section regroupant les fonctionnalités interactives

### Illustrations et assets
- `serenitest-dashboard-illustration.png` - Illustration du tableau de bord
- `serenitest-personas-illustration.png` - Illustration des personas
- `serenitest-features-illustration.png` - Illustration des fonctionnalités

## Animations et effets

### Animations au défilement
Toutes les sections utilisent des animations déclenchées au défilement (scroll-triggered) implémentées avec:
- **Framer Motion** pour les animations basées sur les composants React
- **GSAP** avec ScrollTrigger pour les animations plus complexes et synchronisées

### Effets parallax
Les effets parallax sont présents sur:
- Les arrière-plans des sections
- Les éléments décoratifs
- Certains éléments de contenu pour créer de la profondeur

### Micro-animations
Des micro-animations sont appliquées sur:
- Les boutons (hover, tap)
- Les cartes et éléments interactifs
- Les icônes et illustrations

## Fonctionnalités interactives

### Dashboard interactif
Un tableau de bord interactif démontrant les fonctionnalités de l'application:
- Score de bien-être animé
- Tendances hebdomadaires
- Recommandations personnalisées

### Onboarding interactif
Un système d'onboarding avec:
- Tutoriel étape par étape
- Animations de transition
- Indicateurs de progression

### FAQ interactive
Une FAQ dynamique avec:
- Animations d'ouverture/fermeture
- Transitions fluides
- Mise en évidence des questions actives

### Chatbot
Un chatbot intelligent avec:
- Interface utilisateur animée
- Effet de frappe pour les réponses
- Suggestions rapides

## Compatibilité et responsive design

Le site est entièrement responsive et compatible avec:
- Ordinateurs de bureau
- Tablettes
- Smartphones

Les animations et effets sont optimisés pour fonctionner sur tous les appareils, avec des ajustements automatiques selon la taille d'écran.

## Intégration technique

### Bibliothèques utilisées
- **React** - Framework UI
- **TypeScript** - Typage statique
- **Framer Motion** - Animations de composants
- **GSAP** - Animations avancées
- **React Intersection Observer** - Détection de visibilité

### Performance
Les animations sont optimisées pour les performances:
- Utilisation de `will-change` pour les éléments animés
- Animations basées sur les propriétés GPU-accelerated (transform, opacity)
- Lazy loading des composants lourds

## Guide de maintenance

### Ajout de nouvelles sections
Pour ajouter une nouvelle section:
1. Créer un nouveau composant dans `src/components/`
2. Importer les bibliothèques d'animation nécessaires
3. Structurer le composant avec les animations souhaitées
4. Intégrer le composant dans `App.tsx`

### Modification du branding
Pour modifier les éléments de branding:
1. Mettre à jour les variables CSS dans le fichier de styles
2. Remplacer les assets logo dans `src/assets/`
3. Ajuster les références dans les composants concernés

### Ajout de fonctionnalités interactives
Pour ajouter de nouvelles fonctionnalités:
1. Créer un nouveau composant dans `InteractiveFeaturesSection.tsx` ou dans un fichier séparé
2. Implémenter les animations et interactions souhaitées
3. Intégrer le composant dans la section appropriée

## Conclusion

Cette refonte complète transforme l'expérience utilisateur du site SereniTest avec des animations sophistiquées, un branding cohérent et des fonctionnalités interactives engageantes. L'architecture modulaire permet une maintenance facile et des évolutions futures.
