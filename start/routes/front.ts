import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'front/HomeController').as('home')

  Route.get('blog', 'front/ArticlesController.index').as('articles.index')
  Route.get('blog/:slug', 'front/ArticlesController.show').as('articles.show')

  Route.get('uses', 'front/PagesController.uses').as('pages.uses')
  Route.get('contact', 'front/PagesController.contact').as('pages.contact')
})
  .as('front')
