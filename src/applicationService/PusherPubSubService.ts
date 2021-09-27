import logger from "Services/logger";
import { MODALS } from "Src/constants";
import { PusherObjTypes } from "Utils/hooks/usePusher";
import { launchModal } from "./LaunchModalService";

const pusherKeyExists = (key: string): boolean => {
  return key !== null && key !== "" && key?.length > 0;
};

export const subscribeToPusherEvent = (
  pusher: PusherObjTypes,
  channelName: string,
  channelEvent: string,
  cb: Function
): void => {
  try {
    if (pusherKeyExists(pusher.key)) {
      const channel = pusher.subscribe(channelName);
      channel.bind(channelEvent, function (data) {
        cb(data);
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const unsubscribeFromPusherChannel = (
  pusher: PusherObjTypes,
  channelName: string
): void => {
  try {
    if (pusherKeyExists(pusher.key)) {
      pusher.unsubscribe(channelName);
    }
  } catch (error) {
    logger.error(error);
  }
};

// this function is used only as a POC for Pusher.js services
export const alertPusherData = (data: any) => {
  logger.log(data);
  launchModal({ modal: MODALS.ACCOUNT_SETTINGS.SHOW_ACCOUNT_ACTIVITY });
};
