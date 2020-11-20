import * as yaml from "https://deno.land/std@0.77.0/encoding/yaml.ts";
import { Settings } from "./interfaces.ts";
import { isYamlFile } from "./util.ts";
export const loadYamlFile = async (path: string): Promise<Settings[]> => {
  const str = await Deno.readTextFile(path)
  console.log(yaml.parseAll)
  const setting = yaml.parseAll(str) as Settings[]
  console.log(setting)
  return setting
}

export const loadSettingsDir = async (path: string): Promise<Settings[]> => {
  const dirItr = await Deno.readDir(path)
  const pyaml: Promise<Settings[]>[] = []
  for await (const dir of dirItr) {
    if (dir.isFile && isYamlFile(dir.name)) {
      pyaml.push(loadYamlFile(dir.name))
    }
  }
  const result = await Promise.all(pyaml)
  return result.flatMap((v) => v)
}

