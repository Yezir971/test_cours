const app = require('./app.js');

app.post('api/create/user', (req, res) =>{
    
})

const create = (req, res, next) => {
    const id = req.body.nom;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    res.send(`create user ${id} ${name} ${email} ${password}`);
    res.status(200).send('user created');
}

module.exports = { create } 