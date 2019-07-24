/* @flow */
import React, { useEffect } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import logger from "Services/logger";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import { VALUABLE_TYPES } from "Models/valuables";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { noop } from "Utils";
import { getCardUrl } from "Components/ValuableCard/ValuableCard.utils";
import { subscribeToItemCreatedEvent } from "./utils";

type Translations = {
  listTitleLabel: string,
  hoursUnit: string,
};

type Props = {
  /** Error message to be log in case of error*/
  error?: string,
  /** Indicates whether the data has loaded or still being retrieved */
  loading: boolean,
  /** Refetch valuables function */
  refetch: () => void,
  /** The list of valuables to be displayed as cards */
  valuables: Array<PlayerValuableList_PlayerValuable>,
  /** The function to be called to consume the valuable which will be triggered by each card click */
  onConsumeValuable: string => void,
  /** An array of translated labels */
  translations: Translations, // TODO: update type,
};

export function PlayerValuableListHorizontal(props: Props) {
  const { error, loading, valuables, translations, refetch } = props;
  const { listTitleLabel } = translations;

  useEffect(() => {
    const handler = subscribeToItemCreatedEvent(({ success }) => {
      if (success) {
        refetch();
      }
    });

    return function cleanup() {
      handler.unsubscribe();
    };
  });

  if (error) {
    logger.error(`
      PlayerValuableListHorizontal failed:
      ${error}
    `);
    return null;
  }

  if (loading) {
    return <GameListHorizontalSkeleton />;
  }

  return (
    <div className="u-padding-top--xlg">
      {listTitleLabel && (
        <ScrollableListTitle paddingLeft title={listTitleLabel} />
      )}
      <Scrollable>
        {valuables.map(valuable => {
          const { id, valuableState, valuableType } = valuable;
          const shouldUseValuable =
            valuableType === VALUABLE_TYPES.SPINS ||
            valuableType === VALUABLE_TYPES.CASH;

          return (
            <a
              href={getCardUrl(valuableState, valuableType)}
              key={`valuable-card-${id}`}
            >
              <ValuableCard
                translatedHoursUnit={translations.hoursUnit}
                {...valuable}
                onCardClick={
                  shouldUseValuable
                    ? () => this.props.onConsumeValuable(id)
                    : noop
                }
              />
            </a>
          );
        })}
      </Scrollable>
    </div>
  );
}

// eslint-disable-next-line fp/no-mutation
PlayerValuableListHorizontal.defaultProps = {
  loading: false,
  refetch: () => {},
  valuable: [],
};
