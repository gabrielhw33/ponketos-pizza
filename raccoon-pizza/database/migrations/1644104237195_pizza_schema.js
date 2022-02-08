'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PizzaSchema extends Schema {
  up () {
    this.create('pizzas', (table) => {
      table.string('pizzaName', 80).notNullable().unique()
      table.string('pizzaDescription', 254).notNullable().unique()
      table.integer('price').notNullable()
      table.text('photo')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('pizzas')
  }
}

module.exports = PizzaSchema
