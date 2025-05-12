const express = require('express');
const app = express()//création de l'application express
const port = 3000;//port d'écoute du serveur
const hostname = 'localhost';//nom d'hôte du serveur

app.listen(port, hostname, () => {
    console.log(`Server is listening on port http://${hostname}:${port}`)
});

module.exports = app;