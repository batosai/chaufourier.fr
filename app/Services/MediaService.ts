import Media from 'App/Models/Media'

export default class MediaService {
  constructor() {}

  public async get(id: string): Promise<any> {
    return await Media.find(id)
  }
}
