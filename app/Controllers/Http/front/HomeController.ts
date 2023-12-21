import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'

export default class HomeController {
  public async handle({ view }: HttpContextContract) {

    const articles = await Article.query()
      .withScopes(scopes => scopes.published()).preload('tags').limit(4)

    return view.render('front/index', { articles })
  }
}
