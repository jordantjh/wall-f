import React from "react";

interface ISystemMessageRendererProps {
  message: string;
}

export const SystemMessageRenderer: React.FunctionComponent<ISystemMessageRendererProps> = ({
  message
}) => {
  return (
    <div style={{ padding: "0.9rem 1.4rem" }}>
      "{message}"
    </div>
  );
}