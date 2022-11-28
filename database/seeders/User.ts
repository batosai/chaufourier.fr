import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Roles from 'App/Enums/Roles'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        role: Roles.ADMIN,
        lastname: 'adonis',
        firstname: 'virk',
        email: 'virk@adonisjs.com',
        password: 'secret',
      },
      {
        role: Roles.USER,
        lastname: 'adonis',
        firstname: 'romain',
        email: 'romain@adonisjs.com',
        password: 'supersecret',
      },
    ])
  }
}
