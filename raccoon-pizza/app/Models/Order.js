'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    users () {
        return this.belongTo('App/Models/User')
    }
    pizzas () {
        return this.belongsTo('App/Models/Pizza')
    }
}

module.exports = Order
