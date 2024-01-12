import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export const MIN_LENGTH = 2

export default class ArticleValidator {
  constructor(protected ctx: HttpContextContract) {
    const fields = {
      title: schema.string([rules.trim(), rules.minLength(MIN_LENGTH)]),
      slug: schema.string.optional([
        rules.escape(),
        rules.trim(),
        rules.unique({
          table: 'articles',
          column: 'slug',
          whereNot: {
            id: ctx.params.id,
          },
          caseInsensitive: true,
        }),
      ]),
      body: schema.string.nullableAndOptional(),
      tags: schema.array
        .nullableAndOptional()
        .members(schema.string([rules.exists({ table: 'tags', column: 'id' })])),
      imageId: schema.string.optional([
        rules.trim(),
        rules.exists({
          table: 'media',
          column: 'id',
        }),
      ]),
      visible: schema.boolean.nullableAndOptional(),
      publishedOn: schema.date.nullableAndOptional({ format: 'sql' }),
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
