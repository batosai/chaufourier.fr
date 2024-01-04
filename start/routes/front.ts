import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'front/HomeController').as('home')

  Route.get('blog', 'front/ArticlesController.index').as('articles.index')
  Route.get('blog/:slug', 'front/ArticlesController.show').as('articles.show')
  Route.get('preview/:slug', 'front/ArticlesController.preview')
    .as('articles.preview')
    .middleware('auth')

  Route.get('uses', 'front/PagesController.uses').as('pages.uses')
  // Route.get('contact', 'front/PagesController.contact').as('pages.contact')

  Route.get('sitemap.xml', 'front/SitemapController').as('sitemap')
  Route.get('robots.txt', 'front/RobotsController').as('robots')
}).as('front')
