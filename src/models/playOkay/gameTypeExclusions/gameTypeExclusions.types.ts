export type TGameType = "SLOTS" | "CASINO" | "BINGO" | "SPORTS";

export type TApiMutationArgs = Array<TGameType>;

export type TGameTypeExclusion = {
  playerId: string;
  gameType: TGameType;
  excludedOn: string;
  revokeOn: string | null;
};

export type TGetExclusionsResponse = Array<TGameTypeExclusion>;
