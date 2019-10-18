const server = require("../api/server.js");
// const server = require("./auth-router.js")
// const server = require("../.js");
const request = require("supertest");
const db = require("./auth-model.js");

describe('access / ', () => {
  it('should have status code 200', () => {
    return request(server).get('/api/auth/')
      .then(res => expect(res.status).toBe(200))
  })
  it('have message home', () => {
    return request(server).get('/api/auth/')
      .then(res => expect(res.body.message).toBe('home'))
  })
})

describe('add user', () => {
  it('should return id = 1', () => {
    return db.deleteAll()
      .then(ans =>db.addUser({username: "jordandoan123456", password: "password"})
        .then(ids => expect(ids[0]).toBe(1))
      )
  })
  it('return status code 201', () => {
    return request(server).post('/api/auth/register').send({username: "jordandoan1234567", password: "password"})
      .then(res => expect(res.status).toBe(201))
  })
})

describe('login user', () => {
  it('should return status code 201', () => {
    return request(server).post('/api/auth/login').send({username: "jordandoan1234567", password: "password"})
    .then(res => expect(res.status).toBe(201))
  })
  it('should expect token', () => {
    return request(server).post('/api/auth/login').send({username: "jordandoan1234567", password: "password"})
    .then(res => expect(res.body.token).toBeTruthy())
  })
})