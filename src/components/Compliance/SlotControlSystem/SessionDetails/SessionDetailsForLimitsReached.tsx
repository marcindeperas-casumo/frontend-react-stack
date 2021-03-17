import Flex from "@casumo/cmp-flex";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as React from "react";
import * as A from "Types/apollo";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowText } from "Components/GameRow/GameRowText";
import type { EndedSessionType } from "Models/slotControlSystem";
import { Header } from "./Header";
import { SessionDetailsBody } from "./SessionDetailsBody";

type Props = {
  t:
    | {
        session_details_header: string;
        money_wagered: string;
        money_won: string;
        money_left: string;
        play_started: string;
        play_ended: string;
        limits_reached_button_label: string;
        limits_reached_play_again_header: string;
      }
    | undefined;
  locale: string;
  playAgainGame: A.AfterLimitsReached_GameFragment | undefined;
  /**
   * This action is triggered instead of the default which
   * could not work in the game iframe.
   */
  onClickPlayAgain: (e: MouseEvent) => void;
  onClickButton: () => void;
  lastEndedSession: EndedSessionType;
};

export function SessionDetailsForLimitsReached(props: Props) {
  const {
    t,
    playAgainGame,
    onClickPlayAgain,
    onClickButton,
    locale,
    lastEndedSession,
  } = props;

  return (
    <Flex direction="vertical">
      {playAgainGame && (
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: MouseEvent) => void' is not assignable t... Remove this comment to see the full error message
        <div onClick={onClickPlayAgain}>
          <Header>{t?.limits_reached_play_again_header}</Header>
          <GameRow
            className="u-padding--md"
            // @ts-expect-error ts-migrate(2739) FIXME: Type 'AfterLimitsReached_GameFragment' is missing ... Remove this comment to see the full error message
            game={playAgainGame}
            renderText={() => <GameRowText name={playAgainGame.name} />}
          />
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
      <ButtonPrimary size="sm" className="u-margin--md" onClick={onClickButton}>
        {t?.limits_reached_button_label || null}
      </ButtonPrimary>
    </Flex>
  );
}
