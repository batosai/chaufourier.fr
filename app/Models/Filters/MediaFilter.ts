import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Media from 'App/Models/Media'

export default class TagFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Media, Media>

  search(value: string) {
    this.$query.where((builder) => {
      builder.whereLike('title', `%${value}%`)
    })
  }
}
