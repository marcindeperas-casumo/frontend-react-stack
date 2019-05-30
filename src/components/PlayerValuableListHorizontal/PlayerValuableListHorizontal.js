// @flow
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import logger from "Services/logger";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import { VALUABLE_TYPES, VALUABLE_STATES } from "Models/valuables";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { noop, isNilOrEmpty } from "Utils";
import { defaultClasses } from "Features/sports/components/EditPillsButton/EditPillsButton";

type Props = {
  /** Error message to be log in case of error*/
  error?: string,
  /** Indicates whether the data has loaded or still being retrieved */
  loading: boolean,
  /** Text to be displayed as the title of the list */
  listTitle: string,
  /** The list of valuables to be displayed as cards */
  valuables: [], // to update his with graphql type
  /** The function to be called to consume the valuable which will be triggered by each card click */
  onConsumeValuable: string => void,
};

type ValuableType = $Values<VALUABLE_TYPES>;
type ValuableState = $Values<VALUABLE_STATES>; // TO replace these types with graphql types

const VALUABLE_LOCKED_URL = "en/player/valuables";
const VALUABLE_SPINS_URL = "en/game/";
const VALUABLE_DEPOSIT_URL = "en/deposit";

const getCardUrl = (
  valuableState: ValuableState,
  valuableType: ValuableType
) => {
  if (valuableState === VALUABLE_STATES.LOCKED) {
    return VALUABLE_LOCKED_URL;
  }

  if (valuableType === VALUABLE_TYPES.DEPOSIT) {
    return VALUABLE_DEPOSIT_URL;
  }

  if (valuableType === VALUABLE_TYPES.SPINS) {
    return VALUABLE_SPINS_URL;
  }

  return null;
};

export class PlayerValuableListHorizontal extends PureComponent<Props> {
  static defaultProps = {
    error: "",
    loading: false,
    valuable: [],
    listTitle: "",
  };

  render() {
    const { error, loading, valuables, listTitle } = this.props;

    if (!isNilOrEmpty(error)) {
      logger.error(`
        PlayerValuableListHorizontal failed:
        ${String(error)}
      `);

      return null;
    }

    if (loading) {
      return <GameListHorizontalSkeleton />;
    }

    return (
      <>
        <ScrollableListTitle title={listTitle} />
        <Scrollable itemSpacing="md">
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
      </>
    );
  }
}
