import { From, To } from "./action_interface.ts"
import { ActionSettings, PlaneObject } from './interfaces.ts'
import convert from "./param_converter.ts"

export const buildFrom = async (actionSettings: ActionSettings)  => {
  const url = actionSettings.use
  const mod = await import(url)
  const from = mod.default as From<unknown, unknown>

  const definition = from.definitionOfRequest
  const requestEntries = Object.entries(actionSettings.params)

  // validation
  Object.entries(definition).forEach(([defKey, { validator, type }]) => {
    const valid = requestEntries.some(([key, v]) => {
      if (defKey === key && typeof(v) === type) {
        if (validator) {
          return validator(v)
        }
        return true
      }
      return false
    })
    if (!valid) {
      throw new Error(`${defKey} is not defined`)
    }
  })

  return async () => {
    return from.run(actionSettings.params)
  }
}

export const buildTo = async (actionSettings: ActionSettings)  => {
  const url = actionSettings.use
  const mod = await import(url)
  const to = mod.default as To<unknown>

  const definition = to.definitionOfRequest
  const requestEntries = Object.entries(actionSettings.params)

  Object.entries(definition).forEach(([defKey, { validator, type }]) => {
    const valid = requestEntries.some(([key, v]) => {
      if (defKey === key && typeof(v) === type) {
        if (validator) {
          return validator(v)
        }
        return true
      }
      return false
    })
    if (!valid) {
      throw new Error(`${defKey} is not defined`)
    }
  })

  return async (actionResult: unknown) => {
    // TODO need to plane object validation
    const converted = convert(actionSettings.params, actionResult as PlaneObject)
    return to.run(converted)
  }
}
