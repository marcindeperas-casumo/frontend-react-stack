import { useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import type { JackpotStatus, ComposedJackpot } from "./blueRibbonConsts";
import { usePotStateChangeEvent } from "./useBlueRibbonSDK";
import { GetBlueribbonJackpotConfigBySlug } from "./GetBlueribbonJackpotConfigBySlug.graphql";
import { GetBlueribbonJackpotConfigByGameSlug } from "./GetBlueribbonJackpotConfigByGameSlug.graphql";

const useJackpotQueryBySlug = ({ slug }) => {
  return useQuery<
    A.GetBlueribbonJackpotConfigBySlugQuery,
    A.GetBlueribbonJackpotConfigBySlugQueryVariables
  >(GetBlueribbonJackpotConfigBySlug, {
    variables: {
      slug,
    },
  });
};

const useJackpotQueryByGameSlug = ({ gameSlug }) => {
  return useQuery<
    A.GetBlueribbonJackpotConfigByGameSlugQuery,
    A.GetBlueribbonJackpotConfigByGameSlugQueryVariables
  >(GetBlueribbonJackpotConfigByGameSlug, {
    variables: {
      gameSlug,
    },
  });
};

export const useComposedJackpot = (query, propertyName) => {
  const [
    composedJackpot,
    setComposedJackpot,
  ] = React.useState<ComposedJackpot>();
  const sdkPots = usePotStateChangeEvent();

  const { data, loading } = query;

  React.useEffect(() => {
    if (!loading && data && data[propertyName]) {
      const jackpot = data[propertyName];
      setComposedJackpot({
        ...jackpot,
        pots: jackpot.pots.map(pot => ({
          ...pot,
          value: sdkPots[pot.externalId]?.progressive,
          status: sdkPots[pot.externalId]?.potStatus as JackpotStatus,
          lastWinTs: sdkPots[pot.externalId]?.lastWinTs,
        })),
      });
    }
  }, [sdkPots, data, loading, propertyName]);

  return {
    composedJackpot,
  };
};

export const useComposedJackpotConfigByGameSlug = ({
  gameSlug,
}: {
  gameSlug: string;
}) =>
  useComposedJackpot(
    useJackpotQueryByGameSlug({ gameSlug }),
    "blueribbonJackpotByGameSlug"
  );

export const useComposedJackpotConfigBySlug = ({ slug }: { slug: string }) =>
  useComposedJackpot(
    useJackpotQueryBySlug({ slug }),
    "blueribbonJackpotBySlug"
  );
