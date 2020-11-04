// @flow
import * as React from "react";
import { SumoIconContextProvider } from "Components/SumoIcon/SumoIconContext";
import { GameModelContextProvider } from "./GameModelContext";
import { PinnedWidgetsContextProvider } from "./PinnedWidgetsContext";

type GameModelContextType = {
  pauseGame: () => Promise<void>,
  resumeGame: () => void,
  gameProviderModel: any,
  slug: string,
  playForFun: boolean,
  error: boolean,
};

type PinnedWidgetsContextType = {
  pinnedWidgets: Array<string>,
  togglePin: (drawer: string) => void,
};

type GamePageContextProps = {
  children: React.Node,
  slug: string,
  playForFun: boolean,
  remoteGameLaunchData: ?Object,
};

export const GameModelContext = React.createContext<GameModelContextType>({
  pauseGame: () => Promise.resolve(),
  resumeGame: () => {},
  gameProviderModel: null,
  slug: "",
  playForFun: false,
  error: false,
});

export const PinnedWidgetsContext = React.createContext<PinnedWidgetsContextType>(
  {
    pinnedWidgets: [],
    togglePin: () => {},
  }
);

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
      <PinnedWidgetsContextProvider>
        <SumoIconContextProvider>{children}</SumoIconContextProvider>
      </PinnedWidgetsContextProvider>
    </GameModelContextProvider>
  );
};
