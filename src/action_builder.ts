import { From, PlaneObject, To, Request } from "./action_interfaces.ts"
import { ActionSettings } from './interfaces.ts'
import convert from "./param_converter.ts"

const validateRequest = (req: Request<any>, params: PlaneObject) => {
  const requestEntries = Object.entries(params)
  Object
    .entries(req)
    .forEach(([defKey, { validator, type, optional }]) => {
      const valid = requestEntries.some(([key, v]) => {
        if (defKey === key && typeof(v) === type) {
          if (validator) {
            return validator(v)
          }
          return true
        }
        return !!optional
      })
      if (!valid) {
        throw new Error(`${defKey} is not defined`)
      }
    })
}

const injectDefaultParam = (req: Request<any>, params: PlaneObject) => {
  console.log(req, params)
  return Object
    .entries(req)
    .map(([key, v ]): PlaneObject => {
      return  {
        [key]: params[key] ?? v.default
      }
    })
    .reduce((prev, next): PlaneObject => {
      return Object.assign(prev, next)
    });
}

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
