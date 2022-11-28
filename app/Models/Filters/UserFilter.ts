import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class UserFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof User, User>

  lastname(value: string) {
    this.$query.where((builder) => {
      builder.whereLike('lastname', `%${value}%`)
    })
  }

  firstname(value: string) {
    this.$query.where((builder) => {
      builder.whereLike('firstname', `%${value}%`)
    })
  }

  order(value: string) {
    const order = value.split('+')
    this.$query.orderBy(`${order[0]}`, order[1] === 'asc' ? 'asc' : 'desc')
  }

  disabled(value: string) {
    this.$query.where((builder) => {
      builder.where('disabled', value)
    })
  }

  role(value: number) {
    this.$query.where((builder) => {
      builder.where('role', value)
    })
  }

  search(value: string) {
    this.$query.where((builder) => {
      builder
        .whereLike('firstname', `%${value}%`)
        .orWhereLike('lastname', `%${value}%`)
        .orWhereLike('email', `%${value}%`)
    })
  }
}
