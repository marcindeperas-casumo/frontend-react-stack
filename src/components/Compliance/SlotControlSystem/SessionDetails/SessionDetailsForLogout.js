// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { type ActiveSessionType } from "Models/slotControlSystem";
import { Body } from "./Body";

type Props = {
  t: ?{
    session_details_header: string,
    balance: string,
    money_wagered: string,
    money_won: string,
    money_left: string,
    play_started: string,
    play_ended: string,
    last_status_alert: string,
    logout_button_label: string,
    logout_text: string,
  },
  onClickButton: () => void,
  activeSession: ActiveSessionType,
  locale: string,
};

export function SessionDetailsForLogout(props: Props) {
  const { t, onClickButton, activeSession, locale } = props;
  const now = 1576065735032;

  return (
    <Flex direction="vertical">
      <div className="u-padding--sm t-background-grey-light-2" />
      <Text className="t-color-grey-dark-1 u-padding--md u-padding-bottom--lg">
        {t?.logout_text}
      </Text>
      <Body
        t={t}
        locale={locale}
        // TODO bind proper data when available in API
        balance={activeSession.limit.amount}
        currency={activeSession.limit.currency}
        playStartedTime={activeSession.startedTime}
        playEndedTime={now}
        lastStatusAlertTime={now - 1000 * 50}
        moneyWon={11}
        moneyLeft={12}
        moneyWagered={13}
      />
      <Button
        variant="primary"
        className="u-margin--md"
        onClick={onClickButton}
      >
        {t?.logout_button_label || null}
      </Button>
    </Flex>
  );
}
