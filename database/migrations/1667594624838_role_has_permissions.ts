import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RoleHasPermissions extends BaseSchema {
  protected tableName = 'role_has_permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('permission_id').unsigned().references('id').inTable('permissions').onDelete('CASCADE')
      table.integer('model_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
