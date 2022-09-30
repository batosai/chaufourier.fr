import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'admin/DashboardController.index').as('admin.dashboard').middleware('auth')
}).prefix('/admin')
