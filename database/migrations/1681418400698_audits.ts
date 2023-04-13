import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'audits'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()

      table.string("user_id")
      table.string("action")
      table.string("target")
      table.string("target_id")
      table.jsonb("payload")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true })
      table.timestamp("updated_at", { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
