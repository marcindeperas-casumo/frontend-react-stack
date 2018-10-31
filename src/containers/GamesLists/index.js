import React from "react";
import Loadable from "react-loadable";
import GamesListsSkeleton from "Components/GameListsSkeleton";

export default Loadable({
  loader: () => import("Containers/GamesListsPortalContainer"),
  loading: () => <GamesListsSkeleton />,
});
