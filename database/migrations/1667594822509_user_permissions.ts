import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserPermissions extends BaseSchema {
  protected permissionPivotTable = 'user_has_permissions'
  protected rolePivotTable = 'user_has_roles'

  public async up() {
    this.schema.createTable(this.permissionPivotTable, (table) => {
      table.integer('permission_id').unsigned().references('id').inTable('permissions').onDelete('CASCADE')
      table.integer('model_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
    })

    this.schema.createTable(this.rolePivotTable, (table) => {
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')
      table.integer('model_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.permissionPivotTable)
    this.schema.dropTable(this.rolePivotTable)
  }
}
