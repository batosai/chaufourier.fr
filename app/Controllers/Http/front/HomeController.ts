import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async handle({ view }: HttpContextContract) {
    return view.render('front/index')
  }
}
