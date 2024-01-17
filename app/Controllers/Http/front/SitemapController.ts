import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'

export default class SitemapController {
  public async handle({ response, view }: HttpContextContract) {
    response.header('Content-type', 'application/xml')

    const articles = await Article.query().withScopes((scopes) => scopes.published())

    return view.render('front/sitemap', { articles })
  }
}
