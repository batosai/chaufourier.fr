import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import TagFilter from 'App/Models/Filters/TagFilter'

export default class Tag extends compose(BaseModel, Filterable) {
  public static selfAssignPrimaryKey = true
  public static $filter = () => TagFilter

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['name'],
  })
  public slug: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Hooks

  @beforeCreate()
  public static assignUuid(tag: Tag) {
    tag.id = uuid()
  }
}
