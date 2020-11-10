// @flow
import * as React from "react";
import { getUrlSearchParam, decodedUrlParams } from "Utils";

const LazyComponent = React.lazy(() =>
  import("Components/GamePage").then(module => ({
    default: module.GamePageWithContext,
  }))
);

type Props = {
  slug: string,
  location: {
    search: string,
  },
};

export const LazyPlayForFunGamePage = ({ slug, location }: Props) => {
  const launchData = getUrlSearchParam(location.search, "remoteGameLaunchData");

  const remoteGameLaunchData = launchData
    ? decodedUrlParams(JSON.parse(decodeURIComponent(launchData)))
    : null;

  return (
    <React.Suspense fallback={<div></div>}>
      <LazyComponent
        slug={slug}
        playForFun
        remoteGameLaunchData={remoteGameLaunchData}
      />
    </React.Suspense>
  );
};
