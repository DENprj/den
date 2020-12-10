import { PlaneObject } from "./interfaces.ts";

interface Param {
  description: string;
  type: 'string' | 'boolean' | 'number' | 'object';
}

export type Response<T extends PlaneObject> = {
  [K in keyof T]: Param;
}

export type  Request<T extends PlaneObject> =  {
  [K in keyof T]: Param & {
    validator?: (p: T[K]) => boolean
  };
}

export interface From<T extends PlaneObject, R extends PlaneObject> {
  request: Request<T>;
  response: Response<R>;
  run: (param: T) => R | Promise<R>;
}

export interface To<T extends PlaneObject> {
  request: Request<T>;
  run: (param: T) => void;
}
