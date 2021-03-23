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
  error: boolean;
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
  error: false,
  game: null,
});

export const GameModelContextProvider = ({
  children,
  slug,
  playForFun,
  remoteGameLaunchData,
}: GameModelContextProviderProps) => {
  const { gameProviderModel, error, pauseGame, resumeGame } = useGameLaunchData(
    {
      playForFun,
      slug,
      remoteGameLaunchData,
    }
  );
  const { game } = useGameDetails({ slug });
  const providerValues = {
    gameProviderModel,
    error,
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
