import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import I18n from '@ioc:Adonis/Addons/I18n'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

export default class ForgotPasswordMailer extends BaseMailer {
  constructor(private user: User) {
    super()
  }

  public prepare(message: MessageContract) {
    const url = ''

    message
      .from(Env.get('EMAIL_FROM'), 'Adonis')
      .to(this.user.email, this.user.fullname)
      .subject(
        I18n.locale(I18n.defaultLocale).formatMessage('emails.forgot.subject'),
      )
      .htmlView('emails/auth/forgot-password', {
        user: this.user,
        url,
      })
  }
}
