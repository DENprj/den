import { assertEquals } from "https://deno.land/std@0.77.0/testing/asserts.ts"
import { parseArgs } from "./args_parser.ts"

Deno.test('default parse', () => {
  const result = parseArgs([])
  assertEquals(result.jobFolderPath, '~/.den') 
})

Deno.test('if sat yaml file path,  defined file path ', () => {
  const result = parseArgs(['--f', 'test.yaml'])
  assertEquals(result.jobFilePath, 'test.yaml') 
  const result2 = parseArgs(['--f', './c/test.yml'])
  assertEquals(result2.jobFilePath, './c/test.yml') 
})

Deno.test('if sat folder,  defined folder path ', () => {
  const result = parseArgs(['--f', 'test'])
  assertEquals(result.jobFolderPath, 'test') 
  const result2 = parseArgs(['--f', '../c'])
  assertEquals(result2.jobFolderPath, '../c') 
})
