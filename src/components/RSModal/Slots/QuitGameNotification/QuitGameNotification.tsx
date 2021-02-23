// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Modal from "@casumo/cmp-modal";
import tracker from "Services/tracker";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { convertHTMLToString } from "Utils";
import { ROUTE_IDS, EVENTS } from "Src/constants";
import type { CmsContent } from "./QuitGameNotification.types";

type QuitGameNotificationProps = {
  acceptModal?: () => void,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  t: ?CmsContent,
};

export const QuitGameNotification = ({
  acceptModal = () => null,
  t,
}: QuitGameNotificationProps) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const redirectToCashierPage = () => {
    tracker.track(EVENTS.MIXPANEL_IN_GAME_EXIT_GAME_CLICKED, {});
    tracker.track(EVENTS.MIXPANEL_EXIT_GAME_STEP_COMPLETED, {});
    navigateToKO(ROUTE_IDS.CASH_DEPOSIT);
  };

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
        tracker.track(EVENTS.MIXPANEL_IN_GAME_EXIT_GAME_CLICKED, {});
        tracker.track(EVENTS.MIXPANEL_EXIT_GAME_STEP_COMPLETED, {});
        acceptModal();
      },
    },
  };

  return (
    <Modal {...modalProps}>
      <Text tag="div" className="u-padding-top--md">
        {convertHTMLToString(t.quit_game_modal_text)}
      </Text>
    </Modal>
  );
};
