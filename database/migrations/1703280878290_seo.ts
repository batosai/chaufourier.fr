import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'seo'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('title', 255).nullable()
      table.string('description').nullable()
      table.uuid('image_id').nullable().references('media.id')
      table.string('robots', 255).nullable()
      table.string('canonical', 255).nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.alterTable('articles', (table) => {
      table.uuid('seo_id').nullable().references('seo.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)

    this.schema.alterTable('articles', (table) => {
      table.dropColumn('seo_id')
    })
  }
}
