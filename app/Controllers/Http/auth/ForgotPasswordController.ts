import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ForgotPasswordValidator from 'App/Validators/ForgotPasswordValidator'
import ForgotPasswordMailer from 'App/Mailers/ForgotPasswordMailer'

export default class ForgotPasswordController {
  public async create({ view }: HttpContextContract) {
    return view.render('auth/forgot-password')
  }

  public async store({ request, response, session, i18n }: HttpContextContract) {
    const payload = await request.validate(ForgotPasswordValidator)

    const user = await User.findBy('email', payload.email)

    if (user) {
      await new ForgotPasswordMailer(user).sendLater()
    }

    session.flash('success.message', i18n.formatMessage('form.success.forgotPassword'))

    response.redirect('/auth/login')
  }
}
