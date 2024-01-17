import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run() {
    await this.runSeeder(await import('../User'))
    await this.runSeeder(await import('../development/User'))
    await this.runSeeder(await import('../Tag'))
    await this.runSeeder(await import('../Article'))
    await this.runSeeder(await import('../Redirect'))
  }

  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }
}
