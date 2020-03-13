// @flow
import * as React from "react";
import { useInterval } from "react-use";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { interpolateWithJSX } from "Utils";
import {
  ISO8601DurationContainer,
  convertSecondsToISO8601Duration,
} from "Components/i18n/ISO8601Duration";
import { type EndedSessionType } from "Models/slotControlSystem";
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
    limits_reached_exclusion_text: string,
  },
  onClickButton: () => void,
  secondsTillEndOfBreak: number,
  locale: string,
  lastEndedSession: EndedSessionType,
};

export function SessionDetailsForLimitsReachedExcluded(props: Props) {
  const { t, onClickButton, locale, lastEndedSession } = props;
  const [elapsedSecs, setElapsedSecs] = React.useState<number>(0);
  const secondsTillEnd = props.secondsTillEndOfBreak - elapsedSecs;
  const duration = convertSecondsToISO8601Duration(secondsTillEnd, {
    isShort: true,
  });
  const timeInterval = (
    <ISO8601DurationContainer
      duration={duration}
      t={{ separator: " " }}
      preferAbbreviated
    />
  );

  useInterval(
    () => setElapsedSecs(elapsedSecs + 1),
    secondsTillEnd <= 0 ? null : 1000
  );

  return (
    <Flex direction="vertical">
      <div className="u-padding--sm t-background-grey-light-2" />
      <Text className="t-color-grey-dark-1 u-padding--md u-padding-bottom--lg">
        {interpolateWithJSX(
          { time: timeInterval },
          t?.limits_reached_exclusion_text
        )}
      </Text>
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
