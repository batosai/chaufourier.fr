import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
  public async uses({ view }: HttpContextContract) {
    return view.render('front/pages/uses')
  }

  public async contact({ view }: HttpContextContract) {
    return view.render('front/pages/contact')
  }
}
