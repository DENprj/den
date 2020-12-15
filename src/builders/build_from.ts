import { From } from "../action_interfaces.ts"
import { ActionSettings } from '../interfaces.ts'
import { injectDefaultParam, validateRequest } from "./util.ts"

export const buildFrom = async (actionSettings: ActionSettings)  => {
  const url = actionSettings.use
  const mod = await import(url)
  const from = mod.default as From<any, any>

  const request = from.request
  const params = actionSettings.params

  validateRequest(request, params)
  const injectedParam = injectDefaultParam(request, params)
  return async () => {
    return from.run(injectedParam)
  }
}