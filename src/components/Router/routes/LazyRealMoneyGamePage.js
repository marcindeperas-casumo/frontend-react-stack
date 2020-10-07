// @flow
import * as React from "react";

const LazyComponent = React.lazy(() =>
  import("Components/GamePage").then(module => ({
    default: module.GamePageContainer,
  }))
);

type Props = {
  slug: string,
  location: {
    search: string,
  },
};

export const LazyRealMoneyGamePage = (props: Props) => {
  return (
    <React.Suspense fallback={<div></div>}>
      <LazyComponent {...props} playForFun={false} />
    </React.Suspense>
  );
};
