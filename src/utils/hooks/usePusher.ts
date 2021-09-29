import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import http from "Lib/http";
import logger from "Services/logger";

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
  const CONFIG_URL = `https://am-events-staging.fasttrack-solutions.com/api/v1/config/casumo`;
  return http.get(CONFIG_URL, {});
};

const getExternalSessionID = (
  sessionId: string
): Promise<TFastTrackCasumoIntegration> => {
  const externalSessionURL = `/casino-player/fasttrack-realtime-integration/api/v1/session-mapping`;
  return http.get(
    externalSessionURL,
    {},
    {
      headers: {
        "X-Token": sessionId,
      },
    }
  );
};

const login = (fusionUrl: string, externalSessionId: string) => {
  http.post(
    `${fusionUrl}/Platform/LoginAuthToken`,
    {},
    {
      headers: { authtoken: externalSessionId },
    }
  );
};

const isCasumoTest = (): boolean => {
  return window.location.host.includes("test");
};

export const usePusher = (sessionId: string) => {
  const [pusher, setPusher] = useState<TPusherObject>({} as TPusherObject);

  useEffect(() => {
    const getDataAndCreatePusherObj = async () => {
      try {
        const { pusherKey, fusionUrl, pusherRegion } = await getBaseEndpoints();
        const { externalSessionId } = await getExternalSessionID(sessionId);
        await login(fusionUrl, externalSessionId);

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

    if (sessionId && isCasumoTest()) {
      getDataAndCreatePusherObj();
    }
  }, [sessionId]);

  return [pusher];
};
