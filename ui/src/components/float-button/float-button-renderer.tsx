import React from "react";
import { Affix, Button, Tooltip } from "antd";
import { HistoryOutlined } from "@ant-design/icons";

interface IFloatButtonRendererProps {
  tooltipMessage: string
  onClick: () => void;
}

export const FloatButtonRenderer: React.FunctionComponent<IFloatButtonRendererProps> = ({
  tooltipMessage, onClick
}) => {
  return (
    <Affix style={{
      position: "fixed",
      bottom: 30,
      right: 30,
    }}>
      <Tooltip title={tooltipMessage}>
        <Button
          type="primary"
          shape="round"
          icon={<HistoryOutlined />}
          size="large"
          onClick={onClick}
          style={{ backgroundColor: "#fff", border: "0 solid #fff", color: "#333" }}
        />
      </Tooltip>
    </Affix>
  );
}