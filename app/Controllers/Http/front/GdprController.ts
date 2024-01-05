import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GdprController {
  public async index({ request, view }: HttpContextContract) {
    const cookies = request.cookie('_gdpr', { umami: true })

    return view.render('front/pages/gdpr', { cookies })
  }

  public async store({ request, response }: HttpContextContract) {
    response.cookie('_gdpr', { umami: request.input('umami', false) })

    response.noContent()
  }
}
