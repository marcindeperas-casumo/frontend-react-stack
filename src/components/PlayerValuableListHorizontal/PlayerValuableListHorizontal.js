/* @flow */
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import logger from "Services/logger";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import { VALUABLE_TYPES } from "Models/valuables";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { noop, isNilOrEmpty } from "Utils";
import { GetCardUrl } from "Components/ValuableCard/ValuableCard.utils";

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
                href={GetCardUrl(valuableState, valuableType)}
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
