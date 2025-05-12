const app = require('./app.js');
const bcrypt = require('bcrypt');
const user_json = require('./datas.js');

const create = async (req, res, next) => {
    // const id = req.body.nom;
    const id = user_json.data.length + 1;
    const name = req.body.name;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (!name || !email || !req.body.password) {
        res.status(409).send('Valeurs manquantes');
        console.log('Valeurs manquantes');
        return;
    }

    if (req.body.password.length < 8 || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(req.body.password)) {
        res.status(409).send('Le mot de passe doit contenir au moins 8 caractères et au moins un caractère spécial');
        console.log('Le mot de passe doit contenir au moins 8 caractères et au moins un caractère spécial');
        return;
    }

    if (user_json.data.find(user => user.email === email)) {
        res.status(409).send('Email déjà utilisé');
        console.log('Email déjà utilisé');
        return;
    }

    user_json.data.push({
        id: id,
        name: name.toString(),
        email: email.toString(),
        password: hashedPassword
    });

    console.log(user_json.data);

    res.status(200).send({ message: 'Utilisateur créé avec succès' });
}

module.exports = { create };