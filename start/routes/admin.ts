import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'admin/DashboardController').as('dashboard')

  Route.resource('users', 'admin/UsersController').except(['show'])
  Route.patch('users/:id/toggle-disabled', 'admin/UsersController.toggleDisabled').as('users.toggle.disabled')
  Route.post('users/:id/forgot-password', 'admin/UsersController.forgotPassword').as('users.forgot.password')
})
  .prefix('admin')
  .as('admin')
  .middleware('auth')
