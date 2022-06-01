import React, { useEffect, useState } from "react";
import { AbstractModal } from "Components/AbstractModal";
import {
  setPageLoaded,
  subscribeToPusherEvent,
  unsubscribeFromPusherChannel,
} from "Services/PusherPubSubService";
import { usePusher } from "Utils/hooks";
import { PusherNotification } from "Components/Pusher";
import { PUSHER_CONSTANTS } from "Src/constants";
import logger from "Services/logger";
import { setStorageWithTTL } from "Utils/utils";
import { getCookie } from "Utils/getCookie";
import { PusherPaylod, PUSHER_POPUP_COMPONENT } from "./PusherNotification";

export const DISABLE_MODAL_COOKIE_KEY = "disablePusherModal";

export const PUSHER_MODAL_STATE = {
  HIDDEN: "HIDDEN",
  FIRST_LAYER_VISIBLE: "FIRST_LAYER_VISIBLE",
  SECOND_LAYER_VISIBLE: "SECOND_LAYER_VISIBLE",
} as const;

export const CC_PUSHER_DATA_TYPE = "curated_component" as const;
export const CC_PUSHER_DATA_SESSION_STORAGE_KEY =
  "pusher_curated_component" as const;
export type TYPE_PUSHER_MODAL_STATE = keyof typeof PUSHER_MODAL_STATE;

const STATE_TRANSITIONS = {
  [PUSHER_MODAL_STATE.FIRST_LAYER_VISIBLE]: PUSHER_MODAL_STATE.HIDDEN,
  [PUSHER_MODAL_STATE.SECOND_LAYER_VISIBLE]:
    PUSHER_MODAL_STATE.FIRST_LAYER_VISIBLE,
};

type Props = {
  sessionId: string;
  playerId: string;
};

export const PusherModal = ({ sessionId, playerId }: Props) => {
  const { pusher, fastTrackPlayerId, setSessionId } = usePusher();
  const [isPageReady, setIsPageReady] = useState(false);
  const [pusherData, setPusherData] = useState(null);
  const [pusherModalState, setPusherModalState] =
    useState<TYPE_PUSHER_MODAL_STATE>(PUSHER_MODAL_STATE.FIRST_LAYER_VISIBLE);

  const onPusherEvent = (data: PusherPaylod) => {
    if (data.subscribed) {
      setIsPageReady(true);
      return;
    }

    if (data?.Data?.Component === PUSHER_POPUP_COMPONENT) {
      setPusherData(data);
      setPusherModalState(PUSHER_MODAL_STATE.FIRST_LAYER_VISIBLE);
    }

    if (data?.Data?.Component === CC_PUSHER_DATA_TYPE) {
      setStorageWithTTL(CC_PUSHER_DATA_SESSION_STORAGE_KEY, data, 86400000);
    }
  };

  const hidePusherModal = () =>
    setPusherModalState(STATE_TRANSITIONS[pusherModalState]);

  const isVisible = pusherModalState !== PUSHER_MODAL_STATE.HIDDEN;

  useEffect(() => {
    setSessionId(sessionId);
  }, [sessionId, setSessionId]);

  useEffect(() => {
    const channelName = `${PUSHER_CONSTANTS.pusherChannelnamePrefix}${fastTrackPlayerId}`;
    if (fastTrackPlayerId) {
      subscribeToPusherEvent(
        pusher,
        channelName,
        PUSHER_CONSTANTS.pusherEvents,
        onPusherEvent
      );
    }

    return () => {
      unsubscribeFromPusherChannel(pusher, channelName);
    };
  }, [pusher, fastTrackPlayerId]);

  useEffect(() => {
    if (isPageReady) {
      setPageLoaded(sessionId, playerId).then(() => {
        logger.info("app ready for pusher events");
      });
    }
  }, [isPageReady, sessionId, playerId]);

  const userDisabledPusherModal = Boolean(getCookie(DISABLE_MODAL_COOKIE_KEY));
  if (!isVisible || !pusherData || userDisabledPusherModal) {
    return null;
  }

  return (
    <AbstractModal
      isOpen={true}
      hideModal={hidePusherModal}
      className="c-valuable-details-modal u-height--full u-width--full t-border-r--md u-overflow--hidden c-valuable-details__abstract-modal-extra"
      closeTimeoutMS={100}
      modifyCloseButton
    >
      <PusherNotification
        pusherData={pusherData}
        pusherModalState={pusherModalState}
        setPusherModalState={setPusherModalState}
      />
    </AbstractModal>
  );
};
