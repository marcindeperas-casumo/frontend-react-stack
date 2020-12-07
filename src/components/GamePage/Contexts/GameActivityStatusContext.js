// @flow
import * as React from "react";
import { useGameActivityStatus } from "../Hooks/useGameActivityStatus";

type GameActivityStatusContextType = {
  active: boolean,
  setHaltBalanceUpdates: (arg: boolean) => void,
  haltBalanceUpdates: boolean,
};
type GameActivityStatusContextProviderProps = {
  children: React.Node,
};

export const GameActivityStatusContext = React.createContext<GameActivityStatusContextType>(
  {
    active: false,
    setHaltBalanceUpdates: () => {},
    haltBalanceUpdates: false,
  }
);

export const GameActivityStatusContextProvider = ({
  children,
}: GameActivityStatusContextProviderProps) => {
  const [haltBalanceUpdates, setHaltBalanceUpdates] = React.useState(false);
  const active = useGameActivityStatus();
  const providerValues = {
    active,
    haltBalanceUpdates,
    setHaltBalanceUpdates,
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
