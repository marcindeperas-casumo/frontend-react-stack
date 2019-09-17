/* @flow */
import React, { useEffect, useState } from "react";
import List from "@casumo/cmp-list";
import Flex from "@casumo/cmp-flex";
import { VALUABLE_TYPES, type ValuableType } from "Models/valuables";
import logger from "Services/logger";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { ValuableRow } from "Components/ValuableRow";
import { launchGame } from "Models/games";
import { subscribeToItemCreatedEvent } from "./utils";
import { type PlayerValuableListProps } from "./PlayerValuableList.types";
import "./PlayerValuableListHorizontal.scss";

export function PlayerValuableListVertical(props: PlayerValuableListProps) {
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
      if (valuableType === VALUABLE_TYPES.SPINS) {
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
  }, [refetch]);

  if (error) {
    logger.error("PlayerValuableListVertical failed", error);
    return null;
  }

  if (loading) {
    return <GameRowSkeleton />;
  }

  return (
    <div className="u-padding-top--lg c-player-valuables-list u-padding-bottom--lg t-background-white">
      {listTitleLabel && (
        <Flex justify="space-between">
          <Flex.Item>
            <ScrollableListTitle paddingLeft title={listTitleLabel} />
          </Flex.Item>
        </Flex>
      )}
      <List
        items={valuables}
        className="t-background-white"
        data-test="vertical-valuables-list"
        render={valuable => (
          <div
            key={`valuable-row-${valuable.id}`}
            id={`valuable-row-${valuable.id}`}
          >
            <ValuableRow
              translatedHoursUnit={hoursLabel}
              {...valuable}
              onCardClick={() => showModal(valuable)}
            />
          </div>
        )}
      />

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
            />
          </div>
        </ValuableDetailsWithModal>
      )}
    </div>
  );
}

// eslint-disable-next-line fp/no-mutation
PlayerValuableListVertical.defaultProps = {
  loading: false,
  refetch: () => {},
  valuable: [],
};
