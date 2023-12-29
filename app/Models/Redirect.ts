import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import RedirectFilter from 'App/Models/Filters/RedirectFilter'

export default class Redirect extends compose(BaseModel, Filterable) {
  public static selfAssignPrimaryKey = true
  public static $filter = () => RedirectFilter

  @column({ isPrimary: true })
  public id: string

  @column()
  public source: string

  @column()
  public destination: string

  @column()
  public code: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Hooks

  @beforeCreate()
  public static assignUuid(redirect: Redirect) {
    redirect.id = uuid()
  }
}
