// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { interpolate, interpolateTimeInterval } from "Utils";
import { useTranslations } from "Utils/hooks";
import { CMS_SLUGS, type EndedSessionType } from "Models/slotControlSystem";
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
    limits_reached_exclusion_text: string,
  },
  onClickButton: () => void,
  secondsTillEndOfBreak: number,
  locale: string,
  lastEndedSession: EndedSessionType,
};

export function SessionDetailsForLimitsReachedExcluded(props: Props) {
  const tUnits = useTranslations(CMS_SLUGS.UNITS);
  const {
    t,
    onClickButton,
    locale,
    secondsTillEndOfBreak,
    lastEndedSession,
  } = props;
  const timeInterval = interpolateTimeInterval({
    seconds: secondsTillEndOfBreak,
    t: {
      seconds: tUnits?.seconds || "",
      minutes: tUnits?.minutes,
      hours: tUnits?.hours,
      days: tUnits?.days,
    },
  });

  return (
    <Flex direction="vertical">
      <div className="u-padding--sm t-background-grey-light-2" />
      <Text className="t-color-grey-dark-1 u-padding--md u-padding-bottom--lg">
        {interpolate(t?.limits_reached_exclusion_text, { time: timeInterval })}
      </Text>
      <Body
        t={t}
        locale={locale}
        balance={lastEndedSession.stats.limit}
        // TODO bind actual currency
        currency={"EUR"}
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
