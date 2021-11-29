import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import http from "Lib/http";
import logger from "Services/logger";
import { PUSHER_CONSTANTS } from "Src/constants";

export type TPusherObject = {
  channels: any; // TODO: TRET-1076 Finish types definition for TPusherObject
  config: any; // TODO: TRET-1076 Finish types definition for TPusherObject
  connection: any; //T ODO: TRET-1076 Finish types definition for TPusherObject
  global_emitter: any; // TODO: TRET-1076 Finish types definition for TPusherObject
  key: string;
  sessionID: number;
  timeline: any; // TODO: TRET-1076 Finish types definition for TPusherObject
  subscribe(channelName): any; // TODO: TRET-1076 Finish types definition for TPusherObject
  unsubscribe(channelName): any; // TODO: TRET-1076 Finish types definition for TPusherObject
};

type TPusherIntegration = {
  crmUrl: string;
  fusionUrl: string;
  prismaUrl: string;
  pusherKey: string;
  pusherRegion: string;
};

type TFastTrackCasumoIntegration = {
  externalSessionId: string;
  playerId: string;
};

const getBaseEndpoints = (): Promise<TPusherIntegration> => {
  return http.get(PUSHER_CONSTANTS.CONFIG_URL, {});
};

const getExternalSessionID = (
  sessionId: string
): Promise<TFastTrackCasumoIntegration> => {
  return http.get(
    PUSHER_CONSTANTS.externalSessionURL,
    {},
    {
      headers: {
        "X-Token": sessionId,
      },
    }
  );
};

const login = (fusionUrl: string, externalSessionId: string) => {
  return http.post(
    `${fusionUrl}/Platform/LoginAuthToken`,
    {},
    {
      headers: { authtoken: externalSessionId },
    }
  );
};

export const usePusher = (sessionId: string) => {
  const [pusher, setPusher] = useState<TPusherObject>({} as TPusherObject);
  const [fastTrackPlayerId, setFastTrackPlayerId] = useState();

  useEffect(() => {
    const getDataAndCreatePusherObj = async () => {
      try {
        const { pusherKey, fusionUrl, pusherRegion } = await getBaseEndpoints();
        const { externalSessionId } = await getExternalSessionID(sessionId);
        const { Data } = await login(fusionUrl, externalSessionId);

        setFastTrackPlayerId(Data.User.UserId);

        const pusherInstance = new Pusher(pusherKey, {
          authEndpoint: `${fusionUrl}/external/pusher/casumo?authToken=${externalSessionId}`,
          cluster: pusherRegion,
        });

        setPusher(pusherInstance);
      } catch (error) {
        logger.error(error);
        setPusher({} as TPusherObject);
      }
    };

    if (sessionId) {
      getDataAndCreatePusherObj();
    }
  }, [sessionId]);

  return { pusher, fastTrackPlayerId };
};
