import { parse } from "https://deno.land/std@0.77.0/flags/mod.ts"
import { isYamlFile } from "./util.ts"

export interface LoadingConfig {
  jobFilePath?: string
  jobFolderPath?: string
}
interface Args {
  _: Array<string | number>
  f?: string
}
export const parseArgs = (args: string[]): LoadingConfig => {
   const argsObj = parse(args) as Args
   if (argsObj.f) {
    if (isYamlFile(argsObj.f)) {
      return {
        jobFilePath: argsObj.f
      }
    }
    return {
        jobFolderPath: argsObj.f
      }
   }
   return {
     jobFolderPath: '~/.orderly'
   }
}