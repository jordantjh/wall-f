import React from "react";
import { Command } from "../../enums";

interface IEntryRendererProps {
  command: Command,
  timestamp: string
}

export const EntryRenderer: React.FunctionComponent<IEntryRendererProps> = ({
  command, timestamp
}) => {
  return (
    <p>
      {command}, {timestamp}
    </p>
  );
}