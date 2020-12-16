import { PlaneObject } from "./action_interfaces.ts";

export interface Settings {
  orders: {
    [k in string]: Order
  }
}

export interface ActionSettings {
  use: string
  params: PlaneObject
}

export interface Schedule {
  cron?: string
}

export interface Order {
  schedule: Schedule
  from: ActionSettings
  to: ActionSettings
}
