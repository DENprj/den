export type Primitive = undefined | string | number | boolean | null

export interface PlaneObject {
  [k: string]: Primitive | PlaneObject | (Primitive | PlaneObject)[]
}

interface Param {
  description: string;
  type: 'string' | 'boolean' | 'number' | 'object' | 'bigint';
  optional?: boolean
  default?: Primitive
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
  run: (param: T) => R | Promise<R> | undefined | null;
}

export interface To<T extends PlaneObject> {
  request: Request<T>;
  run: (param: T) => void;
}
