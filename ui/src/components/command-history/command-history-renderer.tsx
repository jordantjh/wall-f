import React from "react";
import { Drawer } from "antd";
import { ICommandRecord } from "../../interfaces";
import { EntryRenderer } from "./entry-renderer";

interface ICommandHistoryRendererProps {
  records: ICommandRecord[];
  onClose: () => void;
  visible: boolean;
}

export const CommandHistoryRenderer: React.FunctionComponent<ICommandHistoryRendererProps> = ({
  records, onClose, visible
}) => {
  return (
    <Drawer
      title="Command History"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      {
        [...records].reverse().map((record) => {
          return <EntryRenderer
            key={record.timestamp}
            command={record.command}
            timestamp={record.timestamp}
          />
        })
      }
    </Drawer>
  );
}