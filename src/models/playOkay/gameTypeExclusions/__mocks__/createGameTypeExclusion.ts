import { TGameType } from "../gameTypeExclusions.types";

type TProps = {
  gameType: TGameType;
  pendingRevocation?: boolean;
};

export function createGameTypeExclusion({ gameType, pendingRevocation }: TProps) {
  return {
    gameType,
    playerId: "b8269160-7075-11e8-a5bf-0242ac11000c",
    excludedOn: "2021-12-14T15:30:07.723Z",
    revokeOn: pendingRevocation ? "2021-12-21T15:38:30.806Z" : "2021-12-14T15:38:30.806Z"
  };
}
