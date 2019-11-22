// @flow
import * as React from "react";
import { useSessionsState } from "Models/slotControlSystem";
import { ConfigurationFormContainer } from "Components/Compliance/SlotControlSystem/ConfigurationForm";
import { NotEnoughFundsContainer } from "Components/Compliance/SlotControlSystem/NotEnoughFunds";
import { RememberToPlayWithinLimitsContainer } from "Components/Compliance/SlotControlSystem/RememberToPlayWithinLimits";
import { StillOnBreakContainer } from "Components/Compliance/SlotControlSystem/StillOnBreak";
import { type ModalContentComponent } from "Components/RSModal";
import { useWalletAmount } from "Utils/hooks";
import { ModalHeader } from "../RSModalHeader";

type SlotControlSystemContent = {
  modal_title: string,
};

export function SlotControlSystem(
  props: ModalContentComponent<SlotControlSystemContent>
) {
  const { amount } = useWalletAmount();
  const [continuePlaying, setContinuePlaying] = React.useState(false);
  const {
    activeSession,
    isFetching,
    lastEndedSessionDuringLastHour,
    activeExclusion,
  } = useSessionsState();

  React.useEffect(() => {
    if (hasEnoughFunds(amount) && activeSession) {
      props.acceptModal();
    }
  }, [amount, activeSession]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isFetching) {
    return null;
  }

  if (activeExclusion) {
    return (
      <ModalContentSkin {...props}>
        <StillOnBreakContainer
          onClick={props.closeModal}
          exclusionExpiryTime={activeExclusion.expiringTime}
        />
      </ModalContentSkin>
    );
  }

  if (!hasEnoughFunds(amount)) {
    return (
      <ModalContentSkin {...props}>
        <NotEnoughFundsContainer onClick={props.closeModal} />
      </ModalContentSkin>
    );
  }

  if (!activeSession && lastEndedSessionDuringLastHour && !continuePlaying) {
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
      <div className="u-padding-x--2xlg@tablet u-padding-x--2xlg@desktop u-padding-bottom--2xlg@tablet u-padding-bottom--2xlg@desktop u-overflow-y--auto">
        {props.children}
      </div>
    </>
  );
}

function hasEnoughFunds(amount: number) {
  return amount > 0.6;
}
