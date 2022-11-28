import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { passwordRules, PASSWORD_MIN_LENGTH } from '../Rules/Password'
import { emailUniqueRules } from '../Rules/Email'
import Roles from 'App/Enums/Roles'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract, protected user: User | void) {
    const fields = {
      lastname: schema.string([
        rules.escape(),
        rules.trim(),
        rules.minLength(2),
        rules.maxLength(50),
      ]),
      firstname: schema.string([
        rules.escape(),
        rules.trim(),
        rules.minLength(2),
        rules.maxLength(50),
      ]),
      email: schema.string({}, emailUniqueRules(user)),
      password: schema.string.optional(passwordRules()),
      // avatar: schema.file.optional({
      //   extnames: ['jpg', 'png', 'jpeg', 'heic'],
      //   size: '10mb',
      // }),
    }

    if (ctx.auth.user?.isAdmin && ctx.auth.user?.id !== user?.id) {
      fields['role'] = schema.enum(Object.values(Roles))
      fields['disabled'] = schema.boolean()
    }

    this.schema = schema.create(fields)
  }

  public schema
  public messages = {
    ...this.ctx.i18n.validatorMessages('validator.shared'),
    'password.minLength': this.ctx.i18n.formatMessage(
      'validator.shared.password.minLength',
      {
        password_min_length: PASSWORD_MIN_LENGTH,
      },
    ),
    'password_confirmation.minLength': this.ctx.i18n.formatMessage(
      'validator.shared.password_confirmation.minLength',
      {
        password_min_length: PASSWORD_MIN_LENGTH,
      },
    ),
  }
}
