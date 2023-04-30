import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import { DateTime } from 'luxon'

export default class SessionController {
  /**
   * Show form to login
   */
  public async create({ request, view }: HttpContextContract) {
    return view.render('auth/login', {
      redirectTo: request.input('redirect_to', '/admin'),
    })
  }

  /**
   * Handle login form submissions
   */
  public async store({ request, response, auth, session, i18n }: HttpContextContract) {
    await auth.attempt(
      request.input('email'),
      request.input('password'),
      request.input('remember_me')
    )

    auth.user!.lastLoginAt = DateTime.local()
    await auth.user!.save()

    if (auth.user?.disabled) {
      session.flash('auth.error', i18n.formatMessage('auth.E_INVALID_DISABLED'))
      session.clear()
      return response.redirect('/auth/login')
    }

    Event.emit("audit:new", {
      label: 'Login user',
      username: auth.user!.fullname,
      userId: auth.user!.id,
      action: "SIGNED IN",
      target: "USER",
      targetId: auth.user!.id,
    })

    session.flash('success.message', i18n.formatMessage('form.success.session'))

    /**
     * Redirect to the home page
     */
    response.redirect('/admin')
  }

  /**
   * Destroy user session (aka logout)
   */
  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    response.redirect('/admin')
  }
}
