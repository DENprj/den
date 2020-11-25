export interface Settings {
  jobs: Job[]
}

type Primitive = undefined | string | number | null

export interface PlaneObject {
  [k: string]: Primitive | PlaneObject | (Primitive | PlaneObject)[]
}

export interface ActionSettings {
  use: string
  params: PlaneObject
}

export interface Job {
  cron: string
  name: string
  from: ActionSettings
  to: ActionSettings
}
