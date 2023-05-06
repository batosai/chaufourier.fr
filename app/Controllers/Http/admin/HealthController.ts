import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import si from 'systeminformation'

export default class HealthController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('HealthPolicy').authorize('view')

    const versions = await si.versions('openssl,node,npm,git,mysql,redis,docker,postgresql,python3,pip3,java,gcc,bash')

    return view.render('admin/health/index', {
      versions
    })
  }

  public async system({ view, bouncer }: HttpContextContract) {
    await bouncer.with('HealthPolicy').authorize('view')

    const time = await si.time()
    const system = await si.system()
    const inetLatency = await si.inetLatency()
    const cpu = await si.cpu()
    const cpuTemperature = await si.cpuTemperature()
    const currentLoad = await si.currentLoad()
    const mem = await si.mem()
    const graphics = await si.graphics()
    const osInfo = await si.osInfo()
    const diskLayout = await si.diskLayout()
    const fsSize = await si.fsSize()
    const processLoad = await si.processLoad('node,docker')// add containerName

    const disks = {
      total: 0,
      used: 0
    }
    fsSize.forEach(disk => {
      if (disk.size) {
        disks.total += disk.size
        disks.used += disk.used
      }
    })

    return view.render('admin/health/system', {
      time,
      system,
      inetLatency,
      cpu,
      cpuTemperature,
      currentLoad,
      mem,
      graphics,
      osInfo,
      diskLayout,
      disks,
      fsSize,
      processLoad,
    })
  }

  public async docker({ view, bouncer }: HttpContextContract) {
    await bouncer.with('HealthPolicy').authorize('view')

    const dockerInfo = await si.dockerInfo()
    const dockerImages = await si.dockerImages()
    const dockerAll = await si.dockerAll()

    return view.render('admin/health/docker', {
      dockerInfo,
      dockerImages,
      dockerAll,
    })
  }
}