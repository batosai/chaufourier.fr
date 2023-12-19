import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready

    const Server = this.app.container.resolveBinding('Adonis/Core/Server')
    const MediaService = this.app.container.use('App/Services/MediaService')

    Server.hooks.before(async (ctx) => {
      ctx.view.share({ media: new MediaService.default() })
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
