
interface Params {
  [key: string]: Param & {
    validator?: <T>(p: T) => boolean
  };
}

interface Param {
  description: string;
  type: 'boolean' | 'number' | 'string' | 'object'
}

interface Response {
  [key: string]: Param;
}

export interface Action<T, R> {
  definitionOfRequest: Params;
  definitionOfResponse: Response;
  run: (param: T) => R | Promise<R>;
}

export interface Reaction<T> {
  definitionOfRequest: Params;
  run: (param: T) => void;
}

