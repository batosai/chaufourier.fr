import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'security/LoginController.create').as('security.login').middleware('guest')
  Route.post('/', 'security/LoginController.store').middleware('guest')
}).prefix('/security')
