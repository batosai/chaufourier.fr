import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Link from 'App/Models/Link'

export default class LinksController {
  public async index({ request, bouncer }: HttpContextContract) {
    await bouncer.with('ArticlePolicy').authorize('viewList')

    const { search } = request.qs()

    const articles = await Link.query().where('title', 'LIKE', `%${search}%`).exec()
    const items = articles.map((article) => article.serialize())

    return {
      'success': true,
      items
    }
  }
}
