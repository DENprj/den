import { To, PlaneObject } from '../src/action_interfaces.ts';

interface Req extends PlaneObject {
  message: string
  submessage: string
}

const to: To<Req> = {
  request : {
    message: {
      type: 'string',
      description: 'out put message'
    },
    submessage: {
      type: 'string',
      optional: true,
      description: 'sub message',
      default: 'hello'
    }
  },
  async run(param){
    console.log(param.message)
    console.log(param.submessage)
  }
}


export default to
