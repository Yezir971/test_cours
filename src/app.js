const express = require('express');
const app = express();

app.use(express.json());//intercepte toutes les requêtes qui contiennent du json pour donner accès au corps de la requête

module.exports = app;