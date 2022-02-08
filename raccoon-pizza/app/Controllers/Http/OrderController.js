'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Order = use('App/Models/Order')
const Pizza = use('App/Models/Pizza')

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async index({ request, response, view }) {
      const { page, perPage } = request.all()
  
      const orders = await Order.query().paginate(page, perPage)
  
      return orders
    }
  

  /**
   * Render a form to be used for creating a new order.
   * GET orders/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

   async store({ request, response, auth }) {
    
    const user = await auth.getUser()

    const { pizza_id } = request.all()

    let  { pizza_quantity, delivery, total_amount } = request.all()

    const wrongValues = [null, undefined, '']

    if (!delivery || wrongValues.includes(delivery)) {
      delivery = false
    }

    if (!pizza_quantity || wrongValues.includes(pizza_quantity)) {
      pizza_quantity = 1
    }

    const pizza = await Pizza.query().select('id', 'price').where('id', pizza_id).first()

    const order = await Order.create({ 
      pizza_id,
      pizza_quantity,
      total_amount: delivery? pizza_quantity * (pizza.price * 1.3) : pizza_quantity * pizza.price,
      delivery
    })

    return { success: true, order };
    
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show ({ params }) {
    const { id } = params

    const order = await Order.query().where('id', id).fetch()

    return order
}

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = OrderController
