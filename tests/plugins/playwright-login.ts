declare module '@japa/runner' {
  interface TestContext {
    login(email: string, password: string): Promise<void>
  }
}

export function playwrightLogin() {
  return async function ({}, runner: any) {
    runner.onSuite((suite) => {
      if (suite.name === 'browser') {
        suite.onGroup((group) => {
          group.each.setup(async (test) => {
            test.context.login = async (email, password) => {
              const page = await test.context.visit(test.context.route('auth.session.create'))

              await page.locator('input[name="email"]').fill(email)
              await page.locator('input[name="password"]').fill(password)
              await page.locator('text=validate').click()

              await page.close()
            }
          })
        })
      }
    })
  }
}
