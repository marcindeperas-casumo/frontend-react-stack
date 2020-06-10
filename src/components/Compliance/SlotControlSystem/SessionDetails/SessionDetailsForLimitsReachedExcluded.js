// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { interpolateWithJSX } from "Utils";
import Timer from "Components/Timer";
import { Duration } from "Components/Duration";
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
  endTime: number,
  locale: string,
  lastEndedSession: EndedSessionType,
};

export function SessionDetailsForLimitsReachedExcluded(props: Props) {
  const { t, onClickButton, locale, lastEndedSession } = props;

  return (
    <Flex direction="vertical">
      <div className="u-padding--sm t-background-grey-0" />
      <Text className="t-color-grey-50 u-padding--md u-padding-bottom--lg">
        {interpolateWithJSX(
          {
            time: (
              <Timer
                endTime={props.endTime}
                onEnd={() => "00:00"}
                render={state => (
                  <Duration
                    duration={R.omit(["hasEnded"], state)}
                    separator=" "
                    preferShort
                    preferAbbreviated
                  />
                )}
              />
            ),
          },
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
      <ButtonPrimary size="md" className="u-margin--md" onClick={onClickButton}>
        {t?.limits_reached_button_label || null}
      </ButtonPrimary>
    </Flex>
  );
}
