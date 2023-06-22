import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SystemController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('SystemPolicy').authorize('index')
    return view.render('admin/system/index')
  }
}
