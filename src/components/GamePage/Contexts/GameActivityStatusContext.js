// @flow
import * as React from "react";
import { useGameActivityStatus } from "../Hooks/useGameActivityStatus";

type GameActivityStatusContextType = {
  active: boolean,
  setBlueRibbonBusy: (arg: boolean) => void,
  blueRibbonBusy: boolean,
};
type GameActivityStatusContextProviderProps = {
  children: React.Node,
};

export const GameActivityStatusContext = React.createContext<GameActivityStatusContextType>(
  {
    active: false,
    setBlueRibbonBusy: () => {},
    blueRibbonBusy: false,
  }
);

export const GameActivityStatusContextProvider = ({
  children,
}: GameActivityStatusContextProviderProps) => {
  const [blueRibbonBusy, setBlueRibbonBusy] = React.useState(false);
  const active = useGameActivityStatus();

  const providerValues = {
    active,
    blueRibbonBusy,
    setBlueRibbonBusy,
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
