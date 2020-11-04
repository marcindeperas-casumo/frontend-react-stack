// @flow
import * as React from "react";
import { getUrlSearchParam, decodedUrlParams } from "Utils";
import { GamePageContextProvider } from "Components/GamePage/Contexts";

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

export const LazyPlayForFunGamePage = ({ slug, location }: Props) => {
  const launchData = getUrlSearchParam(location.search, "remoteGameLaunchData");

  const remoteGameLaunchData = launchData
    ? decodedUrlParams(JSON.parse(decodeURIComponent(launchData)))
    : null;

  return (
    <React.Suspense fallback={<div></div>}>
      <GamePageContextProvider
        slug={slug}
        playForFun={true}
        remoteGameLaunchData={remoteGameLaunchData}
      >
        <LazyComponent />
      </GamePageContextProvider>
    </React.Suspense>
  );
};
