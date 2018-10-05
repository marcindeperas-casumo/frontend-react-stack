import React from "react";
import GamesListsPortal from "Components/GamesListsPortal";
import { GAMES_LISTS_HOST_ID } from "Components/GamesListsPortal/GameListPortal";
import WaitForHostElement from "Components/WaitForHostElement";
import { gamesListsPortalFetchStatusSelector } from "Containers/GamesListsPortalContainer/selectors";
import { connect } from "react-redux";

const GamesListsPortalContainer = connect(gamesListsPortalFetchStatusSelector)(
  GamesListsPortal
);

export default () => (
  <WaitForHostElement
    hostElementId={GAMES_LISTS_HOST_ID}
    component={GamesListsPortalContainer}
  />
);
