import React from "react";
import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./LiveCasinoPortal"),
  loading: () => <div>loading ...</div>,
});
