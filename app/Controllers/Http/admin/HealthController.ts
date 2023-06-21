import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HealthCacheService from 'App/Services/HealthCacheService'

export default class HealthController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('HealthPolicy').authorize('view')

    const versions = await HealthCacheService.versions()
    const packages = await HealthCacheService.packages()

    return view.render('admin/health/index', {
      versions,
      packages
    })
  }

  public async system({ view, bouncer }: HttpContextContract) {
    await bouncer.with('HealthPolicy').authorize('view')

    const system = await HealthCacheService.system()
    const systemPerf = await HealthCacheService.systemPerf()

    return view.render('admin/health/system', {
      ...system,
      ...systemPerf,
    })
  }

  public async docker({ view, bouncer }: HttpContextContract) {
    await bouncer.with('HealthPolicy').authorize('view')

    const dockerInfo = await HealthCacheService.dockerInfo()
    const dockerImages = await HealthCacheService.dockerImages()
    const dockerAll = await HealthCacheService.dockerAll()

    return view.render('admin/health/docker', {
      dockerInfo,
      dockerImages,
      dockerAll,
    })
  }

  public async update({ view, bouncer }: HttpContextContract) {
    await bouncer.with('HealthPolicy').authorize('view')

    const packages = await HealthCacheService.outdated()

    return view.render('admin/health/update', {
      packages
    })
  }
}
