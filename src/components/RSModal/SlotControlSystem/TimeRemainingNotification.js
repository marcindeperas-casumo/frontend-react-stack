// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ButtonPrimary } from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import type { ModalContentComponent } from "Components/RSModal";
import { ModalSkin } from "./ModalSkin";

type ContentType = {|
  modal_body: string,
  modal_title: string,
  continue_playing_button: string,
|};

export function TimeRemainingNotification({
  t,
  ...props
}: ModalContentComponent<ContentType>) {
  if (!t) {
    return null;
  }

  return (
    <ModalSkin
      closeAction={props.closeModal}
      dismissModal={props.dismissModal}
      t={{ modal_title: t.modal_title }}
    >
      <Flex justify="space-between" direction="vertical">
        <Text tag="span" className="u-font-weight-bold">
          {t.modal_body}
        </Text>
        <ButtonPrimary className="u-margin--md" onClick={props.acceptModal}>
          {t.continue_playing_button}
        </ButtonPrimary>
      </Flex>
    </ModalSkin>
  );
}
