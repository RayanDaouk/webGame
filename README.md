EN:
🚀 Starting a ReactJS Project to Build a Web Game
Frontend Drupal Developer since January 2022, I’m rediscovering ReactJS purely out of passion and curiosity.

I’ve decided to create this web game project, drawing inspiration from titles like Golden Sun (for the combat system) and Myst-Legacy (for exploration).
I’m not yet sure where this project will take me, but it’s very close to my heart.

🧭 Project Goals
Main Steps:
Passively learn ReactJS with TypeScript.

Develop all the technical features:

- Player movement

- Zone transitions

- Monster spawning

- UI and more

- Add graphics:
As a trained graphic designer, I plan to use my visual skills to create the game’s graphic assets.

📌 Current Progress
1) Player Movement – ✅ Done
I chose to simulate an analog joystick anchored to the player token. The goal was to create an intuitive mouse-based movement system.

2) Map Switching – ⏳ In Progress
The main challenge is optimizing map loading through lazy loading.
Each map contains:

Its own scenery

Spawns ✅ Done

Collisions

Doors... ✅ Done

🔧 Created a door component to allow switching maps.

3) Follow Camera – ✅ Done
Built a camera that follows the player’s token. It automatically applies velocity and direction based on the player’s movement.

Issues encountered:
- At first, I tried using a centered zone on the screen, where the screen would scroll only when the player left this area. But syncing the scroll speed with the 60fps animation system (x px/frame simulated) was very tricky. The values sent from PlayerToken were either too small (getting rounded down by the browser to 0, ugh...) or too fast. In short, syncing the player and the camera was a nightmare.

- After 4 hours of trying, I scrapped it all and instead applied a translation to the entire world, keeping the camera centered on the player’s position. Bingo—it worked.
Using clamp calculations, I easily set camera boundaries based on the map size. Since the camera now directly follows the player’s position, it naturally adopts the player’s speed and simulated 60fps animation.

4) Polygonal Zones – 🔄 To Do
Create a component to:

- Define number of points and shape

- Set its position on the map

🎯 Custom zones can serve several purposes:

- Monster spawn areas (initially simulated)

- Collision zones

- Level-gated restricted zones


--------------------------------------------------------------------------------------------------------------------


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

- spawns ✅ Fait

- collisions

- portes... ✅ Fait

🔧 Création d’un composant porte permettant de changer de carte.

3) Caméra suiveuse – ✅ Fait
Création d'une caméra suiveuse du pion du joueur. Cette caméra applique
automatiquement une vélocité et une direction de suivi en fonction du déplacement
du joueur.

Difficultées rencontrée:
- J'ai d'abord voulu utiliser un système de zone centrée à l'écran, puis, quand le pion du joueur quittait la zone, l'écran scrollait mais il était difficile de synchroniser la vitesse de scroll avec le système d'animation en 60fps (x px/frame simulée). Pour résumer, les valeurs envoyé par PlayerToken étaient soit trop petite, empêchant la fenêtre de scroller (car le navigateur arrondissait en-dessous et j'étais donc à 0 , pfff...) soit trop rapide. Donc, impossible de synchroniser le pion et la caméra.

- Après 4h d'essaie, j'ai tout supprimé, puis j'ai plutôt appliqué une translation sur le monde global tout en centrant la camera sur la position du joueur. Et la bingo, ça fonctionne. En utilisant des calculs de clamp j'ai pu facilement mettre en place les limites de la camera en fonction de la taille de la map courante, le tout en adoptant automatiquement la vitesse du joueur et son animation en 60fps simulé, vu que là, la caméra suit simplement la position du joueur.

4) Zones polygonales – 🔄 À faire
Création d’un composant permettant de :

- Définir le nombre de points et la forme

- Choisir la position dans la carte

🎯 Les zones personnalisées peuvent avoir plusieurs fonctions :

- Zone de spawn de monstre (simulation dans un premier temps)

- Zone de collision

- Zone restreinte par un niveau requis
