const app = require("./server.js")
const listUsers = (req, res) => {
  res.status(200).json(users);
};

module.exports = listUsers;
