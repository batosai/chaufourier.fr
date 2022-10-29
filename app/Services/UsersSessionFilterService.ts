import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validator, schema } from '@ioc:Adonis/Core/Validator'

export default class UserSessionFilterService {
  constructor() {}

  public static async handle({ request, session }: HttpContextContract): Promise<any> {
    let { reset, ...data } = request.qs()

    if(!Object.keys(data).length && session.has('usersFilter')) {
      data = session.get('usersFilter')
    }

    if(reset) {
      if (reset === 'all') {
        data = {}
        session.forget('usersFilter')
        return data
      } else {
        delete data[reset]
      }
    }

    data = await validator.validate({
      schema: schema.create({
        search: schema.string.optional(),
        role: schema.string.optional(),
        status: schema.string.optional(),
        order: schema.string.optional(),
      }),
      data
    })

    if (Object.keys(data).length) {
      session.put('usersFilter', data)
    } else {
      session.forget('usersFilter')
    }

    return data
  }
}
