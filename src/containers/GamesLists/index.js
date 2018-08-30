import React from "react";
import Loadable from "react-loadable";
import GamesListsSkeleton from "./GamesListsSkeleton";

export default Loadable({
  loader: () => import("./GamesListsPortal"),
  loading: () => <GamesListsSkeleton />,
});
