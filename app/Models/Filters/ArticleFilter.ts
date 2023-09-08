import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Article from 'App/Models/Article'

export default class ArticleFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Article, Article>

  // TODO whereILike Not found in SQLite

  title(value: string) {
    this.$query.where((builder) => {
      builder.whereLike('title', `%${value}%`)
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
