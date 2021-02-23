// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ButtonPrimary } from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import type { ModalContentComponent } from "Components/RSModal";
import { formatCurrency, interpolate } from "Utils";
import { useLocale } from "Utils/hooks";
import { useSessionsState } from "Models/slotControlSystem";
import { ModalSkin } from "./ModalSkin";

type ContentType = {|
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'modal_body'.
  modal_body: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'modal_title'.
  modal_title: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'continue_playing_button'.
  continue_playing_button: string,
|};

export function LimitAlmostConsumedNotification({
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
        <Text tag="span" className="u-font-weight-bold">
          {interpolate(t.modal_body, {
            amount: formatCurrency({
              locale,
              currency: activeSession.stats.currency,
              value: activeSession.stats.remainingBalance,
            }),
          })}
        </Text>
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
