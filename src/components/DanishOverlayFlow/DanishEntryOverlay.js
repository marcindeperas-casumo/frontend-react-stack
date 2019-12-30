//@flow
import React, { useState, useCallback } from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import Button from "@casumo/cmp-button";
import { TickIcon } from "@casumo/cmp-icons";
import { ModalHeader } from "Components/RSModal/RSModalHeader";
import { TextInput } from "Components/Compliance/TextInput";
import {
  limitPeriod,
  limitInRange,
  isLimitMaxed,
  minFirstDepositLimit,
  maxFirstDepositLimit,
} from "Models/compliance/denmark";

const STAGE = {
  STAGE_START: "STAGE_START",
  STAGE_SET_AMOUNT: "STAGE_SET_AMOUNT",
};

type CmsContent = {
  limit_type_daily: string,
  limit_type_weekly: string,
  limit_type_monthly: string,
  limit: string,
  modal_title: string,
  modal_description: string,
  limit_saved_info: string,
  playokay_settings_reference: string,
  save_limit_button: string,
  got_it_button: string,
};

type OverlayProps = {
  t: CmsContent,
  currencySymbol?: string,
  saveLimit: (playerId: any, limit: any, limitType: any) => void,
  acceptModal?: () => void,
  playerId?: string,
  isDepositLimitProperlySet: boolean,
  iso4217CurrencyCode?: string,
};

type HeaderProps = {
  title: string,
  showBackButton?: true,
  backAction?: () => void,
};

const ButtonElement = ({ text, onClick }) => (
  <Flex.Item>
    <Button
      onClick={onClick}
      size="sm"
      className="u-font-2xs u-display--block"
      variant="secondary"
    >
      <Flex direction="vertical">
        <div>{text.toUpperCase()}</div>
        <div>+</div>
      </Flex>
    </Button>
  </Flex.Item>
);

const Header = (props: HeaderProps) => (
  <>
    <ModalHeader {...props} />
    <div className="t-border-bottom"></div>
  </>
);

export function DanishEntryOverlay(props: OverlayProps) {
  const {
    currencySymbol = "€",
    saveLimit,
    acceptModal,
    playerId,
    isDepositLimitProperlySet,
    iso4217CurrencyCode,
    t,
  } = props;

  const [stage, setStage] = useState(STAGE.STAGE_START);
  const [loading, setLoading] = useState(false);
  const [limitType, setLimitType] = useState();
  const [amount, setAmount] = useState(0);

  const onChangeAmount = useCallback(
    e => {
      const value = e.currentTarget.value;
      if (!isNaN(value)) {
        setAmount(value < maxFirstDepositLimit ? value : maxFirstDepositLimit);
      }
    },
    [setAmount]
  );

  if (!t) {
    return null;
  }

  const periodLabels = {
    [limitPeriod.DAILY]: t.limit_type_daily,
    [limitPeriod.WEEKLY]: t.limit_type_weekly,
    [limitPeriod.MONTHLY]: t.limit_type_monthly,
  };

  const chooseLimitType = type => {
    setLimitType(type);
    setStage(STAGE.STAGE_SET_AMOUNT);
  };

  const confirmLimit = () => {
    setLoading(true);
    saveLimit(
      playerId,
      {
        amount,
        iso4217CurrencyCode,
      },
      limitType
    );
  };

  const goBack = () => {
    setStage(STAGE.STAGE_START);
  };

  if (isDepositLimitProperlySet) {
    return (
      <>
        <Header title={t.modal_title} />
        <div className="u-padding-x--2xlg@tablet u-padding-bottom--2xlg@tablet u-padding-bottom--2xlg@desktop u-overflow-y--auto">
          <div className="u-padding u-padding-top-lg">
            <TickIcon size="xlg" className="t-color-plum" />
            <Text className="t-color-plum u-font-2xlg u-font-weight-bold">
              {t.limit_saved_info}
            </Text>
            <div className="u-padding-top">{t.playokay_settings_reference}</div>
          </div>
          <div className="u-padding u-padding-top-lg">
            <Button
              className="u-width--full"
              variant="primary"
              size="md"
              onClick={acceptModal}
            >
              {t.got_it_button}
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (stage === STAGE.STAGE_START) {
    return (
      <>
        <Header title={t.modal_title} />
        <div className="u-padding-md@mobile u-padding-x--2xlg@tablet u-padding-bottom--2xlg@tablet u-padding-bottom--2xlg@desktop u-overflow-y--auto">
          <Text className="u-padding-x u-padding-y--lg">
            {t.modal_description}
          </Text>
          <Flex
            direction="horizontal"
            spacing="md"
            justify="center"
            align="center"
            className="u-padding"
          >
            <ButtonElement
              onClick={() => chooseLimitType(limitPeriod.DAILY)}
              text={t.limit_type_daily}
            />
            <ButtonElement
              onClick={() => chooseLimitType(limitPeriod.WEEKLY)}
              text={t.limit_type_weekly}
            />
            <ButtonElement
              onClick={() => chooseLimitType(limitPeriod.MONTHLY)}
              text={t.limit_type_monthly}
            />
          </Flex>
        </div>
      </>
    );
  }

  if (stage === STAGE.STAGE_SET_AMOUNT) {
    return (
      <>
        <Header
          showBackButton={true}
          backAction={goBack}
          title={t.modal_title}
        />
        <div className="u-padding-x--2xlg@tablet u-padding-bottom--2xlg@tablet u-padding-bottom--2xlg@desktop u-overflow-y--auto">
          <Text className="u-padding-x u-padding-y--lg">
            {limitType ? periodLabels[limitType] : ""} {t.limit}
          </Text>
          <div className="u-padding-x">
            <TextInput
              currencySign={currencySymbol}
              value={amount}
              onChange={onChangeAmount}
            />
            {!limitInRange(amount) || isLimitMaxed(amount) ? (
              <div className="t-color-red-light-1">
                {currencySymbol} {minFirstDepositLimit} - {maxFirstDepositLimit}
              </div>
            ) : (
              ""
            )}
            <div className="u-padding-top--2xlg">
              <Button
                className="u-width--full"
                disabled={!limitInRange(amount) || loading}
                variant="primary"
                size="md"
                loading={loading}
                onClick={confirmLimit}
              >
                {t.save_limit_button}
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return "";
}
