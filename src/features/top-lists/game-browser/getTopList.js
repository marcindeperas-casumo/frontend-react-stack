import getTopListsFromHandshake from "./getTopListsFromHandshake";
import { queryTopList } from "./api";

const findById = (arr, id) => arr.find(x => x.id === id);
const MAX_GAMES_PER_TOP_LIST = 10;

export default async ({ handshakePromise, id, variant }) => {
  const topLists = await getTopListsFromHandshake(handshakePromise);
  const topListDef = findById(topLists, id);
  const hash = topListDef.variants[variant].hash;
  const games = (await queryTopList({
    id,
    variant,
    hash,
    pageSize: MAX_GAMES_PER_TOP_LIST
  })).games;

  return {
    title: topListDef.title,
    games: games
  };
};
