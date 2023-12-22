import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid('image_id').nullable().references('media.id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('image_id')
    })
  }
}
