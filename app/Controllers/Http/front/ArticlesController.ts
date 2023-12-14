import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Article from 'App/Models/Article'

export default class ArticlesController {
  public async index({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10

    const articles = await Article.query()
      .withScopes(scopes => scopes.published())
      .paginate(page, limit)
      articles.baseUrl(Route.builder().make('front.articles.index'))

    return view.render('front/articles/index', { articles })
  }

  public async show({ view }: HttpContextContract) {
    return view.render('front/articles/show')
  }
}
