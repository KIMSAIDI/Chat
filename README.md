# Mood
Création d'un réseau social dans le cadre d'une UE à la Sorbonne Université. 

Gestion de la base de donnée : 
Utilisation de MongoDB pour stocker nos données et de Mongoose pour crée la connexion entre MongoDB et notre code.


Partie Serveur (Utilisation de Node.js) :
Nous avons découpé notre partie serveur en plusieurs partie : 
  1. ApiDossier : contient nos différentes api (User et Message)
  2. Entities : contient nos différentes collections (User et Message)
  3. Routes : contient les routes pour relier nos composants à nos api

Partie Client :
1. Fichier CSS contenant le CSS de nos composants
2. Notre composant MainPage est le point de départ de notre code. Il affiche toujours la Navigation Panel et est par défaut sur la page d'inscription. 
