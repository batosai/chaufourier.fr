import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'admin/DashboardController').as('dashboard')

  Route.resource('users', 'admin/UsersController').except(['show'])

  // Route.resource('users', 'admin/UsersController')
})
  .prefix('admin')
  .as('admin')
  .middleware('auth')
