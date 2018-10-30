import React, { lazy, Suspense } from "react";
// add a skeleton bae

const MustDropJackpotsContainer = lazy(() =>
  import("Components/MustDropJackpots/MustDropJackpotsContainer")
);

export default function MustDropJackpotsLazy() {
  return (
    <Suspense fallback={<div>I'm a cute skeleton</div>}>
      <MustDropJackpotsContainer />
    </Suspense>
  );
}
