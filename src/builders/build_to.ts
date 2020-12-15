import { PlaneObject, To } from "../action_interfaces.ts"
import { ActionSettings } from '../interfaces.ts'
import convert from "../param_converter.ts"
import { injectDefaultParam, validateRequest } from "./util.ts"

export const buildTo = async (actionSettings: ActionSettings)  => {
  const url = actionSettings.use
  const mod = await import(url)
  const to = mod.default as To<PlaneObject>

  const request = to.request
  const params = actionSettings.params

  console.log('params')
  validateRequest(request, params)
  const injectedParam = injectDefaultParam(request, params)

  return async (actionResult: PlaneObject) => {
    const converted = convert(injectedParam, actionResult)
    return to.run(converted)
  }
}
