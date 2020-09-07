// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Modal from "@casumo/cmp-modal";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";

export type CmsContent = {
  quit_game_modal_title: string,
  quit_game_modal_text: string,
  quit_game_cta_text: string,
};
type QuitGameNotificationProps = {
  acceptModal?: () => void,
  config: {
    onCloseCallback?: () => void,
  },
  t: any | CmsContent,
};

export const QuitGameNotification = ({
  acceptModal = () => null,
  config: { onCloseCallback },
  t,
  t: { quit_game_modal_title, quit_game_modal_text, quit_game_cta_text },
}: QuitGameNotificationProps) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const redirectToCashierPage = () => navigateToKO(ROUTE_IDS.CASH_DEPOSIT);
  if (!t) {
    return null;
  }
  const modalProps = {
    bigTitle: quit_game_modal_title,
    primaryButton: {
      text: quit_game_cta_text,
      action: redirectToCashierPage,
    },
    closeIcon: {
      action: () => {
        if (onCloseCallback) {
          onCloseCallback();
        }
        acceptModal();
      },
    },
  };

  return (
    <Modal {...modalProps}>
      <Text tag="span">{quit_game_modal_text}</Text>
    </Modal>
  );
};
