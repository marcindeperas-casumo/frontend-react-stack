import React from "react";
import Loadable from "react-loadable";
import GamesListsSkeleton from "Containers/GamesLists/GamesListsSkeleton";

export default Loadable({
  loader: () => import("./GamesListsPortal"),
  loading: () => <GamesListsSkeleton />,
});
