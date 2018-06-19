// @flow
import { queryHandshake } from "./api";
import { once, compose2 } from "../../../utils";

import getTopListsFromHandshake from "./getTopListsFromHandshake";
import getTopListIds from "./getTopListIds";
import getTopList from "./getTopList";
type GameListVariant = "default" | "includeDisabled" | "guests";
type GameSlug = string;
type TopListId = string;
type TopList = {
  id: TopListId,
  title: string
};
type TopListGame = {
  name: string,
  slug: GameSlug,
  logoBackground: string,
  logo: string,
  hasPlayForFun: boolean,
  inMaintenanceMode: boolean,
  jackpotId?: string
};

type GameBrowserService = {
  topListIds(): Promise<TopListId[]>,
  topLists(): Promise<TopList[]>,
  topListGamesByTopListId(
    topListId: TopListId,
    variant: GameListVariant
  ): Promise<TopListGame[]>
};

export default (): GameBrowserService => {
  // Doing the handshake once should be enough then we can cache the result
  const cachedHandshake = once(queryHandshake);
  const topListIds = compose2(getTopListIds, cachedHandshake);
  const topLists = compose2(getTopListsFromHandshake, cachedHandshake);
  const topListGamesByTopListId = id => {
    return getTopList({
      // Not quite sure if this is the best way to go when depending on results
      // from other queries.
      //
      // Should we ask for the promise? Or a function that returns the promise?
      // Or something completely different.
      handshakePromise: cachedHandshake(),
      id: id,
      variant: "default"
    });
  };

  const allTopLists = async () => {
    const ids = await getTopListIds(cachedHandshake());
    const lists = await Promise.all(ids.map(topListGamesByTopListId));
    return lists.filter(x => x.games.length > 0);
  };

  // TODO: event handlers for anything that need to update the game lists.
  // Eventually this will need to connect with cometd, listen for event and
  // update the internal state of the games.
  const onGameMaintenanceModeChange = () => {};

  return {
    allTopLists,
    topListIds,
    topLists,
    topListGamesByTopListId,
    onGameMaintenanceModeChange
  };
};
