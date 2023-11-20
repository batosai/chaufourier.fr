import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { passwordRules, PASSWORD_MIN_LENGTH } from '../Rules/Password'
import { emailUniqueRules } from '../Rules/Email'
import Roles from 'App/Enums/Roles'

export const MIN_LENGTH = 2
export const MAX_LENGTH = 50
export const MAX_Size = '10mb'

export default class UserValidator {
  constructor(
    protected ctx: HttpContextContract,
    protected user: User | void
  ) {
    const fields = {
      lastname: schema.string([
        rules.escape(),
        rules.trim(),
        rules.minLength(MIN_LENGTH),
        rules.maxLength(MAX_LENGTH),
      ]),
      firstname: schema.string([
        rules.escape(),
        rules.trim(),
        rules.minLength(MIN_LENGTH),
        rules.maxLength(MAX_LENGTH),
      ]),
      email: schema.string({}, emailUniqueRules(user)),
      password: schema.string.optional(passwordRules()),
      avatar: schema.file.optional({
        extnames: ['jpg', 'png', 'jpeg', 'heic'],
        size: MAX_Size,
      }),
    }

    if (ctx.auth.user?.isAdmin && ctx.auth.user?.id !== user?.id) {
      fields['role'] = schema.enum(Object.values(Roles))
    }

    this.schema = schema.create(fields)
  }

  public schema
  public messages = {
    ...this.ctx.i18n.validatorMessages('validator.shared'),
    'firstname.minLength': this.ctx.i18n.formatMessage('validator.shared.firstname.minLength', {
      min_length: MIN_LENGTH,
    }),
    'firstname.maxLength': this.ctx.i18n.formatMessage('validator.shared.firstname.maxLength', {
      max_length: MAX_LENGTH,
    }),
    'lastname.minLength': this.ctx.i18n.formatMessage('validator.shared.lastname.minLength', {
      min_length: MIN_LENGTH,
    }),
    'lastname.maxLength': this.ctx.i18n.formatMessage('validator.shared.lastname.maxLength', {
      max_length: MAX_LENGTH,
    }),
    'password.minLength': this.ctx.i18n.formatMessage('validator.shared.password.minLength', {
      password_min_length: PASSWORD_MIN_LENGTH,
    }),
    'password_confirmation.minLength': this.ctx.i18n.formatMessage(
      'validator.shared.password_confirmation.minLength',
      {
        password_min_length: PASSWORD_MIN_LENGTH,
      }
    ),
    'avatar.file.size': this.ctx.i18n.formatMessage('validator.shared.avatar.maxSize', {
      max_size: MAX_Size,
    }),
    'avatar.file.extname': this.ctx.i18n.formatMessage('validator.shared.avatar.extname'),
  }
}
