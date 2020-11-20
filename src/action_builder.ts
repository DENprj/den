import { Action, Reaction } from "./action_interface.ts"
import { ActionSettings, PlaneObject } from './interfaces.ts'

export const buildAction = async (actionSettings: ActionSettings)  => {
  const url = actionSettings.use
  const mod = await import(url)
  const action = mod.default as Action<unknown, unknown>

  const definition = action.definitionOfRequest
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
    return action.run(actionSettings.params)
  }
}

export const buildReacton = async (actionSettings: ActionSettings)  => {
  const url = actionSettings.use
  const mod = await import(url)
  const reaction = mod.default as Reaction<unknown>

  const definition = reaction.definitionOfRequest
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
    const parseParams = (params: PlaneObject) => {
      Object.entries(params).map(([key, value]) => {
        if (typeof(value) === 'string') {
          const splitB = value.split('{')
          return {

          }
        }
        return {
          key,
          value
        }
      })
    }
    return reaction.run(actionSettings.params)
  }
}
