// @flow
import * as React from "react";
import { SumoIconContextProvider } from "Components/SumoIcon/SumoIconContext";
import { GameModelContextProvider } from "./GameModelContext";
import { PinnedWidgetsContextProvider } from "./PinnedWidgetsContext";
import { GameActivityStatusContextProvider } from "./GameActivityStatusContext";
import { AdventurerContextProvider } from "./AdventurerContext";

type GamePageContextProps = {
  children: React.Node,
  slug: string,
  playForFun: boolean,
  remoteGameLaunchData: ?Object,
};

export const GamePageContextProvider = ({
  children,
  slug,
  playForFun,
  remoteGameLaunchData,
}: GamePageContextProps) => {
  return (
    <GameModelContextProvider
      slug={slug}
      playForFun={playForFun}
      remoteGameLaunchData={remoteGameLaunchData}
    >
      <GameActivityStatusContextProvider>
        <PinnedWidgetsContextProvider>
          <SumoIconContextProvider>
            <AdventurerContextProvider>{children}</AdventurerContextProvider>
          </SumoIconContextProvider>
        </PinnedWidgetsContextProvider>
      </GameActivityStatusContextProvider>
    </GameModelContextProvider>
  );
};
