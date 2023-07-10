import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'article_tag'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('article_id').references('articles.id').onDelete('CASCADE')
      table.uuid('tag_id').references('tags.id')
      table.unique(['article_id', 'tag_id'])

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
