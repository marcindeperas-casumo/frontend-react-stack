// @flow
import * as React from "react";
import Button from "@casumo/cmp-button";

type Props = {
  hideModalSuccess: () => void,
};

export function SlotControlSystem(props: Props) {
  // TODO, will change when PCC-255 progresses (https://jira.casumocave.com/browse/PCC-255)
  return (
    <div>
      <h1>Slot Control System</h1>
      <Button onClick={props.hideModalSuccess}>Success</Button>
    </div>
  );
}
