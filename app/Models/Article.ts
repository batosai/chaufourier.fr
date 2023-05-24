import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import { BaseModel, column, beforeCreate, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import ArticleFilter from 'App/Models/Filters/ArticleFilter'
import User from './User'

export default class Article extends compose(BaseModel, Filterable) {
  public static selfAssignPrimaryKey = true
  public static $filter = () => ArticleFilter

  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title'],
  })
  public slug: string

  @column()
  public body: JSON

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships

  @hasOne(() => User)
  public user: HasOne<typeof User>

  // Hooks

  @beforeCreate()
  public static assignUuid(article: Article) {
    article.id = uuid()
  }
}
