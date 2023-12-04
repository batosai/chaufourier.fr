import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ArticlesController {
  public async index({ view }: HttpContextContract) {
    return view.render('front/articles/index')
  }

  public async show({ view }: HttpContextContract) {
    return view.render('front/articles/show')
  }
}
