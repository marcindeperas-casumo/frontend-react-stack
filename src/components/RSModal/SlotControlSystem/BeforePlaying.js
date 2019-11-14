// @flow
import * as React from "react";
import { useSessionsState, CMS_SLUGS } from "Models/slotControlSystem";
import { ConfigurationFormContainer } from "Components/Compliance/SlotControlSystem/ConfigurationForm";
import { NotEnoughFundsContainer } from "Components/Compliance/SlotControlSystem/NotEnoughFunds";
import { RememberToPlayWithinLimitsContainer } from "Components/Compliance/SlotControlSystem/RememberToPlayWithinLimits";
import { StillOnBreak } from "Components/Compliance/SlotControlSystem/StillOnBreak";
import { type ModalContentComponent } from "Components/RSModal";
import { useWalletAmount, useTranslations } from "Utils/hooks";
import { ModalHeader } from "../RSModalHeader";

type SlotControlSystemContent = {
  modal_title: string,
};

export function BeforePlaying(
  props: ModalContentComponent<SlotControlSystemContent>
) {
  const translations = useTranslations(CMS_SLUGS.CONFIGURATION_SCREEN);
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
        <StillOnBreak
          t={translations}
          onClick={props.closeModal}
          exclusionExpiryTime={activeExclusion.expiryTime}
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
      <div className="u-padding-x--lg@tablet u-padding-bottom--lg@tablet u-overflow-y--auto">
        {props.children}
      </div>
    </>
  );
}

function hasEnoughFunds(amount: number) {
  return amount > 0.6;
}
