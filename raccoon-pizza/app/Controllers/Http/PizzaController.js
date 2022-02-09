'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Pizza = use('App/Models/Pizza')

/**
 * Resourceful controller for interacting with pizzas
 */
class PizzaController {
  /**
   * Show a list of all pizzas.
   * GET pizzas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index({ request }) {

    let {
        page = 1,
        search = '',
        perPage = 12,
        sortDirection = 'asc',
        sortBy = 'created_at' 
    } = request.all()

    let pizzas = Pizza.query()

    if (search) {
        const keyword = `%${decodeURIComponent(
            search
              .trim()
              .toLowerCase()
          )}%`
        
          pizzas.whereRaw('LOWER(pizzaName) LIKE ?', keyword)
    }

    const results = await pizzas.paginate(page, perPage)

    return results
}

  /**
   * Render a form to be used for creating a new pizza.
   * GET pizzas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new pizza.
   * POST pizzas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

   async store({ request, response }) {

    const { pizzaName, pizzaDescription, price, photo } = request.all()

    const pizza = await Pizza.create({
      pizzaName,
      pizzaDescription,
      price,
      photo // this should be a base 64 image transformed into a binary or something
    })

    return pizza
  }


  /**
   * Display a single pizza.
   * GET pizzas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const { id } = params

    const pizza = await Pizza.query().where('id', id).fetch()

    return pizza
}
  

  /**
   * Render a form to update an existing pizza.
   * GET pizzas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pizza details.
   * PUT or PATCH pizzas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params
    const { pizzaName, pizzaDescription, price, photo } = request.all()

    let pizza = await Pizza.query().where('id', id).first()

  if (!pizza) {
      return { message: 'pizza_not_found_bitch' }
  }
  try {
    await pizza.merge({
        pizzaName,
        pizzaDescription,
        price,
        photo
    })

    await pizza.save()

 } catch (error) {
    console.log(error)
 }

  return { success: true }


  }

  /**
   * Delete a pizza with id.
   * DELETE pizzas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async delete({ params }) {

    const { id } = params
    const pizza = await Pizza.query().where('id', id).first()

    await pizza.delete()

    return { success: true }
}
}

module.exports = PizzaController
