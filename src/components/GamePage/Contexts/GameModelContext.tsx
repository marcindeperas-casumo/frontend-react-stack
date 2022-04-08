import * as React from "react";
import * as A from "Types/apollo";
import { useGameLaunchData } from "Utils/hooks";
import { useGameDetails } from "Components/GameDetails/GameDetailsContainer";

type GameModelContextType = {
  pauseGame: () => Promise<void>;
  resumeGame: () => void;
  gameProviderModel: any;
  slug: string;
  playForFun: boolean;
  error?: string;
  game?: A.GameDetailsQuery["game"];
};

type GameModelContextProviderProps = {
  children: React.ReactNode;
  slug: string;
  playForFun: boolean;
  remoteGameLaunchData: Object | undefined;
};

export const GameModelContext = React.createContext<GameModelContextType>({
  pauseGame: () => Promise.resolve(),
  resumeGame: () => {},
  gameProviderModel: null,
  slug: "",
  playForFun: false,
  game: null,
});

export const GameModelContextProvider = ({
  children,
  slug,
  playForFun,
  remoteGameLaunchData,
}: GameModelContextProviderProps) => {
  const { gameProviderModel, pauseGame, resumeGame } = useGameLaunchData({
    playForFun,
    slug,
    remoteGameLaunchData,
  });
  /**
   *  Pause / Resume Manual triggers for testing game pausing related features
   *  window.manualPause = pauseGame;
   *  window.manualResume = resumeGame;
   */
  const { game } = useGameDetails({ slug });
  const providerValues = {
    gameProviderModel,
    pauseGame,
    resumeGame,
    slug,
    playForFun,
    game,
  };

  return (
    <GameModelContext.Provider value={providerValues}>
      {children}
    </GameModelContext.Provider>
  );
};

export const useGameModelContext = () => {
  return React.useContext(GameModelContext);
};
