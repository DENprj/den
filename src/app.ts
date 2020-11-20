import { parseArgs } from "./args_parser.ts"

const args = Deno.args
console.log(args)
const config = parseArgs(args)
if (config.jobFilePath) {
  
}
