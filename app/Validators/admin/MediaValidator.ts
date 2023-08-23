import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export const MAX_Size = '10mb'

export default class MediaValidator {
  constructor(protected ctx: HttpContextContract) {
    const fields = {
      file: schema.file.optional({
        size: MAX_Size,
      }),
    }

    this.schema = schema.create(fields)
  }

  public schema
  public messages = {
    ...this.ctx.i18n.validatorMessages('validator.shared'),
    'file.file.size': this.ctx.i18n.formatMessage('validator.shared.file.maxSize', {
      max_size: MAX_Size,
    }),
  }
}
