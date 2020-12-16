import { LoadingConfig } from "./args_parser.ts";
import { buildFrom } from "./builders/build_from.ts";
import { buildTo } from "./builders/build_to.ts";
import { loadYamlFile } from "./file_loader.ts";
import { Settings } from "./interfaces.ts";
import createSchedule from "./scheduler.ts";

const loadSettings = async (config: LoadingConfig) => {
  if (config.jobFilePath) {
    return loadYamlFile(config.jobFilePath)
  }
  if (config.jobFolderPath) {
    return loadYamlFile(config.jobFolderPath)
  }
  throw new Error('not found settings folder path')
}

const buildOrders = async (setting: Settings) => {
  const runners = await Object.entries(setting.orders).map(async ( [orderName , order]) => {
    console.log(`build ${orderName} order`)
    const from = await buildFrom(order.from)
    const to =  await buildTo(order.to)
    console.log(`build successful`)
    const suchedule = createSchedule(order.schedule)
    console.log(`schedule ready`)
    return () => {
      suchedule(() => {
        from()
          .then(result => {
            if (result !== null || result !== undefined) {
              return to(result)
            }
            return null
          })
          .then(() => {
            console.log(`done ${orderName}`)
          })
      })
    }
  })

  return Promise.all(runners)
}

const run = async (config: LoadingConfig) => {
  const settings = await loadSettings(config);
  const runners = settings.map(async (s) => await buildOrders(s));
  (await runners).forEach(schedulers => {
    Promise
      .resolve(schedulers)
      .then(jobs => jobs.forEach(job => job()))
  })
}

export default run
