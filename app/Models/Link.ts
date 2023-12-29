import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'

export default class Link extends BaseModel {
  public static table = 'articles'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true, serializeAs: null })
  public id: string

  @column({ serializeAs: 'name' })
  public title: string

  @computed()
  public get description() {
    return ''
  }

  @computed()
  public get href() {
    return Route.builder()
      .prefixUrl(Env.get('APP_URL'))
      .params({ id: this.id })
      .make('admin.articles.edit')
  }
}
