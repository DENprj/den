export type Primitive = undefined | string | number | boolean | null | object

export interface PlaneObject {
  [k: string]: Primitive | PlaneObject | (Primitive | PlaneObject)[]
}

interface Param {
  description: string;
  type: 'string' | 'boolean' | 'number' | 'object' | 'bigint' | 'undefined';
  optional?: boolean
  default?: Primitive
}

export type Response<T> = {
  [K in keyof T]: Param;
}

export type  Request<T> =  {
  [K in keyof T]: Param & {
    validator?: (p: T[K]) => string | undefined
  };
}

export interface From<T, R> {
  request: Request<T>;
  response: Response<R>;
  run: (param: T) => R | undefined | null | Promise<R | null | void> ;
}

export interface To<T> {
  request: Request<T>;
  run: (param: T) => void;
}
