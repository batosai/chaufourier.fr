import Mail from '@ioc:Adonis/Addons/Mail'
import Logger from '@ioc:Adonis/Core/Logger'

Mail.monitorQueue((error, result) => {
  if (error) {
    Logger.error('Unable to send email')
    Logger.warn(error.mail)
    return
  }

  Logger.info('Email sent')
  Logger.info(result!.mail)
  Logger.info(result!.response)
})
