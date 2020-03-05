// @flow
import * as React from "react";
import { ROUTE_IDS } from "Src/constants";
import { useSessionsState } from "Models/slotControlSystem";
import { ConfigurationFormContainer } from "Components/Compliance/SlotControlSystem/ConfigurationForm";
import { NotEnoughFundsContainer } from "Components/Compliance/SlotControlSystem/NotEnoughFunds";
import { RememberToPlayWithinLimitsContainer } from "Components/Compliance/SlotControlSystem/RememberToPlayWithinLimits";
import { StillOnBreakContainer } from "Components/Compliance/SlotControlSystem/StillOnBreak";
import { type ModalContentComponent } from "Components/RSModal";
import { useWalletAmount, useCrossCodebaseNavigation } from "Utils/hooks";
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
    isFresh,
    lastEndedSessionDuringLastHour,
    activeExclusion,
  } = useSessionsState();
  const { navigateToKO } = useCrossCodebaseNavigation();

  React.useEffect(() => {
    if (hasEnoughFunds(amount) && activeSession) {
      props.acceptModal();
    }
  }, [amount, activeSession]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isFresh || activeSession) {
    return null;
  }

  if (activeExclusion) {
    const onClick = () => {
      props.closeModal();
      navigateToKO(ROUTE_IDS.TOP_LISTS);
    };

    return (
      <ModalSkin {...props}>
        <StillOnBreakContainer
          onClick={onClick}
          secondsTillEnd={(activeExclusion.expiringTime - Date.now()) / 1000}
        />
      </ModalSkin>
    );
  }

  if (!hasEnoughFunds(amount)) {
    const onClick = () => {
      props.closeModal();
      navigateToKO(ROUTE_IDS.CASH_DEPOSIT);
    };

    return (
      <ModalSkin {...props}>
        <NotEnoughFundsContainer onClick={onClick} />
      </ModalSkin>
    );
  }

  if (!activeSession && lastEndedSessionDuringLastHour && !continuePlaying) {
    const onClickAbout = () => {
      props.closeModal();
      navigateToKO(ROUTE_IDS.PLAY_OKAY);
    };

    return (
      <ModalSkin {...props}>
        <RememberToPlayWithinLimitsContainer
          onClickYes={() => setContinuePlaying(true)}
          onClickAbout={onClickAbout}
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
  return amount >= 0;
}
