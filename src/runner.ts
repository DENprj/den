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

const buildJobScheduler = (setting: Settings) => {

  const from = buildFromAction()
  const to = buildToAction()

  const result = await from()
  to(result)
  return createSchedule
}

const run = async (config: LoadingConfig) => {
  const settings = await loadSettings(config)
  const scheduler = settings.map((s) => buildJobScheduler(s))
}

export default run
