import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('login', 'auth/SessionController.create').as('session.create')
  Route.post('login', 'auth/SessionController.store').as('session.store')

  Route.get('forgot-password', 'auth/ForgotPasswordController.create').as('password.create')
  Route.post('forgot-password', 'auth/ForgotPasswordController.store').as('password.store')

  Route.get('reset-password/:email', 'auth/ResetPasswordController.create').as(
    'password.reset.create'
  )
  Route.post('reset-password', 'auth/ResetPasswordController.store').as('password.reset.store')
})
  .prefix('auth')
  .as('auth')
  .middleware('guest')

Route.post('auth/logout', 'auth/SessionController.destroy')
  .as('auth.session.destroy')
  .middleware('auth')

Route.post('/impersonate/:id', 'auth/ImpersonatesController.store').as('impersonate.store').middleware('auth')
Route.delete('/impersonate', 'auth/ImpersonatesController.destroy').as('impersonate.destroy').middleware('auth')
