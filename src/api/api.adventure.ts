import http from "Lib/http";
import type {
  AdventurerProgressionRaw,
  AdventurerDetailsRaw,
} from "Models/adventure";

export const URL = {
  ADVENTURER: "/api/common/query/gamification/adventurer",
  ADVENTURE: "/api/common/query/gamification/adventure",
};

type ReqParams = {
  playerId: string,
};

export const getAdventurerDetailsReq = ({
  playerId,
}: ReqParams): Promise<AdventurerDetailsRaw> =>
  http.get(`${URL.ADVENTURER}/${playerId}`);

export const getAdventurerProgressionReq = ({
  playerId,
}: ReqParams): Promise<AdventurerProgressionRaw> =>
  http.get(`${URL.ADVENTURE}/${playerId}`);
