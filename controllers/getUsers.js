const fetchUsers = require("../models/fetchUsers");

const getUsers = (req, res) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};

module.exports = getUsers;
