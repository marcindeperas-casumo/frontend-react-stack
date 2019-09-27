/* @flow */
import React, { useEffect, useState } from "react";
import List from "@casumo/cmp-list";
import Text from "@casumo/cmp-text";
import {
  VALUABLE_TYPES,
  VALUABLE_STATES,
  type ValuableType,
} from "Models/valuables";
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
    loading = false,
    valuables = [],
    translations,
    refetch = () => {},
    onConsumeValuable,
  } = props;
  const { availableListTitleLabel, lockedListTitleLabel } = translations;
  const [selectedValuable, setSelectedValuable] = useState(null);
  const availableValuables = valuables.filter(
    ({ valuableState }) => valuableState !== VALUABLE_STATES.LOCKED
  );
  const lockedValuables = valuables.filter(
    ({ valuableState }) => valuableState === VALUABLE_STATES.LOCKED
  );

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
      {availableListTitleLabel && (
        <Text
          className="u-padding-bottom--md t-color-chrome-dark-3 u-font-weight-bold u-padding-left--md"
          data-test="vertical-list-title"
          tag="h3"
        >
          {availableListTitleLabel}
        </Text>
      )}
      <List
        items={availableValuables}
        className="t-background-white"
        data-test="vertical-valuables-list"
        render={valuable => (
          <ValuableRow
            key={`available-valuable-row-${valuable.id}`}
            translations={translations}
            {...valuable}
            onClick={() => setSelectedValuable(valuable)}
          />
        )}
      />
      {lockedListTitleLabel && (
        <Text
          className="u-padding-bottom--md u-padding-top--lg t-color-chrome-dark-3 u-font-weight-bold u-padding-left--md"
          data-test="vertical-list-title"
          tag="h3"
        >
          {lockedListTitleLabel}
        </Text>
      )}
      <List
        items={lockedValuables}
        className="t-background-white"
        data-test="vertical-valuables-list"
        render={valuable => (
          <ValuableRow
            key={`locked-valuable-row-${valuable.id}`}
            translations={translations}
            {...valuable}
            onClick={() => setSelectedValuable(valuable)}
          />
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
              translations={translations}
              {...selectedValuable}
              caveat={null}
            />
          </div>
        </ValuableDetailsWithModal>
      )}
    </div>
  );
}
