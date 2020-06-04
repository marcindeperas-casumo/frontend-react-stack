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
  time_played: string,
  session_loss_limit: string,
  remaining_session_loss_limit: string,
  money_wagered: string,
  money_won: string,
  modal_title: string,
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
          variant="primary"
          className="u-margin--md"
          onClick={props.acceptModal}
        >
          {t.continue_playing_button}
        </ButtonPrimary>
      </Flex>
    </ModalSkin>
  );
}
