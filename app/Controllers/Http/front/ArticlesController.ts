import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import { types } from '@ioc:Adonis/Core/Helpers'
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

  public async show({ view, params }: HttpContextContract) {
    const article = await Article.findByOrFail('slug', params['slug'])
    await article.load('tags')

    // string for sqlite db
    const blocks = types.isString(article.body) ? JSON.parse(article.body).blocks : article.body['blocks']

    return view.render('front/articles/show', { article, blocks })
  }
}
