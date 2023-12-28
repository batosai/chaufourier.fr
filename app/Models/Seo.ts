import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Media from './Media'
import Article from './Article'

export default class Seo extends BaseModel {
  public static table = 'seo'
  public static selfAssignPrimaryKey = true

  // Columns

  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public robots: string

  @column()
  public canonical: string

  @column()
  public imageId: string | null

  @column()
  public articleId: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships

  @belongsTo(() => Media, {
    foreignKey: 'imageId',
  })
  public image: BelongsTo<typeof Media>


  @belongsTo(() => Article, {
    foreignKey: 'articleId',
  })
  public article: BelongsTo<typeof Article>

  // Hooks

  @beforeCreate()
  public static assignUuid(seo: Seo) {
    seo.id = uuid()
  }
}
