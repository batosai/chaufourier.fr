import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validator, schema } from '@ioc:Adonis/Core/Validator'

export default class RedirectSessionFilterService {
  constructor() {}

  public static async handle({ request, session }: HttpContextContract): Promise<any> {
    let { page = 1, reset, ...data } = request.qs()

    //!\ Not use session for ajax request
    if (!Object.keys(data).length && session.has('redirectsFilter') && !request.ajax()) {
      data = session.get('redirectsFilter')
    }

    if (reset) {
      if (reset === 'all') {
        data = {}
        session.forget('redirectsFilter')
        return data
      } else {
        delete data[reset]
      }
    }

    data = await validator.validate({
      schema: schema.create({
        search: schema.string.optional(),
        code: schema.number.optional(),
      }),
      data,
    })

    //!\ Not modify session for ajax request
    if (request.ajax()) {
      return data
    }

    if (Object.keys(data).length) {
      data.page = page
      session.put('redirectsFilter', data)
    } else {
      session.forget('redirectsFilter')
    }

    data.page = page

    return data
  }
}
