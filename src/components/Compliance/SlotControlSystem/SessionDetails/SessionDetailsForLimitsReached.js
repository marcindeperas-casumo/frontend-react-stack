// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Button from "@casumo/cmp-button";
import { GameRowSessionDetails } from "Components/GameRow";
import { type EndedSessionType } from "Models/slotControlSystem";
import { Header } from "./Header";
import { SessionDetailsBody } from "./SessionDetailsBody";

type Props = {
  t: ?{
    session_details_header: string,
    money_wagered: string,
    money_won: string,
    money_left: string,
    play_started: string,
    play_ended: string,
    limits_reached_button_label: string,
    limits_reached_play_again_header: string,
  },
  locale: string,
  playAgainGameId?: string,
  /**
   * This action is triggered instead of the default which
   * could not work in the game iframe.
   */
  onClickPlayAgain: (e: MouseEvent) => void,
  onClickButton: () => void,
  lastEndedSession: EndedSessionType,
};

export function SessionDetailsForLimitsReached(props: Props) {
  const {
    t,
    playAgainGameId,
    onClickPlayAgain,
    onClickButton,
    locale,
    lastEndedSession,
  } = props;

  return (
    <Flex direction="vertical">
      {playAgainGameId && (
        <div onClick={onClickPlayAgain}>
          <Header>{t?.limits_reached_play_again_header}</Header>
          <GameRowSessionDetails slug={playAgainGameId} />
        </div>
      )}
      <SessionDetailsBody
        t={t}
        locale={locale}
        currency={lastEndedSession.stats.currency}
        playStartedTime={lastEndedSession.startedTime}
        playEndedTime={lastEndedSession.endedTime}
        moneyWon={lastEndedSession.stats.totalWins}
        moneyLeft={lastEndedSession.stats.remainingBalance}
        moneyWagered={lastEndedSession.stats.totalBets}
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
