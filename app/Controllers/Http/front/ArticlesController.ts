import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Article from 'App/Models/Article'

export default class ArticlesController {
  public async index({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 8

    const articles = await Article.query()
      .withScopes((scopes) => scopes.published())
      .paginate(page, limit)
    articles.baseUrl(Route.builder().make('front.articles.index'))

    return view.render('front/articles/index', { articles })
  }

  public async show({ view, params, response }: HttpContextContract) {
    const article = await Article.findByOrFail('slug', params['slug'])
    await article.load('tags')
    await article.load('seo', (s) => {
      s.preload('image')
    })

    if (!article.isVisibled()) {
      response.redirect('/blog')
    }

    return view.render('front/articles/show', { article })
  }

  public async preview({ view, params, bouncer }: HttpContextContract) {
    const article = await Article.findByOrFail('slug', params['slug'])
    await article.load('tags')
    await article.load('seo')

    await bouncer.with('ArticlePolicy').authorize('preview', article)

    return view.render('front/articles/show', { article })
  }
}
