import React, { useEffect, useState } from "react";
import { AbstractModal } from "Components/AbstractModal";
import {
  subscribeToPusherEvent,
  unsubscribeFromPusherChannel,
} from "Services/PusherPubSubService";
import { usePusher } from "Utils/hooks";
import { PusherNotification } from "Components/Pusher";
import { PUSHER_CONSTANTS } from "Src/constants";
import { PusherPaylod } from "./PusherNotification";

export const PUSHER_MODAL_STATE = {
  HIDDEN: "HIDDEN",
  FIRST_LAYER_VISIBLE: "FIRST_LAYER_VISIBLE",
  SECOND_LAYER_VISIBLE: "SECOND_LAYER_VISIBLE",
} as const;

export type TYPE_PUSHER_MODAL_STATE = keyof typeof PUSHER_MODAL_STATE;

const STATE_TRANSITIONS = {
  [PUSHER_MODAL_STATE.FIRST_LAYER_VISIBLE]: PUSHER_MODAL_STATE.HIDDEN,
  [PUSHER_MODAL_STATE.SECOND_LAYER_VISIBLE]:
    PUSHER_MODAL_STATE.FIRST_LAYER_VISIBLE,
};

type Props = { sessionId: any };

export const PusherModal = ({ sessionId }: Props) => {
  const { pusher, fastTrackPlayerId } = usePusher(sessionId);
  const [
    pusherModalState,
    setPusherModalState,
  ] = useState<TYPE_PUSHER_MODAL_STATE>(PUSHER_MODAL_STATE.FIRST_LAYER_VISIBLE);
  const [pusherData, setPusherData] = useState(null);

  const onPusherEvent = (data: PusherPaylod) => {
    setPusherData(data);
    setPusherModalState(PUSHER_MODAL_STATE.FIRST_LAYER_VISIBLE);
  };

  const hidePusherModal = () =>
    setPusherModalState(STATE_TRANSITIONS[pusherModalState]);

  const isVisible = pusherModalState !== PUSHER_MODAL_STATE.HIDDEN;

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

  if (!isVisible || !pusherData) {
    return null;
  }

  return (
    <AbstractModal
      isOpen={true}
      hideModal={hidePusherModal}
      className="c-valuable-details-modal u-height--full u-width--full t-border-r--md u-overflow--hidden c-valuable-details__abstract-modal-extra"
      closeTimeoutMS={100}
    >
      <PusherNotification
        pusherData={pusherData}
        pusherModalState={pusherModalState}
        setPusherModalState={setPusherModalState}
      />
    </AbstractModal>
  );
};
