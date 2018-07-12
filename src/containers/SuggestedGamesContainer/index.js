import React from "react";
import { defaultComponentLoader } from "../../utils";
import SuggestedGamesSkeleton from "./SuggestedGamesSkeleton";

export default defaultComponentLoader({
  loader: () => import("./SuggestedGamesPortal"),
  loading: () => <SuggestedGamesSkeleton />
});
