import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Media from 'App/Models/Media'

export default class TagFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Media, Media>

  title(value: string) {
    this.$query.where((builder) => {
      builder.whereLike('title', `%${value}%`)
    })
  }

  type(values: [string]) {
    this.$query.where((builder) => {
      builder.whereIn('type', values)
    })
  }

  search(value: string) {
    this.$query.where((builder) => {
      builder.whereLike('title', `%${value}%`)
    })
  }

  order(value: string) {
    const order = value.split('+')
    this.$query.orderBy(`${order[0]}`, order[1] === 'asc' ? 'asc' : 'desc')
  }
}
