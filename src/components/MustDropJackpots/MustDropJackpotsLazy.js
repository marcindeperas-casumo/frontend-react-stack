import React from "react";
import Loadable from "react-loadable";
// add a skeleton bae

export default Loadable({
  loader: () => import("Components/MustDropJackpots/MustDropJackpotsContainer"),
  loading: () => <div>I'm a cute skeleton</div>,
});
