import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'

export const MIN_LENGTH = 2

export default class TagValidator {
  constructor(
    protected ctx: HttpContextContract,
    protected tag: Tag | void
  ) {
    const fields = {
      name: schema.string([
        rules.trim(),
        rules.lowerCase(),
        rules.minLength(MIN_LENGTH),
        rules.unique(
          tag
            ? {
                table: 'tags',
                column: 'name',
                caseInsensitive: true,
                whereNot: {
                  id: tag.id,
                },
              }
            : {
                table: 'tags',
                column: 'name',
                caseInsensitive: true,
              }
        ),
      ]),
      slug: schema.string.optional([
        rules.escape(),
        rules.trim(),
        rules.unique({
          table: 'tags',
          column: 'slug',
          whereNot: {
            id: ctx.params.id,
          },
          caseInsensitive: true,
        }),
      ]),
    }

    this.schema = schema.create(fields)
  }

  public schema

  public messages = {
    ...this.ctx.i18n.validatorMessages('validator.shared'),
    'name.minLength': this.ctx.i18n.formatMessage('validator.shared.name.minLength', {
      min_length: MIN_LENGTH,
    }),
  }
}
