db = require("../database/dbConfig");

module.exports = {
  addUser,
  findUser
}

function addUser(user) {
  return db('users')
    .insert(user)
    .first();
}

function findUser(username) {
  return db('users')
    .where({username})
    .first();
}
