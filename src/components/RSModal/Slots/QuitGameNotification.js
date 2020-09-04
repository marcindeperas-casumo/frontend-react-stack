// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Modal from "@casumo/cmp-modal";
import { useCrossCodebaseNavigation, useTranslations } from "Utils/hooks";
import { CMS_SLUGS } from "Models/playing/playing.constants";
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
};

export const QuitGameNotification = ({
  acceptModal = () => null,
  config: { onCloseCallback },
}: QuitGameNotificationProps) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const redirectToCashierPage = () => navigateToKO(ROUTE_IDS.CASH_DEPOSIT);
  const t = useTranslations(CMS_SLUGS.IFRAME_SOLUTION);
  if (!t) {
    return null;
  }
  const modalProps = {
    bigTitle: t.quit_game_modal_title,
    primaryButton: {
      text: t.quit_game_cta_text,
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
      <Text tag="span">{t.quit_game_modal_text}</Text>
    </Modal>
  );
};
