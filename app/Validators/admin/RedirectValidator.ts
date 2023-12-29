import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RedirectValidator {
  constructor(protected ctx: HttpContextContract) {
    const fields = {
      source: schema.string([rules.trim(), rules.lowerCase()]),
      destination: schema.string([rules.trim(), rules.lowerCase()]),
      code: schema.number([rules.escape(), rules.trim()]),
    }

    this.schema = schema.create(fields)
  }

  public schema
}
