import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/login', 'auth/SessionController.create').as('create')
  Route.post('/login', 'auth/SessionController.store').as('store')
})
  .prefix('auth')
  .as('auth')
  .middleware('guest')
