import React, { useState } from "react";
import { ModalHeader } from "Components/RSModal/RSModalHeader";
import type { ModalContentComponent } from "Components/RSModal";
import { Finish, SetLimitType, SetAmountContainer } from "./OverlaySteps";

const STAGE = {
  STAGE_START: "STAGE_START",
  STAGE_SET_AMOUNT: "STAGE_SET_AMOUNT",
};

export type CmsContent = {
  limit_type_daily: string;
  limit_type_weekly: string;
  limit_type_monthly: string;
  limit: string;
  modal_title: string;
  modal_description: string;
  limit_saved_info: string;
  playokay_settings_reference: string;
  save_limit_button: string;
  got_it_button: string;
};

type LmitData = {
  playerId: string | undefined;
  limit: any;
  periodSetting: string | undefined;
};

type OverlayProps = ModalContentComponent<CmsContent> & {
  saveLimit: (limitData: LmitData) => void;
  playerId: string | undefined;
  isDepositLimitProperlySet: boolean;
  iso4217CurrencyCode: string | undefined;
};

type HeaderProps =
  | {
      title: string;
    }
  | {
      showBackButton: true;
      backAction: () => void;
    };

const Header = (props: HeaderProps) => (
  <>
    <ModalHeader {...props} />
    <div className="t-border-bottom t-border-grey-5"></div>
  </>
);

export function DanishEntryOverlay(props: OverlayProps) {
  const {
    acceptModal,
    isDepositLimitProperlySet,
    saveLimit,
    playerId,
    iso4217CurrencyCode,
    t,
  } = props;

  const [limitType, setLimitType] = useState();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(STAGE.STAGE_START);

  if (!t) {
    return null;
  }

  const chooseLimitType = type => {
    setLimitType(type);
    setStage(STAGE.STAGE_SET_AMOUNT);
  };

  const confirmLimit = () => {
    setLoading(true);
    saveLimit({
      playerId,
      limit: {
        amount,
        iso4217CurrencyCode,
      },
      periodSetting: limitType,
    });
  };

  const goBack = () => {
    setStage(STAGE.STAGE_START);
  };

  if (isDepositLimitProperlySet) {
    return (
      <>
        <Header title={t.modal_title} />
        <Finish
          playOkayInfoText={t.playokay_settings_reference}
          buttonLabel={t.got_it_button}
          acceptModal={acceptModal}
          limitSavedInfoText={t.limit_saved_info}
        />
      </>
    );
  }

  if (stage === STAGE.STAGE_START) {
    return (
      <>
        <Header title={t.modal_title} />
        <SetLimitType t={t} chooseLimitType={chooseLimitType} />
      </>
    );
  }

  if (stage === STAGE.STAGE_SET_AMOUNT) {
    return (
      <>
        <Header showBackButton backAction={goBack} title={t.modal_title} />
        <SetAmountContainer
          t={t}
          setAmount={setAmount}
          limitType={limitType}
          amount={amount}
          loading={loading}
          confirmLimit={confirmLimit}
        />
      </>
    );
  }

  return null;
}
