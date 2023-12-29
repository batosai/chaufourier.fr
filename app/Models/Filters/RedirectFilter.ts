import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Redirect from 'App/Models/Redirect'

export default class RedirectFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Redirect, Redirect>

  source(value: string) {
    this.$query.where((builder) => {
      builder.whereLike('source', `%${value}%`)
    })
  }

  destination(value: string) {
    this.$query.where((builder) => {
      builder.whereLike('destination', `%${value}%`)
    })
  }

  search(value: string) {
    this.$query.where((builder) => {
      builder.whereLike('source', `%${value}%`).orWhereLike('destination', `%${value}%`)
    })
  }

  code(value: number) {
    this.$query.where((builder) => {
      builder.where('code', value)
    })
  }
}
