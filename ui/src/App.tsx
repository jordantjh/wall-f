import React from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Spin } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import * as constants from "./constants";
import { Command, RobotState } from "./enums";
import { ICommandRecord } from "./interfaces";
import { Layout } from "antd";
import { WallF } from "./assets/Wall-F";
import { StateIndicator } from "./components/state-indicator";
import { FloatButton } from "./components/float-button";
import { CommandHistory } from "./components/command-history";
import { SystemMessage } from "./components/system-message";
import { InputPanel } from "./components/input-panel";

function App() {
  const [systemMessage, setSystemMessage] = React.useState("System Wall-F is ready.");
  const [robotState, setRobotState] = React.useState(RobotState.Idle);
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [failedTimes, setFailedTimes] = React.useState(0);
  const [robotIsLoading, setRobotIsLoading] = React.useState(false);
  const [commandHistory, setCommandHistory] = React.useState([] as ICommandRecord[]);

  const showDrawer = () => {
    setDrawerVisible(true);
  }

  const onDrawerClose = () => {
    setDrawerVisible(false);
  }

  const getTimeStamp = () => {
    const now = new Date();

    // prepend '0' to single-digit numbers
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  const onActionClick = (action: Command, shouldSetInitialSystemMessage = true) => {
    let endingSystemMessage = "Ready";
    let shouldRetryCommand = false;

    setRobotIsLoading(true);
    if (shouldSetInitialSystemMessage) {
      setSystemMessage("Loading....");
    }

    // add new command to history
    const newCommand = {
      command: action,
      timestamp: getTimeStamp()
    } as ICommandRecord;
    setCommandHistory([...commandHistory, newCommand]);

    // action = Repair
    if (action === Command.repair) {
      setFailedTimes(0);
      setSystemMessage("Repairing...");
      endingSystemMessage = "Entered repair mode. Please hit reset to complete repairing.";
    }

    // action = Reset
    if (action === Command.reset) {
      setSystemMessage("Resetting...");
    }

    axios.post(`${constants.API_BASE}/action`, {
      action: action
    }).then((resp: AxiosResponse) => {
      // update state
      const newState = resp.data.state;
      switch (newState) {
        case "IDLE":
          setRobotState(RobotState.Idle);
          break;
        case "PICKING":
          setRobotState(RobotState.Picking);
          break;
        case "PLACING":
          setRobotState(RobotState.Placing);
          break;
        case "FAILED":
          setRobotState(RobotState.Failed);
          break;
        case "REPAIRING":
          setRobotState(RobotState.Repairing);
          break;
        default:
          console.log("WARNING: backend responded with an unknown state.");
      }
    }).catch((error: AxiosError) => {
      const status = error.response?.status;

      // handle 500: random switch to Failed state
      if (status === 500) {
        if (failedTimes < 3) {
          setFailedTimes(failedTimes + 1);
        }
        setRobotState(RobotState.Failed);
        endingSystemMessage = "Oops! System failed."
      }

      // handle 503: auto retry 
      else if (status === 503) {
        endingSystemMessage = "Wall-F did not respond. Retrying...";
        shouldRetryCommand = true;
      }

      // would do logging instead in production
      // by making a POST request to the backend
      // and the backend will log the error to a file
      else {
        console.log(`Action HTTP request failed: ${error}`);
      }
    })
      .finally(() => {
        setRobotIsLoading(false);
        setSystemMessage(endingSystemMessage);

        if (shouldRetryCommand) {
          shouldRetryCommand = false;
          onActionClick(action, false);
        }
      });
  }

  const { Header, Content } = Layout;

  return (
    <>
      <Layout>
        <Header className="app-header">
          <p>Wall-F</p>
          <small>The Fruit-Picking Robot</small>
        </Header>
        <Content className="app-content">
          <div className="fruit-decorator-container">🍎🍌🍍🥝🍑</div>
          <StateIndicator state={robotState} />
          <Spin spinning={robotIsLoading}>
            <WallF state={robotState} />
          </Spin>
          <SystemMessage message={systemMessage} />
        </Content>
      </Layout>

      <InputPanel
        state={robotState}
        failedTimes={failedTimes}
        onActionClick={onActionClick}
        appIsLoading={robotIsLoading}
      />

      <FloatButton tooltipMessage="Command History" onClick={showDrawer} />
      <CommandHistory records={commandHistory} visible={drawerVisible} onClose={onDrawerClose} />
    </>
  );
}

export default App;
