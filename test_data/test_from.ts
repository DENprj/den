import { From, PlaneObject } from 'https://raw.githubusercontent.com/aknow2/DEN/main/src/action_interfaces.ts';

interface Req extends PlaneObject {
  key: string
}

interface Res extends PlaneObject {
  result: boolean;
  message: string
}

const from: From<Req, Res> = {
  request : {
    key: {
      type: 'string',
      description: 'key of request'
    }
  },
  response: {
    result: {
      type: 'boolean',
      description: 'result of boolean'
    },
    message: {
      type: 'string',
      description: 'meesage of result'
    }
  },
  async run(param){
    return {
      result: true,
      message: `this is ${param.key}`
    }
  }
}


export default from
