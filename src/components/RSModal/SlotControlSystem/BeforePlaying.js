// @flow
import * as React from "react";
import { useSessionsState } from "Models/slotControlSystem";
import { ConfigurationFormContainer } from "Components/Compliance/SlotControlSystem/ConfigurationForm";
import { NotEnoughFundsContainer } from "Components/Compliance/SlotControlSystem/NotEnoughFunds";
import { RememberToPlayWithinLimitsContainer } from "Components/Compliance/SlotControlSystem/RememberToPlayWithinLimits";
import { StillOnBreakContainer } from "Components/Compliance/SlotControlSystem/StillOnBreak";
import { type ModalContentComponent } from "Components/RSModal";
import { useWalletAmount } from "Utils/hooks";
import { ModalSkin } from "./ModalSkin";

type SlotControlSystemContent = {
  modal_title: string,
};

export function BeforePlaying(
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
      <ModalSkin {...props}>
        <StillOnBreakContainer
          onClick={props.closeModal}
          exclusionExpiryTime={activeExclusion.expiringTime}
        />
      </ModalSkin>
    );
  }

  if (!hasEnoughFunds(amount)) {
    return (
      <ModalSkin {...props}>
        <NotEnoughFundsContainer onClick={props.closeModal} />
      </ModalSkin>
    );
  }

  if (!activeSession && lastEndedSessionDuringLastHour && !continuePlaying) {
    return (
      <ModalSkin {...props}>
        <RememberToPlayWithinLimitsContainer
          onClickYes={() => setContinuePlaying(true)}
          onClickAbout={props.closeModal}
        />
      </ModalSkin>
    );
  }

  return (
    <ModalSkin {...props}>
      <ConfigurationFormContainer />
    </ModalSkin>
  );
}

function hasEnoughFunds(amount: number) {
  return amount > 0.6;
}
