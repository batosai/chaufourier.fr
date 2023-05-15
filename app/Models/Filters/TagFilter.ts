import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class TagFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof User, User>

  name(value: string) {
    this.$query.where((builder) => {
      builder.whereLike('name', `%${value}%`)
    })
  }

  search(value: string) {
    this.$query.where((builder) => {
      builder.whereLike('name', `%${value}%`)
    })
  }

  order(value: string) {
    const order = value.split('+')
    this.$query.orderBy(`${order[0]}`, order[1] === 'asc' ? 'asc' : 'desc')
  }
}
