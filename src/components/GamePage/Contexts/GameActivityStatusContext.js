// @flow
import * as React from "react";
import { useGameActivityStatus } from "../Hooks/useGameActivityStatus";

type GameActivityStatusContextProviderProps = {
  children: React.Node,
};

export const GameActivityStatusContext = React.createContext<boolean>(false);

export const GameActivityStatusContextProvider = ({
  children,
}: GameActivityStatusContextProviderProps) => {
  const active = useGameActivityStatus();

  return (
    <GameActivityStatusContext.Provider value={active}>
      {children}
    </GameActivityStatusContext.Provider>
  );
};

export const useGameActivityStatusContext = () => {
  return React.useContext(GameActivityStatusContext);
};
