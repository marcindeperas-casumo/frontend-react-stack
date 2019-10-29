// @flow
import * as React from "react";
import { useSessionsState } from "Models/slotControlSystem";
import { ConfigurationFormContainer } from "Components/Compliance/SlotControlSystem/ConfigurationForm";
import { type ModalContentComponent } from "Components/RSModal";
import { ModalHeader } from "../RSModalHeader";

const { useEffect } = React;

type SlotControlSystemContent = {
  modal_title: string,
};

export function SlotControlSystem(
  props: ModalContentComponent<SlotControlSystemContent>
) {
  const { activeSession, isFetching } = useSessionsState();

  useEffect(() => {
    if (activeSession) {
      props.acceptModal();
    }
  }, [activeSession]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isFetching) {
    return null;
  }

  return (
    <>
      <ModalHeader
        title={props.t?.modal_title}
        showCloseButton
        closeAction={props.dismissModal}
      />
      <div className="u-padding-x--lg@tablet u-padding-bottom--lg@tablet u-overflow-y--auto">
        <ConfigurationFormContainer />
      </div>
    </>
  );
}
