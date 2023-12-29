import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import {
  BaseModel,
  column,
  computed,
  beforeCreate,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
  scope,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import { types } from '@ioc:Adonis/Core/Helpers'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import ArticleFilter from 'App/Models/Filters/ArticleFilter'
import User from './User'
import Tag from './Tag'
import Media from './Media'
import Seo from './Seo'

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
  public visible: boolean

  @column()
  public userId: string

  @column()
  public imageId: string | null

  @column()
  public seoId: string | null

  @column.dateTime()
  public publishedOn: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Computed

  @computed()
  public get blocks() {
    if (this.body) {
      // string for sqlite db
      return types.isString(this.body) ? JSON.parse(this.body).blocks : this.body['blocks']
    }
    return {}
  }

  public isVisibled() {
    if (
      !this.visible ||
      (this.publishedOn && this.publishedOn.toMillis() > DateTime.utc().toMillis())
    ) {
      return false
    }
    return true
  }

  // Relationships

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Media, {
    foreignKey: 'imageId',
  })
  public image: BelongsTo<typeof Media>

  @hasOne(() => Seo)
  public seo: HasOne<typeof Seo>

  @manyToMany(() => Tag, {
    pivotTimestamps: true,
  })
  public tags: ManyToMany<typeof Tag>

  // Scope

  public static visibleTo = scope((query, user: User) => {
    if (user.isAdmin) {
      return
    }

    query.where('userId', 'user.id')
  })

  public static published = scope((query) => {
    query.where('visible', true).andWhere('publishedOn', '<=', DateTime.utc().toSQL())
  })

  // Hooks

  @beforeCreate()
  public static assignUuid(article: Article) {
    article.id = uuid()
  }
}
