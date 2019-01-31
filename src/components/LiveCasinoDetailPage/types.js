// @flow
import type { Game } from "Types/game";

export type GameId = string;

export type GroupedGamesList = Array<{
  id: string,
  title: string,
  gamesInSection: Array<Game & {| gameId: GameId |}>,
}>;
