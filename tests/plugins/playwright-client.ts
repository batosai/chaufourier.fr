// assuming this is placed in a new file called `tests/playwright-client.ts`
import type { PluginFn } from '@japa/runner'
import playwright from 'playwright'
import type { Browser, Page } from 'playwright'

declare module '@japa/runner' {
  interface TestContext {
    page: Page
    login(email: string, password: string): Promise<void>
  }
}

type BrowserName = 'firefox' | 'webkit' | 'chromium'
type PlaywrightClientArgs = {
  /** defaults to firefox */
  browser?: BrowserName
  suiteName?: string
}

export function playwrightClient({
  browser: browserName = 'firefox',
  suiteName = 'e2e',
}: PlaywrightClientArgs = {}) {
  return async function (_config, runner) {
    runner.onSuite((suite) => {
      if (suite.name === suiteName) {
        let browser: Browser

        suite.setup(async () => {
          // create a new browser instance, headless by default
          browser = await playwright[browserName].launch({ headless: process.env.HEADLESS !== '0' })
          return () => browser.close()
        })

        suite.onGroup((group) => {
          group.each.setup(async (test) => {
            // for each test create a new page so session info is not shared across tests
            test.context.page = await browser.newPage({
              baseURL: `http://${process.env.HOST}:${process.env.PORT}`,
            })
            // this may need to be customized depending on the app setup
            test.context.login = async (email, password) => {
              await test.context.page.goto(test.context.route('auth.session.create')) // go to login page

              await test.context.page.getByLabel('Your email').fill(email)
              await test.context.page.getByLabel('Your password').fill(password)
              await test.context.page.locator('text=validate').click()
            }

            return async () => {
              await test.context.page.close()
            }
          })
        })
      }
    })
  } as PluginFn
}
