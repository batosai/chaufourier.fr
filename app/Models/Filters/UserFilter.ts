import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class UserFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof User, User>

  lastname(value: string) {
    this.$query.where((builder) => {
      builder
        .where('lastname', 'LIKE', `%${value}%`)
    })
  }

  firstname(value: string) {
    this.$query.where((builder) => {
      builder
        .where('firstname', 'LIKE', `%${value}%`)
    })
  }

  search(value: string) {
    this.$query.where((builder) => {
      builder
        .where('firstname', 'LIKE', `%${value}%`)
        .orWhere('lastname', 'LIKE', `%${value}%`)
        .orWhere('email', 'LIKE', `%${value}%`)
    })
  }
}
