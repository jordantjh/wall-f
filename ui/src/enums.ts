export enum Command {
  start = "start",
  place = "place",
  done = "done",
  repair = "repair",
  reset = "reset"
}

export enum RobotState {
  Idle = "Idle",
  Picking = "Picking",
  Placing = "Placing",
  Failed = "Failed",
  Repairing = "Repairing"
}