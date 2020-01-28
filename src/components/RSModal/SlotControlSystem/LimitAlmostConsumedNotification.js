// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Button from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import type { ModalContentComponent } from "Components/RSModal";
import { formatCurrency, interpolate } from "Utils";
import { useActiveGameSession, useLocale } from "Utils/hooks";
import { ModalSkin } from "./ModalSkin";

type ContentType = {|
  modal_body: string,
  modal_title: string,
  continue_playing_button: string,
|};

export function LimitAlmostConsumedNotification({
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
        <Text tag="span" className="u-font-weight-bold">
          {interpolate(t.modal_body, {
            amount: formatCurrency({
              locale,
              currency: activeGameSession.stats.currency,
              value: activeGameSession.stats.remainingBalance,
            }),
          })}
        </Text>
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
