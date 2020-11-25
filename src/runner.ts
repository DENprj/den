import { buildFrom, buildTo } from "./action_builder.ts";
import { LoadingConfig } from "./args_parser.ts";
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

const buildJobScheduler = async (setting: Settings) => {
  const runners = await setting.jobs.map(async (job) => {
    const from = await buildFrom(job.from)
    const to =  await buildTo(job.to)
    const suchedule = createSchedule(job.cron)
    return () => {
      suchedule(() => {
        from()
          .then(to)
          .then(() => {
            console.log('done job')
          })
      })
    }
  })

  return Promise.all(runners)
}

const run = async (config: LoadingConfig) => {
  const settings = await loadSettings(config);
  const runners = settings.map(async (s) => await buildJobScheduler(s));
  (await runners).forEach(schedulers => {
    Promise
      .resolve(schedulers)
      .then(jobs => jobs.forEach(job => job()))
  })
}

export default run
