import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'seo'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().index()

      table.string('title', 255).nullable()
      table.string('description').nullable()
      table.string('robots', 255).nullable()
      table.string('canonical', 255).nullable()
      table.uuid('image_id').nullable().references('media.id')
      table.uuid('article_id').nullable().references('articles.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
