// @flow
import * as React from "react";
import Button from "@casumo/cmp-button";
import { type ModalContentComponent } from "Components/RSModal";

type Props = ModalContentComponent<{
  // put your cms keys here, they will be under props.t
}>;

export function SlotControlSystem(props: Props) {
  // TODO, will change when PCC-255 progresses (https://jira.casumocave.com/browse/PCC-255)
  return (
    <div>
      <h1>Slot Control System</h1>
      <Button onClick={() => props.acceptModal("optional data of any kind")}>
        Success
      </Button>
    </div>
  );
}
