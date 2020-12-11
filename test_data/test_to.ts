import { To, PlaneObject } from 'https://raw.githubusercontent.com/aknow2/DEN/main/src/action_interfaces.ts';

interface Req extends PlaneObject {
  message: string
}


const to: To<Req> = {
  request : {
    message: {
      type: 'string',
      description: 'out put message'
    }
  },
  async run(param){
    console.log(param.message)
  }
}


export default to
