let users = require('./datas.js')


const listUsers = (req, res) => {
  res.status(200).json(users);
};

module.exports = {listUsers};
