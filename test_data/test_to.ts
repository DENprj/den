import { To } from '../src/action_interface.ts';
import { PlaneObject } from "../src/interfaces.ts";

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
