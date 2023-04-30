import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'audits'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string("label").notNullable()
      table.string("action").notNullable()
      table.string("username").notNullable()
      table.string("user_id").notNullable()
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
