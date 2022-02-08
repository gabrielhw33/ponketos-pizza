'use strict'

const PizzaController = require('../app/Controllers/Http/PizzaController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(()=> {
    Route.get('/index', 'UserController.index')
    Route.post('/register', 'UserController.store')
    Route.post('/login', 'UserController.login')
    Route.get('/myOrders/:id', 'UserController.myOrders')
}).prefix('/api/users')

Route.group(() => {
    Route.post('/create', 'PizzaController.store')
    Route.get('/search', 'PizzaController.index')
    Route.get('/:id', 'PizzaController.show')
    Route.delete('/:id', 'PizzaController.delete')
    Route.put('/:id', 'PizzaController.update')
}).prefix('api/pizzas')

Route.group(() => {
    Route.post('/make', 'OrderController.store')
    Route.get('/index', 'OrderController.index')
    Route.get('/:id', 'OrderController.show')
}).prefix('api/orders').middleware()