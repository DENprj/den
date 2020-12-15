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

export interface Order {
  cron: string
  from: ActionSettings
  to: ActionSettings
}
