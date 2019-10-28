// @flow
import * as React from "react";
import { useSessions } from "Models/slotControlSystem";
import { ConfigurationFormContainer } from "Components/Compliance/SlotControlSystem/ConfigurationForm";
import { NotEnoughFundsContainer } from "Components/Compliance/SlotControlSystem/NotEnoughFunds";
import { RememberToPlayWithinLimitsContainer } from "Components/Compliance/SlotControlSystem/RememberToPlayWithinLimits";
import { type ModalContentComponent } from "Components/RSModal";
import { ModalHeader } from "../RSModalHeader";

const { useEffect, useState } = React;

type SlotControlSystemContent = {
  modal_title: string,
};

export function SlotControlSystem(
  props: ModalContentComponent<SlotControlSystemContent>
) {
  const { activeSession, isFetching } = useSessions();
  const lastSessionEndedIn60Mins = true;
  const [continuePlaying, setContinuePlaying] = useState(false);

  useEffect(() => {
    if (hasEnoughFunds() && activeSession) {
      props.acceptModal();
    }
  }, [activeSession]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isFetching) {
    return null;
  }

  if (!hasEnoughFunds()) {
    return (
      <ModalContentSkin {...props}>
        <NotEnoughFundsContainer onClick={props.closeModal} />
      </ModalContentSkin>
    );
  }

  if (lastSessionEndedIn60Mins && !continuePlaying) {
    return (
      <ModalContentSkin {...props}>
        <RememberToPlayWithinLimitsContainer
          onClickYes={() => setContinuePlaying(true)}
          onClickAbout={props.closeModal}
        />
      </ModalContentSkin>
    );
  }

  return (
    <ModalContentSkin {...props}>
      <ConfigurationFormContainer />
    </ModalContentSkin>
  );
}

type ModalContentSkinProps = {
  t: ?{
    modal_title: string,
  },
  dismissModal: () => void,
  children: React.Node,
};

function ModalContentSkin(props: ModalContentSkinProps) {
  return (
    <>
      <ModalHeader
        title={props.t?.modal_title}
        showCloseButton
        closeAction={props.dismissModal}
      />
      <div className="u-padding-x--lg@tablet u-padding-bottom--lg@tablet u-overflow-y--auto">
        {props.children}
      </div>
    </>
  );
}

function hasEnoughFunds() {
  return true;
}
