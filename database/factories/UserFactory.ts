import Factory from '@ioc:Adonis/Lucid/Factory'
import Drive from '@ioc:Adonis/Core/Drive'
import { file } from '@ioc:Adonis/Core/Helpers'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import User from 'App/Models/User'

export default Factory.define(User, async ({ faker }) => {

  const fakeAvatar = await file.generatePng('1mb')
  const avatar = new Attachment({
    extname: 'png',
    mimeType: 'image/png',
    size: 5 * 1000,
    name: `avatars/${fakeAvatar.name}`,
  })

  avatar.isPersisted = true
  Drive.fake()
  await Drive.put(avatar.name, fakeAvatar.contents)

  return {
    lastname: faker.name.lastName(),
    firstname: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    disabled: false,
    // avatar
  }
})
  .state('disabled', (user) => (user.disabled = true))
  .build()
