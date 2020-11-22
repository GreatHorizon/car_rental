const { Client } = require('pg')
require('dotenv').config()

class DBManager {
  #client

  constructor() {
    this.#client = new Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    })
  }
  async connect() {
    await this.#client.connect()
  }

  async insertUser(user) {
    console.log(user)
    let data = [user.name, user.phone, user.email, user.idCity, user.password]
    let query = 'INSERT INTO \"user\" VALUES(DEFAULT, $1, $2, $3, $4, $5)'
    await this.#client.query(query, data)
  }
  async getUserDataByPhone(phone) {
    let data = [phone]
    let query = 'SELECT phone, password FROM \"user\" WHERE phone = $1'
    return await this.#client.query(query, data)
  }

  async getMarkModels(markName) {

    let data = [markName]
    let query = 'SELECT id_mark FROM mark WHERE name = $1'
    let carId = await this.#client.query(query, data)
    query = 'SELECT name FROM model WHERE id_mark = $1'
    return await this.#client.query(query, [carId.rows[0].id_mark])
  }
  
  async getCarsList() {
    let query = 'SELECT name FROM mark'
    return await this.#client.query(query)
  }

  async insertCar(car) {
    let data = [car.mark]
    let query = 'INSERT INTO car VALUES (DEFAULT, $1, $2, $3, $4, $5)'
  }

  async close() {
	   await this.#client.end()
  }
}


module.exports =  {DBManager}