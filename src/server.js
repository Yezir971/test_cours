const express = require('express');
const app = require('./app');
const port = 3000;//port d'écoute du serveur
const hostname = 'localhost';//nom d'hôte du serveur
const router = require('../routes/users');


app.use('/api', router);

app.listen(port, hostname, () => {
    console.log(`Server is listening on port http://${hostname}:${port}`)
});
