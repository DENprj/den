import { PlaneObject, Request } from "../action_interfaces.ts"

export const validateRequest = (req: Request<any>, params: PlaneObject) => {
  const requestEntries = Object.entries(params)
  Object
    .entries(req)
    .forEach(([defKey, payload]) => {
      const{ validator, type, optional } = payload 
      const valid = requestEntries.some(([key, v]) => {
        if (defKey === key && typeof(v) === type) {
          if (validator) {
            const errMsg = validator(v)
            if (errMsg) {
              console.error(errMsg)
              return false;
            }
          }
          return true;
        }
        return !!optional || !!payload.default
      })
      if (!valid) {
        throw new Error(`${defKey} is not defined`)
      }
    })
}

export const injectDefaultParam = (req: Request<any>, params: PlaneObject) => {
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
