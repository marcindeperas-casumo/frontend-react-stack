import * as React from "react";
import { useSelector } from "react-redux";
import { ComposedJackpot } from "Components/PromotionalGameLists/BlueRibbonChristmas/blueRibbonConsts";
import { useComposedJackpotConfigByGameSlug } from "Components/PromotionalGameLists/BlueRibbonChristmas/useComposedJackpot";
import {
  blueRibbonJackpotBySlugSelector,
  gameJackpotSlugSelector,
} from "Models/blueribbonJackpots/jackpots.selectors";

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

  useComposedJackpotConfigByGameSlug({
    gameSlug: slug,
  });

  const jackpotSlug = useSelector(gameJackpotSlugSelector(slug));
  const composedJackpot = useSelector(
    // @ts-expect-error: apply fix if you know the context
    blueRibbonJackpotBySlugSelector(jackpotSlug)
  );

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
