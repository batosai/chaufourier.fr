import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Role from 'App/Enums/Roles'

export default class extends BaseSeeder {
  public async run() {
    const users = await User.createMany([
      {
        lastname: 'adonis',
        firstname: 'virk',
        email: 'virk@adonisjs.com',
        password: 'secret',
      },
      {
        lastname: 'adonis',
        firstname: 'romain',
        email: 'romain@adonisjs.com',
        password: 'supersecret',
      },
    ])
    await users[0].assignRole(Role.ADMIN)
    await users[1].assignRole(Role.MEMBER)
  }
}
