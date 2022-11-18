import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { compose } from '@ioc:Adonis/Core/Helpers'
import {
  column,
  computed,
  beforeSave,
  belongsTo,
  BelongsTo,
  BaseModel,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import UserFilter from 'App/Models/Filters/UserFilter'
import Role from './Role'
import Roles from 'App/Enums/Roles'
export default class User extends compose(BaseModel, Filterable) {
  public static $filter = () => UserFilter

  // Columns

  @column({ isPrimary: true })
  public id: number

  @column()
  public roleId: number

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

  @column()
  public disabled: boolean

  @column.dateTime({ autoCreate: false })
  public disabledOn: DateTime

  @column.dateTime({ autoCreate: false })
  public lastLoginAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  // scopes

  public static admin = scope((query: any) => {
    query.whereHas('roles', (query) => {
      query.where('name', Roles.ADMIN)
    })
  })

  // Hooks

  @computed()
  public get isAdmin() {
    return this.roleId === Roles.ADMIN
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
  }
}
