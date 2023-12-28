import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export const MIN_LENGTH = 2

export default class ArticleSeoValidator {
  constructor(protected ctx: HttpContextContract) {
    const fields = {
      title: schema.string.optional([rules.escape(), rules.trim()]),
      description: schema.string.optional([rules.escape(), rules.trim()]),
      robots: schema.string.optional([rules.escape(), rules.trim()]),
      canonical: schema.string.optional([rules.escape(), rules.trim()]),
      imageId: schema.string.optional([
        rules.trim(),
        rules.exists({
          table: 'media',
          column: 'id',
        }),
      ]),
    }

    this.schema = schema.create(fields)
  }

  public schema
}
