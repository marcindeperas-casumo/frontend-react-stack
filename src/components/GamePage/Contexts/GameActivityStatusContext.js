// @flow
import * as React from "react";
import { useGameActivityStatus } from "../Hooks/useGameActivityStatus";

type GameActivityStatusContextType = {
  active: boolean,
  setGameServicesBusy: (arg: boolean) => void,
  gameServicesBusy: boolean,
};
type GameActivityStatusContextProviderProps = {
  children: React.Node,
};

export const GameActivityStatusContext = React.createContext<GameActivityStatusContextType>(
  {
    active: false,
    setGameServicesBusy: () => {},
    gameServicesBusy: false,
  }
);

export const GameActivityStatusContextProvider = ({
  children,
}: GameActivityStatusContextProviderProps) => {
  const [gameServicesBusy, setGameServicesBusy] = React.useState(false);
  const active = useGameActivityStatus();

  const providerValues = {
    active,
    gameServicesBusy,
    setGameServicesBusy,
  };

  return (
    <GameActivityStatusContext.Provider value={providerValues}>
      {children}
    </GameActivityStatusContext.Provider>
  );
};

export const useGameActivityStatusContext = () => {
  return React.useContext(GameActivityStatusContext);
};
