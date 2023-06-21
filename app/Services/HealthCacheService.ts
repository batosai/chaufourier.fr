import Cache from '@ioc:Adonis/Addons/Cache'
import si from 'systeminformation'
import execa from 'execa'

export default class HealthCacheService {
  constructor() {}

  public static async versions(): Promise<Object|undefined> {
    return Cache.remember('si_versions', null, async () =>
      await si.versions(
        'openssl,node,npm,git,mysql,redis,docker,postgresql,python3,pip3,java,gcc,bash'
      )
    )
  }

  public static async dockerInfo(): Promise<Object|undefined> {
    return Cache.remember('si_docker_info', null, async () =>
      await si.dockerInfo()
    )
  }

  public static async dockerImages(): Promise<Object|undefined> {
    return Cache.remember('si_docker_images', null, async () =>
      await si.dockerImages()
    )
  }

  public static async dockerAll(): Promise<Object|undefined> {
    return Cache.remember('si_docker_all', null, async () =>
      await si.dockerAll()
    )
  }

  public static async system(): Promise<Object|undefined> {
    return Cache.remember('si_system', null, async () => {
      return await {
        system: await si.system(),
        graphics: await si.graphics(),
        osInfo: await si.osInfo(),
        diskLayout: await si.diskLayout(),
      }
    })
  }

  public static async systemPerf(): Promise<Object|undefined> {
    return Cache.remember('si_system_perf', 60 * 2, async () => {
      const fsSize = await si.fsSize()
      const disks = {
        total: 0,
        used: 0,
      }
      fsSize.forEach((disk) => {
        if (disk.size) {
          disks.total += disk.size
          disks.used += disk.used
        }
      })

      return await {
        time: await si.time(),
        inetLatency: await si.inetLatency(),
        cpu: await si.cpu(),
        cpuTemperature: await si.cpuTemperature(),
        currentLoad: await si.currentLoad(),
        mem: await si.mem(),
        processLoad: await si.processLoad('node,docker'), // add containerName
        fsSize,
        disks,
      }
    })
  }

  public static async packages(): Promise<Object|undefined> {
    return Cache.remember('npm_packages', null, async () => {
      let packages = { dependencies: {}, devDependencies: {} }
      try {
        const { stdout } =  await execa('npm', ['ls', '-l', '--json'])
        packages = JSON.parse(stdout)
      } catch (error) {
        console.log(error)
      }
      return packages
    })
  }

  public static async outdated(): Promise<JSON|undefined> {
    return Cache.remember('npm_outdated', null, async () => {
      try {
        const { stdout } =  await execa('npm', ['outdated', '--json'])
        return JSON.parse(stdout)
      } catch (error) {
        return JSON.parse(error.stdout)
      }
    })
  }
}
