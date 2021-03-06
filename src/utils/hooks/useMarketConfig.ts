import * as R from "ramda";
import { useSelector } from "react-redux";
import { marketSelector } from "Models/handshake";
import { MARKETS, MARKETS_CONFIG, TMarket } from "Src/constants";

type MarketConfigProp = "reelRacesHidden";

type GetMarketConfigProps = {
  prop: MarketConfigProp;
  market: keyof typeof MARKETS;
};

export function useMarketConfig(
  prop: MarketConfigProp
): string | boolean | number {
  const market = useSelector(marketSelector) as TMarket;

  // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string |... Remove this comment to see the full error message
  return getMarketConfig({
    prop,
    market,
  });
}

function getMarketConfig({ prop, market }: GetMarketConfigProps) {
  return R.pathOr(
    R.path(["default", prop], MARKETS_CONFIG),
    [market, prop],
    MARKETS_CONFIG
  );
}
