import { PlaneObject } from "./action_interface.ts";

export interface Settings {
  jobs: Job[]
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
