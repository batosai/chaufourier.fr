import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('login', 'auth/SessionController.create').as('session.create')
  Route.post('login', 'auth/SessionController.store').as('session.store')
})
  .prefix('auth')
  .as('auth')
  .middleware('guest')
