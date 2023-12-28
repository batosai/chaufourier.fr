import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import {
  attachment,
  AttachmentContract,
  Attachmentable,
} from '@ioc:Adonis/Addons/AttachmentAdvanced'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import MediaFilter from 'App/Models/Filters/MediaFilter'
import User from './User'

export default class Media extends compose(BaseModel, Attachmentable, Filterable) {
  public static selfAssignPrimaryKey = true
  public static $filter = () => MediaFilter

  // Columns

  @column({ isPrimary: true })
  public id: string

  @column()
  public type: string

  @column()
  public title: string | null

  @column()
  public description: string | null

  @column()
  public alt: string | null

  @column()
  public userId: string

  // @attachment({ folder: 'avatars', preComputeUrl: true, variants: ['thumbnail', 'medium'] })
  // @attachment({ folder: 'avatars', preComputeUrl: true, variants: false })
  @attachment({ folder: 'files', preComputeUrl: true })
  public file: AttachmentContract

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  // Hooks

  @beforeCreate()
  public static assignUuid(media: Media) {
    media.id = uuid()
  }
}
