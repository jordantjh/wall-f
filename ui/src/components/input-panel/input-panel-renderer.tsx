import React from "react";
import { Command, RobotState } from "../../enums";
import "./input-panel-renderer.css";
import { Button } from "antd";

interface IInputPanelRendererProps {
  state: RobotState;
  failedTimes: Number;
  onActionClick: (command: Command) => void;
  appIsLoading: boolean;
}

export const InputPanelRenderer: React.FunctionComponent<IInputPanelRendererProps> = ({
  state, failedTimes, onActionClick, appIsLoading
}) => {
  return (
    // <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    // <div style={{ backgroundColor: "thistle", width: "100%", display: "flex" }}>
    <div style={{ display: "flex", flex: 1 }}>
      <Button className="input-button" onClick={() => onActionClick(Command.start)} disabled={state !== RobotState.Idle || appIsLoading}>Start</Button>
      <Button className="input-button" onClick={() => onActionClick(Command.place)} disabled={state !== RobotState.Picking || appIsLoading}>Place</Button>
      <Button className="input-button" onClick={() => onActionClick(Command.done)} disabled={state !== RobotState.Placing || appIsLoading}>Done</Button>
      <Button className="input-button" onClick={() => onActionClick(Command.repair)} disabled={(state === RobotState.Repairing || failedTimes < 3) || appIsLoading}>Repair</Button>
      <Button className="input-button" onClick={() => onActionClick(Command.reset)} disabled={!(state === RobotState.Placing || state === RobotState.Repairing || state === RobotState.Failed) || appIsLoading}>Reset</Button>
    </div>
  );
}