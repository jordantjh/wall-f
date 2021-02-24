import React from "react";

interface ISystemMessageRendererProps {
  message: string;
}

export const SystemMessageRenderer: React.FunctionComponent<ISystemMessageRendererProps> = ({
  message
}) => {
  return (
    <div style={{ padding: "1.2rem 0" }}>
      "{message}"
    </div>
  );
}