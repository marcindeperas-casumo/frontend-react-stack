import React from "react";
import Loadable from "react-loadable";
// add a skeleton bae

const MustDropJackpotsContainer =
  "Components/MustDropJackpots/MustDropJackpotsContainer";

export default Loadable({
  loader: () => import(MustDropJackpotsContainer),
  loading: () => <div>I'm a cute skeleton</div>,
});
