import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Roles from 'App/Enums/Roles'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        role: Roles.ADMIN,
        lastname: 'Chaufourier',
        firstname: 'Jeremy',
        email: 'jeremy@chaufourier.fr',
        password: 'secret',
      },
    ])
  }
}
