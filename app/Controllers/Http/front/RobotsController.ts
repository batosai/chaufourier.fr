import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RobotsController {
  public async handle({ response, view }: HttpContextContract) {
    response.header('Content-type', 'text/plain')

    return view.render('front/robots')
  }
}
