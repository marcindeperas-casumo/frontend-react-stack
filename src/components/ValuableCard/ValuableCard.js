// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ValuableThumbnail } from "Components/ValuableThumbnail";
import DangerousHtml from "Components/DangerousHtml";
import MaskImage from "Components/MaskImage";
import {
  type ValuableType,
  type ValuableState,
  VALUABLE_TYPES,
  VALUABLE_STATES,
  coinValueToSpinType,
} from "Models/valuables";

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

const headerDimensions = {
  width: 144,
  height: 80,
};

export class ValuableCard extends PureComponent<Props> {
  static defaultProps = {
    valuableState: VALUABLE_STATES.FRESH,
  };

  get isValuableTypeSpins() {
    return this.props.valuableType === VALUABLE_TYPES.SPINS;
  }

  get maskedImage() {
    const { id, backgroundImage } = this.props;

    return (
      <MaskImage
        {...headerDimensions}
        id={id}
        imageUrl={backgroundImage}
        imgixOpts={{
          blur: this.isValuableTypeSpins ? 100 : 0,
        }}
      >
        <path d="M46.0199 66.5099C26.5859 66.9646 8.11145 67.6742 2.06447 67.916C0.927926 67.9615 0 67.0518 0 65.9144V10C0 4.47715 4.47715 0 10 0H134C139.523 0 144 4.47715 144 10V65.9011C144 67.0435 143.062 67.9553 141.921 67.9034C135.889 67.6291 117.575 66.8374 98.0838 66.4039C97.9959 66.4949 97.9063 66.5846 97.8149 66.6729L87.1967 76.9244C85.158 78.8931 82.3919 80 79.507 80H64.4921C61.6081 80 58.842 78.8931 56.8024 76.9244L46.1851 66.6729C46.1294 66.6191 46.0743 66.5648 46.0199 66.5099Z" />
      </MaskImage>
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
    return (
      <div>
        <div className="c-valuable-card o-ratio o-ratio--valuable-card u-drop-shadow--sm t-background-white t-border-r--md">
          <Flex
            className="o-ratio__content u-padding"
            data-test="valuable-card"
            direction="vertical"
            onClick={this.props.onCardClick}
          >
            <Flex.Item>
              <ValuableThumbnail
                backgroundRenderer={this.maskedImage}
                coinValue={coinValue}
                currency={currency}
                expirationTimeInHours={expirationTimeInHours}
                market={market}
                translatedHoursUnit={translatedHoursUnit}
                valuableState={valuableState}
                valuableType={valuableType}
              />
            </Flex.Item>
            <Flex.Item className="o-flex--1 u-text-align-center u-padding-x u-margin-top--md">
              <Text
                className="t-color-grey-dark-2 u-font-weight-bold"
                tag="div"
              >
                <DangerousHtml data-test="valuable-card-title" html={title} />
              </Text>
              {description && (
                <Text className="t-color-grey u-margin-top" size="xs" tag="div">
                  <DangerousHtml
                    data-test="valuable-card-description"
                    html={description}
                  />
                </Text>
              )}
            </Flex.Item>
          </Flex>
        </div>
        {caveat && (
          <Text
            size="2xs"
            className="t-color-grey-light-1 u-text-align-center u-margin-top u-padding-x"
            tag="div"
          >
            <DangerousHtml html={caveat} />
          </Text>
        )}
      </div>
    );
  }
}
