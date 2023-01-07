import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import { compose } from '@ioc:Adonis/Core/Helpers'
import {
  column,
  computed,
  beforeSave,
  BaseModel,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import UserFilter from 'App/Models/Filters/UserFilter'
import Roles from 'App/Enums/Roles'
import {
  attachment,
  AttachmentContract
} from '@ioc:Adonis/Addons/AttachmentLite'

export default class User extends compose(BaseModel, Filterable) {
  public static $filter = () => UserFilter

  // Columns

  @column({ isPrimary: true })
  public id: number

  @column()
  public role: string

  @column()
  public firstname: string

  @column()
  public lastname: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @attachment({ folder: 'avatars', preComputeUrl: true })
  public avatar: AttachmentContract

  @column()
  public disabled: boolean

  @column.dateTime({ autoCreate: false })
  public disabledOn: DateTime | null

  @column.dateTime({ autoCreate: false })
  public lastLoginAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // scopes

  public static admin = scope((query: any) => {
    query.where('role', Roles.ADMIN)
  })

  // Hooks

  @computed()
  public get isAdmin() {
    return this.role === Roles.ADMIN
  }

  @computed()
  public get isUser() {
    return this.role === Roles.USER
  }

  @computed()
  public get fullname() {
    return `${this.firstname} ${this.lastname}`
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
    else if (!user.password) {
      user.password = await Hash.make(uuid())
    }
  }

  @beforeSave()
  public static async disabledDate(user: User) {
    if (user.$dirty.disabled) {
      if (user.disabled === true) {
        user.disabledOn = DateTime.local()
      }
      else {
        user.disabledOn = null
      }
    }
  }
}
