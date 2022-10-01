import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'security/LoginController.create').as('create')
  Route.post('/', 'security/LoginController.store').as('store')
})
.prefix('security')
.as('security')
.middleware('guest')
