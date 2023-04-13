/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'
import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Application from '@ioc:Adonis/Core/Application'
import I18n from '@ioc:Adonis/Addons/I18n'

import Audit from "App/Models/Audit";

Event.on('db:query', (query) => {
  if (Application.inProduction) {
    Logger.debug(query.sql)
  } else {
    Database.prettyPrint(query)
  }
})

Event.on('i18n:missing:translation', I18n.prettyPrint)

Event.on("audit:new", async ({ user_id, action, target, target_id, payload }) => {
  await Audit.create({
    user_id,
    action,
    target,
    target_id: String(target_id),
    payload
  })
})
