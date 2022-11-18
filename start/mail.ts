import Mail from '@ioc:Adonis/Addons/Mail'
import Logger from '@ioc:Adonis/Core/Logger'
import Env from '@ioc:Adonis/Core/Env'

Mail.monitorQueue((error, result) => {
  if (Env.get('NODE_ENV') === 'test') {
    return
  }

  if (error) {
    Logger.error('Unable to send email')
    Logger.warn(`${error.mail}`)
    return
  }

  Logger.info('Email sent')
  Logger.info(`${result!.mail}`)
  Logger.info(`${result!.response}`)
})
