// @flow
import * as React from "react";
import { ConfigurationFormContainer } from "Components/Compliance/SlotControlSystem/ConfigurationForm";
import { type ModalContentComponent } from "Components/RSModal";
import { ModalHeader } from "../RSModalHeader";

type SlotControlSystemContent = {
  modal_title: string,
};

export function SlotControlSystem(
  props: ModalContentComponent<SlotControlSystemContent>
) {
  return (
    <>
      <ModalHeader
        title={props.t?.modal_title}
        showCloseButton
        closeAction={props.dismissModal}
      />
      <div className="u-padding-x--lg@tablet u-padding-bottom--lg@tablet">
        <ConfigurationFormContainer finishConfiguration={props.acceptModal} />
      </div>
    </>
  );
}
