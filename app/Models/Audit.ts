import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  beforeCreate,
  ModelObject,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Audit extends BaseModel {
  public static selfAssignPrimaryKey = true

  // Columns

  @column({ isPrimary: true })
  public id: string

  @column()
  public label: string

  @column()
  public username: string | number

  @column()
  public userId: string | number

  @column()
  public action: string

  @column()
  public target: string

  @column()
  public targetId: string

  @column()
  public payload: JSON | ModelObject

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships

  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  public user: BelongsTo<typeof User>

  // Hooks

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuid()
  }
}
