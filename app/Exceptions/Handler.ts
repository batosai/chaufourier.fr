/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Sentry from '@ioc:Adonis/Addons/Sentry'
import Logger from '@ioc:Adonis/Core/Logger'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import Application from '@ioc:Adonis/Core/Application'
import Redirect from 'App/Models/Redirect'

export default class ExceptionHandler extends HttpExceptionHandler {
  // protected disableStatusPagesInDevelopment = false
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    const redirect = await Redirect.findBy('source', ctx.request.url())

    if (redirect) {
      return ctx.response.redirect().status(redirect.code).toPath(redirect.destination)
    }

    if (error.code === 'E_VALIDATION_FAILURE') {
      ctx.up.setTarget(ctx.up.getFailTarget())
    }

    if (Application.nodeEnvironment === 'production' && error.code !== 'E_ROUTE_NOT_FOUND') {
      Sentry.setTag('url', ctx.request.url())
      Sentry.setTag('hostname', ctx.request.hostname())
      Sentry.setTag('ajax', ctx.request.ajax() ? true : false)
      Sentry.setTag('method', ctx.request.method())
      if (ctx.params) {
        Sentry.setTag('params', JSON.stringify(ctx.params))
      }
      if (ctx.params.slug) {
        Sentry.setTag('slug', ctx.params.slug)
      }
      Sentry.captureException(error)
    }

    return super.handle(error, ctx)
  }
}
