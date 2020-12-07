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
  setHaltBalanceUpdates: (arg: boolean) => void,
  haltBalanceUpdates: boolean,
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
  setHaltBalanceUpdates: () => {},
  haltBalanceUpdates: false,
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
  const [haltBalanceUpdates, setHaltBalanceUpdates] = React.useState(false);
  const memoizedValues = React.useMemo(
    () => ({
      gameProviderModel,
      error,
      pauseGame,
      resumeGame,
      slug,
      playForFun,
      haltBalanceUpdates,
      setHaltBalanceUpdates,
    }),
    [
      gameProviderModel,
      error,
      pauseGame,
      resumeGame,
      slug,
      playForFun,
      haltBalanceUpdates,
    ]
  );

  return (
    <GameModelContext.Provider value={memoizedValues}>
      {children}
    </GameModelContext.Provider>
  );
};

export const useGameModelContext = () => {
  return React.useContext(GameModelContext);
};
