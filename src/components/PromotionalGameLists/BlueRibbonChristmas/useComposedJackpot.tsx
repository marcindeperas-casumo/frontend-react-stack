import { useQuery } from "@apollo/client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { equals } from "ramda";
import * as A from "Types/apollo";
import { setBlueRibbonJackpots } from "Models/blueribbonJackpots/jackpots.actions";
import { sdkPotsSelector } from "Models/blueribbonJackpots/jackpots.selectors";
import type { JackpotStatus, ComposedJackpot } from "./blueRibbonConsts";
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

const formatPot = sdkPots => pot => ({
  ...pot,
  value: sdkPots[pot.externalId]?.progressive,
  status: sdkPots[pot.externalId]?.potStatus as JackpotStatus,
  lastWinTs: sdkPots[pot.externalId]?.lastWinTs,
});

export const useComposedJackpot = (query, propertyName) => {
  // TODO This useState should be removed at some point because we want to feed the store
  const [composedJackpot, setComposedJackpot] =
    React.useState<ComposedJackpot>();
  const sdkPots = useSelector(sdkPotsSelector);

  const { data, loading } = query;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!loading && data && data[propertyName]) {
      const jackpot = data[propertyName];

      const newPots = jackpot.pots.map(formatPot(sdkPots));

      if (equals(composedJackpot?.pots, newPots)) {
        return;
      }

      dispatch(
        setBlueRibbonJackpots({
          ...jackpot,
          pots: newPots,
        })
      );

      // TODO We should remove this setState at some point because we want to feed the store
      setComposedJackpot({
        ...jackpot,
        pots: newPots,
      });
    }
  }, [sdkPots, data, loading, propertyName, query, dispatch, composedJackpot]);

  // This return should be deprecated because we should get the data from the store.
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
