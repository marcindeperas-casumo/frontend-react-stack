import * as React from "react";
import { SumoIconContextProvider } from "Components/SumoIcon/SumoIconContext";
import { GameModelContextProvider } from "./GameModelContext";
import { PinnedWidgetsContextProvider } from "./PinnedWidgetsContext";
import { GameActivityStatusContextProvider } from "./GameActivityStatusContext";
import { GameJackpotContextProvider } from "./GameJackpotContext";
import { AdventurerContextProvider } from "./AdventurerContext";

type GamePageContextProps = {
  children: React.ReactNode;
  slug: string;
  playForFun: boolean;
  remoteGameLaunchData: Object | undefined;
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
      <GameJackpotContextProvider slug={slug}>
        <GameActivityStatusContextProvider>
          <PinnedWidgetsContextProvider>
            <SumoIconContextProvider>
              <AdventurerContextProvider>{children}</AdventurerContextProvider>
            </SumoIconContextProvider>
          </PinnedWidgetsContextProvider>
        </GameActivityStatusContextProvider>
      </GameJackpotContextProvider>
    </GameModelContextProvider>
  );
};
