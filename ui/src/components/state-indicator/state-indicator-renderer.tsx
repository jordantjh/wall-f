import React from "react";
import { RobotState } from "../../enums";

interface IStateIndicatorRendererProps {
  state: RobotState
}

export const StateIndicatorRenderer: React.FunctionComponent<IStateIndicatorRendererProps> = ({
  state
}) => {
  return (
    <div style={{ padding: "1.2rem 0" }}>
      <span>State:</span>
      <span style={{ fontWeight: "bold", marginLeft: "0.2rem", fontSize: "1.8rem" }}>
        {state}
      </span>
    </div>
  );
}