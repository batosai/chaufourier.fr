/**
 * File source: https://bit.ly/3ukaHTz
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

// import { join } from 'node:path'
import type { Config } from '@japa/runner'
import TestUtils from '@ioc:Adonis/Core/TestUtils'
import { assert, runFailedTests, specReporter, apiClient } from '@japa/preset-adonis'
import { browserClient } from '@japa/browser-client'
import { firefox } from 'playwright'
import { tableDrivenHtmlReporter } from 'table-driven-html-reporter'
import { playwrightLogin } from './plugins/playwright-login'

/*
|--------------------------------------------------------------------------
| Japa Plugins
|--------------------------------------------------------------------------
|
| Japa plugins allows you to add additional features to Japa. By default
| we register the assertion plugin.
|
| Feel free to remove existing plugins or add more.
|
*/
export const plugins: Config['plugins'] = [
  assert(),
  runFailedTests(),
  apiClient(),
  playwrightLogin(),
  browserClient({
    contextOptions: {
      // recordVideo: {
      //   dir: join(__dirname, '../tests/records')
      // },
      ignoreHTTPSErrors: true,
    },
    runInSuites: ['browser'],
    async launcher(options) {
      return firefox.launch({
        ...options,
        headless: process.env.HEADLESS === 'true',
        slowMo: 300,
      })
    },

  }),
]

/*
|--------------------------------------------------------------------------
| Japa Reporters
|--------------------------------------------------------------------------
|
| Japa reporters displays/saves the progress of tests as they are executed.
| By default, we register the spec reporter to show a detailed report
| of tests on the terminal.
|
*/
export const reporters: Config['reporters'] = [specReporter(), tableDrivenHtmlReporter()]

/*
|--------------------------------------------------------------------------
| Runner hooks
|--------------------------------------------------------------------------
|
| Runner hooks are executed after booting the AdonisJS app and
| before the test files are imported.
|
| You can perform actions like starting the HTTP server or running migrations
| within the runner hooks
|
*/
export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [
    () => TestUtils.ace().loadCommands(),
    () => TestUtils.db().migrate(),
    // () => TestUtils.db().seed()
  ],
  teardown: [],
}

/*
|--------------------------------------------------------------------------
| Configure individual suites
|--------------------------------------------------------------------------
|
| The configureSuite method gets called for every test suite registered
| within ".adonisrc.json" file.
|
| You can use this method to configure suites. For example: Only start
| the HTTP server when it is a functional suite.
*/
export const configureSuite: Config['configureSuite'] = (suite) => {
  if (suite.name === 'functional') {
    suite.setup(() => TestUtils.httpServer().start())
  }
  if (suite.name === 'browser') {
    suite.setup(() => TestUtils.httpServer().start())
  }
}
