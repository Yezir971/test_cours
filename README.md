# test_cours

Groupe Sharly : James - Charly - Célia - Elwen - Melinda

Descriptions des fonctionnalités :

1. Création d'utilisateur (POST /users) avec une API:
   route: api/create/user (POST)
   Prend en paramètre le nom, l'email et le password
   **Codes de réponse** :

- `200` ✅ Utilisateur créé avec succès
- `404` ❌ Utilisateur non trouvé
- `500` ❌ Erreur serveur

2. Affichage de la liste de tout les utilisateurs (GET /users):
   route: api/users (GET)

   Type d'erreur:
   200 = retourne un objet -> [id], [name], [email], [password]
   403 = accès interdit
   500 = error server

```json
[
{
  "id": 1,
  "name": "Exemple",
  "email": "exemple@mail.com",
  "password": "********"
},
...
]
```

Procédure simple d’installation :

```bash
npm init -y
npm install express
npm install --save-dev jest supertest cypress sqlite3 knex

```

Commandes pour lancer les tests :

```bash
npm run test:unit
```

-> lance tests unitaires avec Jest

```bash
npm run test:int
```

-> lance les tests d'intégration

```bash
npm run test:e2e
```

-> ouvre Cypress pour les tests e2e

Exemples concrets d’utilisation de l'API :

```bash
git clone https://github.com/Yezir971/test_cours.git
npm install
cd src && node server.js
```
