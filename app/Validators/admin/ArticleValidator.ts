import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export const MIN_LENGTH = 2

export default class ArticleValidator {
  constructor(protected ctx: HttpContextContract) {
    const fields = {
      title: schema.string([rules.escape(), rules.trim(), rules.minLength(MIN_LENGTH)]),
      slug: schema.string.optional([rules.escape(), rules.trim()]),
      body: schema.string()
    }

    this.schema = schema.create(fields)
  }

  public schema

  public messages = {
    ...this.ctx.i18n.validatorMessages('validator.shared'),
    'title.minLength': this.ctx.i18n.formatMessage('validator.shared.title.minLength', {
      min_length: MIN_LENGTH,
    }),
  }
}
