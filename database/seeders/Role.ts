import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from '@ioc:Verful/Permissions/Role'

export default class extends BaseSeeder {
  public async run () {
    await Role.create({ name: 'admin' })
    await Role.create({ name: 'member' })
  }
}
