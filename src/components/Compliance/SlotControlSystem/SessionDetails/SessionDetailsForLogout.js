// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { type ActiveSessionType } from "Models/slotControlSystem";
import { SessionDetailsBody } from "./SessionDetailsBody";
import { LoginSessionDetailsSection } from "./LoginSessionDetailsSection";

type Props = {
  t: ?{
    session_details_header: string,
    money_wagered: string,
    money_won: string,
    money_left: string,
    play_started: string,
    play_ended: string,
    logout_button_label: string,
    logout_text: string,
  },
  onClickButton: () => void,
  activeSession: ?ActiveSessionType,
  locale: string,
  playEndedTime: number,
};

export function SessionDetailsForLogout(props: Props) {
  const { t, onClickButton, activeSession, locale, playEndedTime } = props;

  return (
    <Flex direction="vertical">
      <div className="u-padding--sm t-background-grey-0" />
      <Text className="t-color-grey-50 u-padding--md u-padding-bottom--lg">
        {t?.logout_text}
      </Text>
      <LoginSessionDetailsSection />
      {activeSession && (
        <SessionDetailsBody
          t={t}
          locale={locale}
          currency={activeSession.stats.currency}
          playStartedTime={activeSession.startedTime}
          playEndedTime={playEndedTime}
          moneyWon={activeSession.stats.totalWins}
          moneyLeft={activeSession.stats.remainingBalance}
          moneyWagered={activeSession.stats.totalBets}
        />
      )}
      <ButtonPrimary
        size="sm"
        variant="primary"
        className="u-margin--md"
        onClick={onClickButton}
      >
        {t?.logout_button_label || null}
      </ButtonPrimary>
    </Flex>
  );
}
