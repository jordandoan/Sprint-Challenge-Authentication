db = require("../database/dbConfig");

module.exports = {
  addUser,
  findUser,
  deleteAll
}

function addUser(user) {
  return db('users')
    .insert(user)
}

function findUser(username) {
  return db('users')
    .where({username})
    .first();
}

function deleteAll() {
  return db('users').truncate()
}
