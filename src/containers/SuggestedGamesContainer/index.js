import React from "react";
import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./SuggestedGamesContainer"),
  // We do not need this for the time being
  loading: () => () => <React.Fragment />
});
