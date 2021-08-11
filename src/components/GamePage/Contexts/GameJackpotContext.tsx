import * as React from "react";
import { ComposedJackpot } from "Components/PromotionalGameLists/BlueRibbonChristmas/blueRibbonConsts";
import { useComposedJackpotConfigByGameSlug } from "Components/PromotionalGameLists/BlueRibbonChristmas/useComposedJackpot";

type GameJackpotContextProviderProps = {
  slug: string;
  children: React.ReactNode;
};

type GameJackpotContextType = {
  blueribbonJackpotForCurrentGame?: ComposedJackpot;
  blueRibbonNotificationNeedsAccepting: boolean;
  setBlueRibbonNotificationNeedsAccepting: (arg: boolean) => void;
};

const GameJackpotContext = React.createContext<GameJackpotContextType>({
  blueribbonJackpotForCurrentGame: null,
  blueRibbonNotificationNeedsAccepting: false,
  setBlueRibbonNotificationNeedsAccepting: () => {},
});

export const GameJackpotContextProvider = ({
  children,
  slug,
}: GameJackpotContextProviderProps) => {
  const [
    blueRibbonNotificationNeedsAccepting,
    setBlueRibbonNotificationNeedsAccepting,
  ] = React.useState(false);

  const { composedJackpot } = useComposedJackpotConfigByGameSlug({
    gameSlug: slug,
  });

  const providerValues = {
    blueribbonJackpotForCurrentGame: composedJackpot,
    blueRibbonNotificationNeedsAccepting,
    setBlueRibbonNotificationNeedsAccepting,
  };

  return (
    <GameJackpotContext.Provider value={providerValues}>
      {children}
    </GameJackpotContext.Provider>
  );
};

export const useGameJackpotContext = () => {
  return React.useContext(GameJackpotContext);
};
