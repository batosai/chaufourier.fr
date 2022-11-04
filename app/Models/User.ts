import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { column, computed, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { Authorizable } from '@ioc:Verful/Permissions/Mixins'
import { Filterable  } from '@ioc:Adonis/Addons/LucidFilter'
import UserFilter from 'App/Models/Filters/UserFilter'

const config = {
  permissionsPivotTable: 'user_has_permissions',
  rolesPivotTable: 'user_has_roles'
}
export default class User extends compose(BaseModel, Filterable, Authorizable(config)) {
  public static $filter = () => UserFilter

  // Columns

  @column({ isPrimary: true })
  public id: number

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

  // Getters

  get isAdmin() {
    return this.hasRole('admin')
  }

  get isMember() {
    return this.hasRole('member')
  }

  // Hooks

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
