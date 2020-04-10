import React from "react";
import { LayoutPage } from "Components/LayoutPage";

const LazyComponent = React.lazy(() =>
  import("Components/GamePage").then(module => ({
    default: module.GamePageContainer,
  }))
);

export const LazyRealMoneyGamePage = props => {
  return (
    <LayoutPage>
      <React.Suspense fallback={<div></div>}>
        <LazyComponent {...props} playForFun={false} />
      </React.Suspense>
    </LayoutPage>
  );
};
