import Application from '@ioc:Adonis/Core/Application'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import type { ILanguageRegistration } from 'shiki'
import shiki from 'shiki'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready

    const Server = this.app.container.resolveBinding('Adonis/Core/Server')
    const MediaService = this.app.container.use('App/Services/MediaService')

    const myLanguage: ILanguageRegistration = {
      id: "edge",
      scopeName: 'text.html.edge',
      path: Application.resourcesPath("syntaxes/edge.tmLanguage.json"),
      // grammar: myLanguageGrammar,
      aliases: ['edge'],
    }

    const highlighter = await shiki
    .getHighlighter({ theme: 'nord', })
    await highlighter.loadLanguage(myLanguage)

    Server.hooks.before(async (ctx) => {
      ctx.view.share({
        media: new MediaService.default(),
        highlighter
      })
    })

  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
