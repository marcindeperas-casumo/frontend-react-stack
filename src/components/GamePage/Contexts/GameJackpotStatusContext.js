// @flow
import * as React from "react";

type GameJackpotStatusContextProviderProps = {
  children: React.Node,
};

type GameJackpotStatusContextType = {
  blueRibbonNotificationNeedsAccepting: boolean,
  setBlueRibbonNotificationNeedsAccepting: (arg: boolean) => void,
};

const GameJackpotStatusContext = React.createContext<GameJackpotStatusContextType>(
  {
    blueRibbonNotificationNeedsAccepting: false,
    setBlueRibbonNotificationNeedsAccepting: () => {},
  }
);

export const GameJackpotStatusContextProvider = ({
  children,
}: GameJackpotStatusContextProviderProps) => {
  const [
    blueRibbonNotificationNeedsAccepting,
    setBlueRibbonNotificationNeedsAccepting,
  ] = React.useState(false);
  const providerValues = {
    blueRibbonNotificationNeedsAccepting,
    setBlueRibbonNotificationNeedsAccepting,
  };

  return (
    <GameJackpotStatusContext.Provider value={providerValues}>
      {children}
    </GameJackpotStatusContext.Provider>
  );
};

export const useGameJackpotStatusContext = () => {
  return React.useContext(GameJackpotStatusContext);
};
