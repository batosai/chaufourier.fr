import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
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
  }
}
