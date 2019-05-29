// @flow
import React, { PureComponent } from "react";
import type { Node } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import logger from "Services/logger";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import { VALUABLE_TYPES, VALUABLE_STATES } from "Models/valuables";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { noop } from "Utils";

type Props = {
  error: any,
  loading: boolean,
  listTitle: string,
  valuables: [], // to update his with graphql type
  onConsumeValuable: string => void,
};

type ValuableType = $Values<VALUABLE_TYPES>;
type ValuableState = $Values<VALUABLE_STATES>; // TO replace these types with graphql types

const VALUABLE_LOCKED_URL = "en/player/valuables";
const VALUABLE_SPINS_URL = "en/game/";
const VALUABLE_DEPOSIT_URL = "en/deposit";

export class PlayerValuableListHorizontal extends PureComponent<Props> {
  getCardUrl = (valuableState: ValuableState, valuableType: ValuableType) => {
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

  render() {
    const { error = false, loading = false, valuables, listTitle } = this.props;

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
      <>
        <ScrollableListTitle title={listTitle} />
        <Scrollable itemSpacing="md">
          {valuables.map(valuable => {
            const { id, valuableState, valuableType } = valuable;
            const shouldUseValauble =
              valuableType === VALUABLE_TYPES.SPINS ||
              valuableType === VALUABLE_TYPES.CASH;

            return (
              <a
                href={this.getCardUrl(valuableState, valuableType)}
                key={`valuable-card-${id}`}
              >
                <ValuableCard
                  {...valuable}
                  onCardClick={
                    shouldUseValauble
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
