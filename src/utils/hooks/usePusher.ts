import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import http from "Lib/http";

export type PusherObjTypes = {
  channels: any; // TODO: add channels typings
  config: any; // TODO: add config typings
  connection: any; //TODO: add connection typings;
  global_emitter: any; //TODO: add global_emitter typings;
  key: string;
  sessionID: number;
  timeline: any; // TODO: Add timeline typings
  subscribe(channeName): any; // TODO: Add subscribe typings
  unsubscribe(channeName): any; // TODO: Add unsubscribe typings
};

type FTPusherIntegrationDataTypes = {
  crmUrl: string;
  fusionUrl: string;
  prismaUrl: string;
  pusherKey: string;
  pusherRegion: string;
};

type FTDataTypes = {
  externalSessionId: string;
  playerId: string;
};

const getBaseEndpoints = (): Promise<FTPusherIntegrationDataTypes> => {
  const CONFIG_URL = `https://am-events-staging.fasttrack-solutions.com/api/v1/config/casumo`;
  return http.get(CONFIG_URL, {});
};

const getExternalSessionID = (sessionId: string): Promise<FTDataTypes> => {
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

export const usePusher = (sessionId: string) => {
  const [pusher, setPusher] = useState<PusherObjTypes>({} as PusherObjTypes);

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
        console.log(error); // eslint-disable-line no-console
        setPusher({} as PusherObjTypes);
      }
    };

    if (sessionId) {
      getDataAndCreatePusherObj();
    }
  }, [sessionId]);

  return [pusher];
};
