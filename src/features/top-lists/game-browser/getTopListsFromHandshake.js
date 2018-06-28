import { composePromises, notUndefined, property } from "../../../utils";

const getTopListIds = property("topListIds");
const getGamesLists = property("gamesLists");

const transformResponse = handshake => ({
  topListIds: getTopListIds(handshake),
  gamesLists: getGamesLists(handshake)
});

const getGameLists = ({ topListIds, gamesLists }) =>
  (topListIds || []).map(property).map(propertyFn => propertyFn(gamesLists));

export default composePromises(getGameLists, transformResponse, notUndefined);
