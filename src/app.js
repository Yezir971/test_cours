const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/users');
app.use(userRoutes); // active les routes définies dans routes/users.js

module.exports = app;
