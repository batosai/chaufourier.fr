import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

export default Factory.define(User, ({ faker }) => {
  return {
    lastname: faker.name.lastName(),
    firstname: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    disabled: false,
  }
})
  .state('disabled', (user) => (user.disabled = true))
  .build()
