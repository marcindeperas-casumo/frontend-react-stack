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
      <ModalSkin {...props} showCloseButton>
        <StillOnBreakContainer
          onClick={props.closeModal}
          secondsTillEnd={(activeExclusion.expiringTime - Date.now()) / 1000}
        />
      </ModalSkin>
    );
  }

  if (!hasEnoughFunds(amount)) {
    return (
      <ModalSkin {...props} showCloseButton>
        <NotEnoughFundsContainer onClick={props.closeModal} />
      </ModalSkin>
    );
  }

  if (!activeSession && lastEndedSessionDuringLastHour && !continuePlaying) {
    return (
      <ModalSkin {...props} showCloseButton>
        <RememberToPlayWithinLimitsContainer
          onClickYes={() => setContinuePlaying(true)}
          onClickAbout={props.closeModal}
        />
      </ModalSkin>
    );
  }

  return (
    <ModalSkin {...props} showCloseButton>
      <ConfigurationFormContainer />
    </ModalSkin>
  );
}

function hasEnoughFunds(amount: number) {
  return amount > 0.6;
}
