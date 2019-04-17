// @flow
import http from "Lib/http";
import type {
  AdventurerProgressionRaw,
  AdventurerDetailsRaw,
} from "Models/adventure";

export const URL = {
  ADVENTURER: "/api/common/query/gamification/adventurer",
  ADVENTURE: "/api/common/query/gamification/adventure",
};

export const getAdventurerDetailsReq = ({
  playerId,
}: {|
  playerId: string,
|}): Promise<AdventurerDetailsRaw> => http.get(`${URL.ADVENTURER}/${playerId}`);

export const getAdventurerProgressionReq = ({
  playerId,
}: {|
  playerId: string,
|}): Promise<AdventurerProgressionRaw> =>
  http.get(`${URL.ADVENTURE}/${playerId}`);
