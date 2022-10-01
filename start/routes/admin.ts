import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'admin/DashboardController.index').as('dashboard.index')

  // Route.resource('users', 'admin/UsersController')
})
.prefix('admin')
.as('admin')
.middleware('auth')
