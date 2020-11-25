import { PlaneObject } from "./interfaces.ts"


const convert = (params: PlaneObject, fromParams: PlaneObject): PlaneObject => {
  return Object.entries(params).map(([key, value]) => {
    if (typeof(value) === 'string') {
      const splitL = value.split('{');
      if (splitL.length > 1) {
        return {
          key,
          value: splitL.map((l) => {
            const splitR = l.split('}')
            if (splitR.length > 1) {
              const paramKey = splitR[0]
              return splitR.reduce((prev, next, index) => {
                if (index === 0) {
                  return (fromParams[paramKey.trim()] ?? `${paramKey} is not exist in From Response`).toString()
                }
                return prev + next
              }, '')
            }
            return l;
          }).reduce((a,b) => a+b)
        }
      }
    }
    return {
      key,
      value
    }
  }).reduce((acc, param) => {
    return {
      ...acc,
      [param.key]: param.value
    }
  }, {})
};

export default convert
