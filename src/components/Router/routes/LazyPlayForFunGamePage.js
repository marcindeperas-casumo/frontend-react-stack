import React from "react";
import { LayoutPage } from "Components/LayoutPage";

const LazyComponent = React.lazy(() =>
  import("Components/GamePage").then(module => ({
    default: module.GamePageContainer,
  }))
);

export const LazyPlayForFunGamePage = props => (
  <LayoutPage>
    <React.Suspense fallback={<div></div>}>
      <LazyComponent {...props} playForFun={true} />
    </React.Suspense>
  </LayoutPage>
);
