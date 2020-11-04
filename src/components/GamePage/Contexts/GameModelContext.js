// @flow
import * as React from "react";
import { useGameLaunchData } from "Utils/hooks";

type GameModelContextType = {
  pauseGame: () => Promise<void>,
  resumeGame: () => void,
  gameProviderModel: any,
  slug: string,
  playForFun: boolean,
  error: boolean,
};

type GameModelContextProviderProps = {
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

  return (
    <GameModelContext.Provider
      value={{
        pauseGame,
        resumeGame,
        gameProviderModel,
        error,
        slug,
        playForFun,
      }}
    >
      {children}
    </GameModelContext.Provider>
  );
};

export const useGameModelContext = () => {
  return React.useContext(GameModelContext);
};
