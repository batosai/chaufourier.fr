import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import {
  attachment,
  AttachmentContract,
  Attachmentable,
} from '@ioc:Adonis/Addons/AttachmentAdvanced'

export default class Media extends compose(BaseModel, Attachmentable) {
  public static selfAssignPrimaryKey = true

  // Columns

  @column({ isPrimary: true })
  public id: string

  @column()
  public type: string

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

  // Hooks

  @beforeCreate()
  public static assignUuid(media: Media) {
    media.id = uuid()
  }
}
