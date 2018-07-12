import React from "react";
import { defaultComponentLoader } from "../../utils";
import GamesListsSkeleton from "./GamesListsSkeleton";

export default defaultComponentLoader({
  loader: () => import("./GamesListsPortal"),
  loading: () => <GamesListsSkeleton />
});
