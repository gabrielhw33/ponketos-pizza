'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('pizza_id').unsigned().references('id').inTable('pizzas')
      table.integer('pizza_quantity').notNullable().default(1)
      table.integer('total_amount').notNullable()
      table.boolean('delivery').default(false)
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
