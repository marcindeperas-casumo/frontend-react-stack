/* @flow */
import React, { useEffect, useState } from "react";
import { equals } from "ramda";
import Scrollable from "@casumo/cmp-scrollable";
import { VALUABLE_TYPES, type ValuableType } from "Models/valuables";
import logger from "Services/logger";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { launchGame } from "Models/games";
import { subscribeToItemCreatedEvent } from "./utils";
import { type PlayerValuableListProps } from "./PlayerValuableList.types";
import "./PlayerValuableListHorizontal.scss";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

export function PlayerValuableListHorizontal(props: PlayerValuableListProps) {
  const {
    error,
    loading,
    valuables,
    translations,
    refetch,
    onConsumeValuable,
  } = props;
  const { listTitleLabel, hoursLabel } = translations;
  const [selectedValuable, setSelectedValuable] = useState(null);

  const showModal = valuable => {
    setSelectedValuable(valuable);
  };

  const closeModal = () => {
    setSelectedValuable(null);
  };

  const consumeValuable = ({
    id,
    valuableType,
    gameSlug,
  }: {
    id: string,
    valuableType: ValuableType,
    gameSlug: ?string,
  }) => {
    onConsumeValuable(id).then(() => {
      if (equals(valuableType, VALUABLE_TYPES.SPINS)) {
        launchGame(gameSlug);
      }
    });
  };

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
    <div className="u-padding-top--xlg c-player-valuables-list u-padding-bottom--xlg">
      {listTitleLabel && (
        <ScrollableListTitle paddingLeft title={listTitleLabel} />
      )}
      <Scrollable padding={PADDING_PER_DEVICE}>
        {valuables.map(valuable => {
          const { id } = valuable;

          return (
            <div key={`valuable-card-${id}`} id={`valuable-card-${id}`}>
              <div className="c-valuable-list__valuable-card">
                <ValuableCard
                  translatedHoursUnit={hoursLabel}
                  {...valuable}
                  onCardClick={() => showModal(valuable)}
                  className="u-drop-shadow--sm"
                />
              </div>
            </div>
          );
        })}
      </Scrollable>

      {selectedValuable && (
        <ValuableDetailsWithModal
          isOpen={Boolean(selectedValuable)}
          onClose={closeModal}
          onConsumeValuable={consumeValuable}
          valuableDetails={selectedValuable}
        >
          <div className="c-valuable-list__valuable-card">
            <ValuableCard
              translatedHoursUnit={hoursLabel}
              {...selectedValuable}
              caveat={null}
              className="u-drop-shadow--lg"
            />
          </div>
        </ValuableDetailsWithModal>
      )}
    </div>
  );
}

// eslint-disable-next-line fp/no-mutation
PlayerValuableListHorizontal.defaultProps = {
  loading: false,
  refetch: () => {},
  valuable: [],
};
