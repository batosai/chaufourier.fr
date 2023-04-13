import { DateTime } from "luxon"
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm"
import User from "./User"

export default class Audit extends BaseModel {
  // Columns

  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string | number

  @column()
  public action: string

  @column()
  public target: string

  @column()
  public target_id: string

  @column()
  public payload: JSON

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships

  @belongsTo(() => User, {
    foreignKey: "user_id",
    localKey: "id",
  })
  public user: BelongsTo<typeof User>
}
