import { property, rejectIfNotPromise } from "../../../utils";

const getTopListIds = property("topListIds");
const getGamesLists = property("gamesLists");

export default rejectIfNotPromise(handshakePromise =>
  handshakePromise.then(handshake => {
    const topListIds = getTopListIds(handshake);
    const gamesLists = getGamesLists(handshake);

    return (topListIds || [])
      .map(property)
      .map(propertyFn => propertyFn(gamesLists));
  })
);
