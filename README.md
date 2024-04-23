
# Présentation du Projet: Jeux Olympiques 2024

Cette application a été conçu pour un sujet d'examen Studi. 

Le projet consiste à mettre en place un système de réservation de billets en ligne pour les Jeux Olympiques de 2024. Les visiteurs devront se rendre sur le site web des Jeux Olympiques France pour consulter les offres disponibles et effectuer leurs réservations. Le système devra permettre aux utilisateurs de créer un compte, sélectionner et acheter des billets, et recevoir un e-billet sécurisé pour accéder aux événements. Il existe également une partie administrateur, afin de modifier les différentes offres proposées aux clients.




## Demo

[Jeux Olympiques](https://jeux-olympiques-2024-production.up.railway.app/)


## Installation

Client et server sont deux dossiers séparés mais utilisent les mêmes commandes pour se lancer. Commencez d'abord pour chacun par la commande d'installation:

```bash
  npm install
```

Puis pour démarrer les projets:

```bash
  npm run start
```
## Documentation technique

#### Authentification des Utilisateurs
Lors de la création de leur compte, les utilisateurs devront fournir leur nom d'utilisateur, nom, prénom, adresse e-mail et mot de passe. Une politique de sécurité des mots de passe est actuellement définie par le développeur de l'application, pour garantir des mots de passe robustes.

Les mots de passe seront hachés avant d'être stockés dans la base de données, conformément aux bonnes pratiques de sécurité.

Une clé unique sera générée pour chaque utilisateur au moment de la création du compte. Cette clé sera invisible pour l'utilisateur mais accessible uniquement par l'organisation des Jeux Olympiques, assurant ainsi une authentification sécurisée.

#### Sécurité des Transactions
Lors de l'achat d'un billet, une autre clé sera générée. Cette clé sera concaténée avec la clé précédente pour sécuriser le billet acheté.

Un QR code sera généré à partir de la clé définitive, qui servira de e-billet pour le client. Ce QR code contiendra les informations nécessaires pour vérifier l'authenticité du billet lors du scan le jour des Jeux Olympiques.

#### Gestion des Comptes Administrateurs
Un compte administrateur, impossible à créer depuis l'application, sera fourni pour permettre la gestion des offres disponibles et visualiser le nombre de ventes par offre.

L'accès à cet espace administrateur sera strictement contrôlé pour garantir la sécurité des données sensibles.

#### Liste des évolutions futures:
- envoi d'un code de vérification par e-mail pour approuver la connexion
- meilleure gestion des offres inactives, comme par exemple si elles sont dans un panier
- envoyer un mail à la création de compte
- envoyer un mail de confirmation de réservation, avec en pièces-jointes les tickets
- télécharger les tickets depuis le compte client
- gestion de mot de passe oublié
- changer de mot de passe depuis le compte client
- changer d'adresse mail depuis le compte client
## Manuel d'utilisation

#### 1. Accès au Site Web

Le site comprend, de façon claire :

- Une page d'accueil présentant les Jeux Olympiques et quelques épreuves.
- Une page répertoriant toutes les offres disponibles, telles que solo, duo et familiale.


#### 2. Sélection et Ajout d'Offres au Panier

Les clients peuvent sélectionner une offre ou plusieurs offres qui les intéressent, et l'ajouter à leur panier. Il est ensuite possible d'accéder à son panier, pour modifier les quantités, ainsi que supprimer des offres.

Par sécurité, l'application n'autorise que jusqu'à 5 tickets par offre, et par achat.

Les Jeux Olympiques peuvent publier de nouvelles offres, donc un espace administrateur est dédié pour visualiser, ajouter, modifier des offres. Pour plus d'informations sur cet espace administrateur, rendez-vous au point 6.

#### 3. Authentification de l'Utilisateur

Avant de finaliser la réservation, le visiteur doit s'authentifier.

Lors de la création de son compte, une clé unique est générée, uniquement visible par l'organisation des Jeux Olympiques.

L'utilisateur doit fournir un nom d'utilisateur, son nom, son prénom, une adresse e-mail et un mot de passe répondant à des critères de sécurité spécifiques.

#### 4. Paiement des Billets

Une fois authentifié, l'utilisateur peut procéder au paiement de ses billets. Notez que le paiement réel ne se fait pas dans l'application. À l'heure actuelle, il s'agit d'un mock de payement en ligne par carte bancaire.

Lors de l'achat, une autre clé est générée. Cette clé, combinée à la précédente, sécurise le billet acheté.

#### 5. Génération du e-Billet et Sécurité

Un QR code est généré en utilisant la clé finale, qui représente le e-billet du client.

Lors des Jeux Olympiques, chaque e-billet sera scanné pour vérifier son authenticité.

Les employés peuvent, en combinant les deux clés, confirmer que les billets sont authentiques et que le titulaire est bien le détenteur de l'achat.

#### 6. Administration et Sécurité

Un administrateur, dont le compte doit être fourni et ne peut être créé depuis l'application, peut visualiser les statistiques de vente par offre depuis son espace.

Pour y accéder, il suffit de se connecter comme n'importe quel autre utilisateur: il sera automatiquement redirigé vers son espace administrateur. Compte tenu de son role, il ne pourra pas effectuer de commande. 

Par mesure de sécurité, une offre ne peut pas être supprimé, afin de garantir l'accès aux données des tickets déjà achetés. En revanche, il est possible de les rendre inactives. Seules les offres activent apparaissent dans la billeterie.


## Tests unitaires

Pour effectuer les tests unitaires, utilisez les commandes suivantes:

#### Client:
```bash
  npm run test
```
#### Serveur:
{...}

{... covering tests...}
## Tech Stack

**Client:** React, Axios, Redux, Material UI

**Server:** Node, Express

**Database:** Postgresql


## Pour aller plus loin

 - [Trello du projet](https://trello.com/b/TiF7ylF1/jeux-olympiques-2024)

