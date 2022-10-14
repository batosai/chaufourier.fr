import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('login', 'auth/SessionController.create').as('session.create')
  Route.post('login', 'auth/SessionController.store').as('session.store')

  Route.get('forgot-password', 'auth/ForgotPasswordController.create').as('password.create')
  Route.post('forgot-password', 'auth/ForgotPasswordController.store').as('password.store')
})
  .prefix('auth')
  .as('auth')
  .middleware('guest')
