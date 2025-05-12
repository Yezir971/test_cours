const app = require('./app.js');
const bcrypt = require('bcrypt');
let user_json = [{}]

const create = async (req, res, next) => {
    // const id = req.body.nom;
    const id = user_json.length;
    const name = req.body.name;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (!name || !email || !req.body.password) {
        res.status(500).send('value null')
    }
    console.log('groooooooosssse galere');

    res.status(200).send('user created');
}

module.exports = { create };