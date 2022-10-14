// assuming this is placed in a new file called `tests/playwright-client.ts`
import type { PluginFn } from '@japa/runner'
import playwright from 'playwright'
import type { Browser, Page } from 'playwright'
import { getDocument, getQueriesForElement, queries } from 'playwright-testing-library'

declare module '@japa/runner' {
  interface TestContext {
    page: Page
    login(email: string, password: string): Promise<void>
    getScreen(): Promise<ReturnType<typeof getQueriesForElement>>
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
              await test.context.page.goto(test.context.route('auth.create')) // go to login page
              const loginDoc = await getDocument(test.context.page)
              const emailInput = await queries.getByLabelText(loginDoc, 'Your email') // get the email input
              const passwordInput = await queries.getByLabelText(loginDoc, 'Your password') // get the password input

              await emailInput.fill(email) // enter email arg
              await passwordInput.fill(password) // enter password arg

              await (await queries.findByText(loginDoc, 'Login')).click() // submit the form
            }
            test.context.getScreen = async () => {
              return getQueriesForElement(await getDocument(test.context.page))
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
