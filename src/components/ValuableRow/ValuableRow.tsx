import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { MoreIcon } from "@casumo/cmp-icons";
import React, { PureComponent } from "react";
import * as A from "Types/apollo";
import { ValuableThumbnail } from "Components/ValuableThumbnail";
import ImageLazy from "Components/Image/ImageLazy";
import DangerousHtml from "Components/DangerousHtml";
import {
  VALUABLE_TYPES,
  VALUABLE_STATES,
  coinValueToSpinType,
  showStateBadge,
  getExpiryTimeLeft,
} from "Models/valuables";
import type {
  ValuableType,
  ValuableState,
  ValuableThumbnailTranslations as Translations,
} from "Models/valuables";
import { ValuableStateIndicator } from "Components/ValuableStateIndicator";
import { withWarmupPopup } from "Components/ValuableCard/ValuableCardContainer";
import ValuableSelector from "./valuable-selector.svg";
import "./ValuableRow.scss";

type OwnProps = {
  /** Unique id of the valuable */
  id: string;
  /** Title of the valuable */
  title: string;
  /** Description of the valuable. Ex: title of a game etc.*/
  description?: string;
  /** Valuable type of the valuable */
  valuableType: ValuableType;
  /** award type - applies when valuableType === Wagering Lock */
  awardType?: A.WageringLockAwardType;
  /** currency of the player */
  currency: string;
  /** The coin value of each spin. Applies when valuable is type spins */
  coinValue?: number;
  /** Market of the player */
  market: string;
  /** URL of background image to be displayed in the Card header */
  backgroundImage: string;
  /** Valuable caveats to be displayed */
  caveat: string | undefined;
  /** The state of the valuable */
  valuableState: ValuableState;
  /** Translations */
  translations: Translations;
  isSelected?: boolean;
  expiryDate: number;
  rule: { name: string };
  valuableBadgeName: string;
  /** Function to be triggered on click of card */
  onClick?: () => void;
  /** Function to be triggered on click of the more icon */
  onMoreInfo?: () => void;
  itemImage?: string;
};

type Props = OwnProps & typeof ValuableRow.defaultProps;

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
        className="u-object-fit-cover u-width--full u-height--full t-border-r u-overflow--hidden"
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

  onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
      awardType,
      caveat,
      description,
      valuableState,
      onMoreInfo,
      isSelected,
      valuableBadgeName,
      rule,
      itemImage = "",
    } = this.props;
    const expiryTimeLeft = this.expiryTimeLeft;
    const isFresh = valuableState === VALUABLE_STATES.FRESH;
    const stateBadgeVisible =
      showStateBadge(valuableState, expiryTimeLeft.hours) || !isFresh;

    return (
      <Flex className="cursor-pointer">
        <Flex.Item data-test="valuable-selector-svg" className="u-width">
          {isSelected && <ValuableSelector />}
        </Flex.Item>
        <Flex.Item className="u-padding-right--md o-flex--1">
          <Flex data-test="valuable-row" onClick={this.onClick}>
            <Flex.Item className="c-valuable-row__thumbnail o-flex__item--no-shrink">
              <div className="bg-white u-padding--sm t-border-r u-overflow--hidden t-elevation--10">
                <ValuableThumbnail
                  itemImage={itemImage}
                  awardType={awardType}
                  backgroundRenderer={this.image}
                  coinValue={this.props.coinValue}
                  currency={this.props.currency}
                  expiryTimeLeft={expiryTimeLeft}
                  market={this.props.market}
                  translations={this.props.translations}
                  valuableState={valuableState}
                  valuableType={this.props.valuableType}
                  size="small"
                  valuableBadgeName={rule?.name || valuableBadgeName}
                />
              </div>
            </Flex.Item>
            <Flex.Block className="text-grey-70">
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
                  className="text-grey-20 u-margin-top--md"
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
                  className="text-grey-20"
                />
              </Flex.Item>
            )}
          </Flex>
        </Flex.Item>
      </Flex>
    );
  }
}

export const ValuableRowContainer = (props: Props) => {
  return withWarmupPopup<Props>(ValuableRow, props, "onClick", "onMoreInfo");
};
