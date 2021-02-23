// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ButtonPrimary } from "@casumo/cmp-button";
import type { ModalContentComponent } from "Components/RSModal";
import { formatCurrency } from "Utils";
import { useLocale } from "Utils/hooks";
import { useSessionsState } from "Models/slotControlSystem";
import Timer from "Components/Timer";
import { Row } from "Components/Compliance/SlotControlSystem/SessionDetails/Row";
import { ModalSkin } from "./ModalSkin";

type ContentType = {|
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'time_played'.
  time_played: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'session_loss_limit'.
  session_loss_limit: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'remaining_session_loss_limit'.
  remaining_session_loss_limit: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'money_wagered'.
  money_wagered: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'money_won'.
  money_won: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'modal_title'.
  modal_title: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'continue_playing_button'.
  continue_playing_button: string,
|};

export function PeriodicReminderNotification({
  t,
  ...props
}: ModalContentComponent<ContentType>) {
  const locale = useLocale();
  const { activeSession } = useSessionsState();

  if (!activeSession || !t) {
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
          label={t.time_played}
          value={
            <Timer
              startTime={activeSession.startedTime}
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
            currency: activeSession.stats.currency,
            value: activeSession.stats.initialLimit,
          })}
        />
        <Row
          label={t.money_wagered}
          value={formatCurrency({
            locale,
            currency: activeSession.stats.currency,
            value: activeSession.stats.totalBets,
          })}
        />
        <Row
          label={t.money_won}
          value={formatCurrency({
            locale,
            currency: activeSession.stats.currency,
            value: activeSession.stats.totalWins,
          })}
        />
        <Row
          label={t.remaining_session_loss_limit}
          value={formatCurrency({
            locale,
            currency: activeSession.stats.currency,
            value: activeSession.stats.remainingBalance,
          })}
        />
        <div className="o-flex--1" />
        <ButtonPrimary
          size="sm"
          className="u-margin--md"
          onClick={props.acceptModal}
        >
          {t.continue_playing_button}
        </ButtonPrimary>
      </Flex>
    </ModalSkin>
  );
}
