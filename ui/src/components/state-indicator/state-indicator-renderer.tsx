import React from "react";
import { Row } from "antd";
import { RobotState } from "../../enums";

interface IStateIndicatorRendererProps {
  state: RobotState
}

export const StateIndicatorRenderer: React.FunctionComponent<IStateIndicatorRendererProps> = ({
  state
}) => {
  return (
    <Row style={{ padding: "0.9rem 1.4rem" }} align="middle">
      <div>State:</div>
      <div style={{ fontWeight: "bold", marginLeft: "0.2rem", fontSize: "1.5rem" }}>
        {state}
      </div>
    </Row>
  );
}