// @flow
import * as React from "react";
import { DateTime, Duration } from "luxon";
import Flex from "@casumo/cmp-flex";
import Button from "@casumo/cmp-button";
import type { ModalContentComponent } from "Components/RSModal";
import { formatCurrency } from "Utils";
import { useLocale, useActiveGameSession } from "Utils/hooks";
import Timer from "Components/Timer";
import { Row } from "Components/Compliance/SlotControlSystem/SessionDetails/Row";
import { ModalSkin } from "./ModalSkin";

type ContentType = {
  time_played: string,
  session_loss_limit: string,
  remaining_session_loss_limit: string,
  money_wagered: string,
  money_won: string,
  modal_title: string,
  continue_playing_button: string,
  session_start: string,
  session_end: string,
  session_time_limit: string,
};

export function PeriodicReminderNotification({
  t,
  ...props
}: ModalContentComponent<ContentType>) {
  const locale = useLocale();
  const activeGameSession = useActiveGameSession();

  if (!activeGameSession || !t) {
    return null;
  }

  return (
    <ModalSkin
      closeAction={props.closeModal}
      dismissModal={props.dismissModal}
      t={{ modal_title: t.modal_title }}
    >
      <Flex direction="vertical">
        <Row
          label={t.session_time_limit}
          value={Duration.fromObject({
            seconds: activeGameSession.durationInSecs,
          }).toFormat("hh:mm:ss")}
        />
        <Row
          label={t.session_start}
          value={DateTime.fromMillis(activeGameSession.startedTime).toFormat(
            "HH:mm:ss"
          )}
        />
        <Row
          label={t.session_end}
          value={DateTime.fromMillis(activeGameSession.expiringTime).toFormat(
            "HH:mm:ss"
          )}
        />
        <Row
          label={t.time_played}
          value={
            <Timer
              startTime={activeGameSession.startedTime}
              render={state =>
                `${state.hours}:${state.minutes}:${state.seconds}`
              }
            />
          }
        />
        <Row
          label={t.session_loss_limit}
          value={formatCurrency({
            locale,
            currency: activeGameSession.stats.currency,
            value: activeGameSession.stats.initialLimit,
          })}
        />
        <Row
          label={t.money_wagered}
          value={formatCurrency({
            locale,
            currency: activeGameSession.stats.currency,
            value: activeGameSession.stats.totalBets,
          })}
        />
        <Row
          label={t.money_won}
          value={formatCurrency({
            locale,
            currency: activeGameSession.stats.currency,
            value: activeGameSession.stats.totalWins,
          })}
        />
        <Row
          label={t.remaining_session_loss_limit}
          value={formatCurrency({
            locale,
            currency: activeGameSession.stats.currency,
            value: activeGameSession.stats.remainingBalance,
          })}
        />
        <div className="o-flex--1" />
        <Button
          variant="primary"
          className="u-margin--md"
          onClick={props.acceptModal}
        >
          {t.continue_playing_button}
        </Button>
      </Flex>
    </ModalSkin>
  );
}
