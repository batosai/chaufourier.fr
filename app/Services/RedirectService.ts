import Redirect from 'App/Models/Redirect'

export default class RedirectService {
  constructor() {}

  public static async handle({ source, destination, code = 301 }): Promise<any> {

    await Redirect
      .query()
      .where('source', destination)
      .delete()

    if (source != destination) {
      const redirect = await Redirect.updateOrCreate({ source }, { source, destination, code })

      await Redirect
        .query()
        .where('destination', source)
        .andWhereNot('source', destination)
        .update({ destination })

      return redirect
    }

    return null
  }
}
