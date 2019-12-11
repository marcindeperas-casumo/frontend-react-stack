// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Button from "@casumo/cmp-button";
import { GameRow } from "Components/GameRow";
import { type EndedSessionType } from "Models/slotControlSystem";
import { Header } from "./Header";
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
    limits_reached_button_label: string,
    limits_reached_play_again_header: string,
  },
  locale: string,
  playAgainGameId: string,
  onClickButton: () => void,
  lastEndedSession: EndedSessionType,
};

export function SessionDetailsForLimitsReached(props: Props) {
  const { t, playAgainGameId, onClickButton, locale, lastEndedSession } = props;
  const now = 1576065735032;

  return (
    <Flex direction="vertical">
      <Header>{t?.limits_reached_play_again_header}</Header>
      <GameRow id={playAgainGameId} />
      <Body
        t={t}
        locale={locale}
        // TODO bind proper data when available in API
        balance={455}
        currency={"EUR"}
        playStartedTime={lastEndedSession.startedTime}
        playEndedTime={lastEndedSession.endedTime}
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
        {t?.limits_reached_button_label || null}
      </Button>
    </Flex>
  );
}
