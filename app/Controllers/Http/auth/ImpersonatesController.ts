import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import User from 'App/Models/User'

export default class ImpersonatesController {
  public async store({ session, bouncer, params, response, auth, up }: HttpContextContract) {
    const impersonatedUser = await User.find(params.id)
    await bouncer.with('ImpersonatePolicy').authorize('create', impersonatedUser!)

    session.put('impersonatedId', params.id)

    Event.emit('audit:new', {
      label: `Impersonate user ${impersonatedUser!.fullname}`,
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: 'IMPERSONATE',
      target: 'USER',
      targetId: impersonatedUser!.id,
    })

    up.setLocation('/admin')
    up.fullReload()
    return response.redirect('/admin')
  }

  public async destroy({ session, bouncer, response, up }: HttpContextContract) {
    await bouncer.with('ImpersonatePolicy').authorize('delete')
    session.forget('impersonatedId')

    up.setLocation('/admin')
    up.fullReload()
    return response.redirect('/admin')
  }
}
