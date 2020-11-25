import { parseArgs } from "./args_parser.ts"
import run from "./runner.ts"

const args = Deno.args
console.log(args)
const config = parseArgs(args)
await run(config)
