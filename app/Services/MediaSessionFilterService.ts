import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validator, schema } from '@ioc:Adonis/Core/Validator'

export default class MediaSessionFilterService {
  constructor() {}

  public static async handle({ request, session }: HttpContextContract): Promise<any> {
    let { page = 1, reset, ...data } = request.qs()

    if (!Object.keys(data).length && session.has('mediaFilter')) {
      data = session.get('mediaFilter')
    }

    if (reset) {
      if (reset === 'all') {
        data = {}
        session.forget('mediaFilter')
        return data
      } else {
        delete data[reset]
      }
    }

    data = await validator.validate({
      schema: schema.create({
        search: schema.string.optional(),
        order: schema.string.optional(),
      }),
      data,
    })

    if (Object.keys(data).length) {
      data.page = page
      session.put('mediaFilter', data)
    } else {
      session.forget('mediaFilter')
    }

    data.page = page

    return data
  }
}
