// @flow
import * as React from "react";
import Button from "@casumo/cmp-button";

type Props = {
  hideModal: () => void,
};

export function SlotControlSystem(props: Props) {
  return (
    <div>
      <h1>Slot Control System</h1>
      <Button onClick={props.hideModal}>Success</Button>
    </div>
  );
}
