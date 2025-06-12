EN:
🚀 Getting Started with Create React App for a Web Game
Frontend Drupal developer since January 2022, I’m rediscovering ReactJS out of pure passion and curiosity.

I decided to start this web game project, drawing inspiration from Golden Sun (for the combat system) and Myst-Legacy (for exploration).
I’m not sure how far this project will go, but it means a lot to me.

🧭 Project Goals
Major Steps:
- Passively learn ReactJS with TypeScript.

Develop all core technical features:

- Player movement

- Area transitions

- Monster spawning

- UI and interactions

- Add visual elements:
As a trained graphic designer, I will create custom visual assets for the game.

📌 Current Progress
1) Player movement – ✅ Done
I created an intuitive movement system using a simulated analog joystick attached to the player token. The movement is mouse-based.

2) Area transitions – ⏳ In progress
The main challenge is optimizing map loading via lazy loading.
Each map includes:

- Its own decorations

- Spawn points

- Collisions

- Doors, etc.

🔧 A custom door component is being built to enable map transitions.

3) Camera boundary – 🔄 To do
A dynamic boundary zone will follow the player.
When it nears the edge of the player’s screen, the window will scroll in the appropriate direction.
Direction data will be passed from TokenPlayer to the CameraBoundary component.

4) Polygonal zones – 🔄 To do
A component will allow:

- Custom shapes with configurable number of points

- Positioning within a specific map

🎯 Custom zone features:

- Monster spawn zones (initially simulated)

- Collision areas

- Zones restricted by level requirements

FR:
🚀 Démarrer avec un projet ReactJS pour faire un jeu web:
Développeur Drupal Frontend depuis janvier 2022, je redécouvre ReactJS par pure passion et curiosité.

J’ai décidé de créer ce projet de jeu web en m’inspirant de titres comme Golden Sun (pour le système de combat) et Myst-Legacy (pour l’exploration).
Je ne sais pas encore jusqu’où ce projet me mènera, mais il me tient beaucoup à cœur.

🧭 Objectifs du projet
Grandes étapes :
- Apprendre ReactJS avec TypeScript de façon passive.

Développer toutes les fonctionnalités techniques :

- Déplacement

- Changement de zone

- Apparition de monstres

- Interfaces, etc.

- Ajouter le graphisme :
Étant infographiste de formation, je compte utiliser mes compétences visuelles pour créer les assets graphiques du jeu.

📌 Avancement actuel
1) Déplacement du pion joueur – ✅ Fait
J'ai opté pour une simulation de joystick analogique fixé au pion. Le but était de créer un système de déplacement intuitif à la souris.

2) Changement de cartes – ⏳ En cours
Le défi principal est d’optimiser le chargement des cartes avec du lazy loading.
Chaque carte contient :

- ses propres décors

- spawns

- collisions

- portes...

🔧 Création d’un composant porte permettant de changer de carte.

3) Délimitation de la caméra – 🔄 À faire
Création d'une zone autour du pion.
Lorsque cette zone approche des bords de l’écran, l'écran doit scroller dans la bonne direction.
La direction sera transmise depuis TokenPlayer au composant CameraBoundary.

4) Zones polygonales – 🔄 À faire
Création d’un composant permettant de :

- Définir le nombre de points et la forme

- Choisir la position dans la carte

🎯 Les zones personnalisées peuvent avoir plusieurs fonctions :

- Zone de spawn de monstre (simulation dans un premier temps)

- Zone de collision

- Zone restreinte par un niveau requis
