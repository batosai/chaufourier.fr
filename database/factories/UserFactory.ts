import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, ({ faker }) => {
  return {
    lastname: faker.internet.userName(),
    firstname: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    disabled: false,
  }

})
.state('disabled', (user) => user.disabled = true)
.build()
