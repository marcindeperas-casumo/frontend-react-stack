// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { MoreIcon } from "@casumo/cmp-icons";
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
  getExpiryTimeLeft,
  type ValuableThumbnailTranslations as Translations,
} from "Models/valuables";
import { ValuableStateIndicator } from "Components/ValuableStateIndicator";
import ValuableSelector from "./valuable-selector.svg";
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
  /** Translations */
  translations: Translations,
  isSelected?: boolean,
  expiryDate: number,
  /** Function to be triggered on click of card */
  onClick?: () => void,
  /** Function to be triggered on click of the more icon */
  onMoreInfo: ?() => void,
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
        className="u-object-fit-cover u-width--full u-height--full t-border-r u-overflow-hidden"
        src={this.props.backgroundImage}
        imgixOpts={this.isValuableTypeSpins ? imgixOptsForSpins : {}}
      />
    );
  }

  get expiryTimeLeft() {
    return getExpiryTimeLeft(this.props.expiryDate);
  }

  get spinType() {
    return coinValueToSpinType(this.props.coinValue);
  }

  onClick = (event: SyntheticEvent<HTMLElement>) => {
    const linkClickEvent = event.currentTarget.tagName === "A";

    // Stop the bubbling and prevent the ValuableRow from opening a popup if an actual link was clicked
    // inside the content.
    if (linkClickEvent) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    const {
      caveat,
      description,
      valuableState,
      onMoreInfo,
      isSelected,
    } = this.props;
    const expiryTimeLeft = this.expiryTimeLeft;
    const isFresh = valuableState === VALUABLE_STATES.FRESH;
    const stateBadgeVisible =
      showStateBadge(valuableState, expiryTimeLeft.hours) || !isFresh;

    return (
      <Flex>
        <Flex.Item className="u-width">
          {isSelected && <ValuableSelector />}
        </Flex.Item>
        <Flex.Item className="u-padding-right--md o-flex--1">
          <Flex data-test="valuable-row" onClick={this.onClick}>
            <Flex.Item className="c-valuable-row__thumbnail o-flex__item--no-shrink">
              <div className="t-background-white u-padding--sm t-border-r u-overflow-hidden t-elevation--10">
                <ValuableThumbnail
                  backgroundRenderer={this.image}
                  coinValue={this.props.coinValue}
                  currency={this.props.currency}
                  expiryTimeLeft={expiryTimeLeft}
                  market={this.props.market}
                  translations={this.props.translations}
                  valuableState={valuableState}
                  valuableType={this.props.valuableType}
                  size="small"
                />
              </div>
            </Flex.Item>
            <Flex.Block className="t-color-grey-70">
              {stateBadgeVisible && (
                <ValuableStateIndicator state={valuableState} />
              )}
              <Text className="u-font-weight-bold" size="sm" tag="span">
                <DangerousHtml
                  data-test="valuable-row-title"
                  html={this.props.title}
                />
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
                  className="t-color-grey-20 u-margin-top--md"
                  size="2xs"
                  tag="div"
                >
                  <DangerousHtml html={caveat} />
                </Text>
              )}
            </Flex.Block>
            {onMoreInfo && (
              <Flex.Item>
                <MoreIcon
                  onClick={e => {
                    e.stopPropagation();
                    onMoreInfo();
                  }}
                  className="t-color-grey-20"
                />
              </Flex.Item>
            )}
          </Flex>
        </Flex.Item>
      </Flex>
    );
  }
}
