// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ValuableThumbnail } from "Components/ValuableThumbnail";
import ImageLazy from "Components/Image/ImageLazy";
import DangerousHtml from "Components/DangerousHtml";
import {
  type ValuableType,
  type ValuableState,
  VALUABLE_TYPES,
  VALUABLE_STATES,
  coinValueToSpinType,
  showStateBadge,
} from "Models/valuables";
import { ValuableStatus } from "Components/ValuableStatus";

import "./ValuableRow.scss";

type Props = {
  /** Unique id of the valuable */
  id: string,
  /** Title of the valuable */
  title: string,
  /** Description of the valuable. Ex: title of a game etc.*/
  description?: string,
  /** Valuable type of the valuable */
  valuableType: ValuableType,
  /** currency of the player */
  currency: string,
  /** The coin value of each spin. Applies when valuable is type spins */
  coinValue?: number,
  /** Market of the player */
  market: string,
  /** URL of background image to be displayed in the Card header */
  backgroundImage: string,
  /** Valuable caveats to be displayed */
  caveat: ?string,
  /** The state of the valuable */
  valuableState: ValuableState,
  /** The date on which the valuable will expiry */
  expirationTimeInHours: number,
  /** Function to be triggered on click of card */
  onCardClick: () => void,
  /** translated label for the 'hours' unit */
  translatedHoursUnit: string,
};

export class ValuableRow extends PureComponent<Props> {
  static defaultProps = {
    valuableState: VALUABLE_STATES.FRESH,
    caveat: null,
  };

  get isValuableTypeSpins() {
    return this.props.valuableType === VALUABLE_TYPES.SPINS;
  }

  get image() {
    const imgixOptsForSpins = {
      blur: 100,
      blend: "AAB8B8",
      blendMode: "normal",
      blendAlpha: 20,
    };
    return (
      <ImageLazy
        className="u-object-fit-cover u-width--1/1 u-height--1/1 t-border-r u-overflow-hidden"
        src={this.props.backgroundImage}
        imgixOpts={this.isValuableTypeSpins ? imgixOptsForSpins : {}}
      />
    );
  }

  get spinType() {
    return coinValueToSpinType(this.props.coinValue);
  }

  render() {
    const {
      caveat,
      coinValue,
      currency,
      description,
      expirationTimeInHours,
      market,
      title,
      translatedHoursUnit,
      valuableState,
      valuableType,
    } = this.props;

    const isFresh = valuableState === VALUABLE_STATES.FRESH;
    const stateBadgeVisible =
      showStateBadge(valuableState, expirationTimeInHours) || !isFresh;

    return (
      <Flex
        className="u-padding--md"
        data-test="valuable-row"
        onClick={this.props.onCardClick}
      >
        <Flex.Item className="c-valuable-row-thumbnail">
          <div className="t-background-white u-padding--sm t-border-r u-overflow-hidden u-drop-shadow">
            <ValuableThumbnail
              backgroundRenderer={this.image}
              coinValue={coinValue}
              currency={currency}
              expirationTimeInHours={expirationTimeInHours}
              market={market}
              translatedHoursUnit={translatedHoursUnit}
              valuableState={valuableState}
              valuableType={valuableType}
              size="sm"
            />
          </div>
        </Flex.Item>
        <Flex.Block>
          {stateBadgeVisible && (
            <ValuableStatus
              hoursToExpiry={expirationTimeInHours}
              state={valuableState}
            />
          )}
          <Text className="u-font-weight-bold" size="sm" tag="span">
            <DangerousHtml data-test="valuable-row-title" html={title} />
          </Text>
          {description && (
            <Text className="u-margin-top" size="sm" tag="div">
              <DangerousHtml
                data-test="valuable-row-description"
                html={description}
              />
            </Text>
          )}
          {caveat && (
            <Text
              className="t-color-grey-light-1 u-margin-top--md"
              size="2xs"
              tag="div"
            >
              <DangerousHtml data-test="valuable-row-caveat" html={caveat} />
            </Text>
          )}
        </Flex.Block>
      </Flex>
    );
  }
}
