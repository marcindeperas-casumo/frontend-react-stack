/* @flow */
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import logger from "Services/logger";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ValuableCard } from "Components/ValuableCard";
import { VALUABLE_TYPES } from "Models/valuables";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { noop } from "Utils";
import { getCardUrl } from "Components/ValuableCard/ValuableCard.utils";
import {
  subscribeToCallbackEvent,
  unsubscribeFromCallbackEvent,
  itemCreatedEventWrapper,
} from "./utils";

type Translations = {
  listTitle: string,
  hoursUnit: string,
};

type Props = {
  /** Error message to be log in case of error*/
  error?: string,
  /** Indicates whether the data has loaded or still being retrieved */
  loading: boolean,
  /** Refetch valuables function */
  refetch: () => void,
  /** Text to be displayed as the title of the list */
  title?: string,
  /** The list of valuables to be displayed as cards */
  valuables: [], // to update his with graphql type
  /** The function to be called to consume the valuable which will be triggered by each card click */
  onConsumeValuable: string => void,
  /** An array of translated labels */
  translations: Translations, // TODO: update type,
};

export class PlayerValuableListHorizontal extends PureComponent<Props> {
  static defaultProps = {
    loading: false,
    refetch: () => {},
    valuable: [],
  };

  onItemCreatedHandler: any => void;

  componentDidMount() {
    this.onItemCreatedHandler = itemCreatedEventWrapper(this.props.refetch);
    subscribeToCallbackEvent(this.onItemCreatedHandler);
  }

  componentWillUnmount() {
    unsubscribeFromCallbackEvent(this.onItemCreatedHandler);
  }

  render() {
    const { error, loading, valuables, translations } = this.props;
    const { listTitle } = translations;

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
        {listTitle && <ScrollableListTitle title={listTitle} />}
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
      </>
    );
  }
}
