export interface Settings {
  jobs: Job[]
}

export interface PlaneObject {
  [k: string]: string | number | PlaneObject | (string | number | PlaneObject)[]
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
