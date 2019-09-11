/* @flow */
import React, { type Node } from "react";
import { equals } from "ramda";
import Flex from "@casumo/cmp-flex";
import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { interpolate, convertHoursToDays } from "Utils";
import {
  shouldUseValuable,
  type ValuableDetailsTranslations as Translations,
  VALUABLE_STATES,
  getValuableDetailsAction,
  durationToTranslationKey,
  type ValuableRequirementType,
} from "Models/valuables";
import MaskImage from "Components/MaskImage";
import { ValuableWageringProgressBar } from "./ValuableWageringProgressBar";
import OpenPadlock from "./open-padlock.svg";
import "./ValuableDetails.scss";

export const expirationBadgeClasses = {
  expiresToday: "red",
  default: "grey-dark-1",
};

type Game = {
  slug: string,
};

type BadgeInfoType = {
  key: string,
  value: number,
};

export type Props = {
  valuableDetails: ValuableDetails_PlayerValuable,
  /** The function to be called to consume the valuable which will be triggered by each card click */
  onConsumeValuable: ({
    id: string,
    valuableType: ValuableType,
    gameSlug: ?string,
  }) => Promise<void>,
  translations: Translations,
  children: Node,
};

const HeaderImgMask = () => (
  <path d="M378 261.753C238.58 277.769 68.4582 269.761 -1 261.753V0H376.993L378 261.753Z" />
);

const ActionButtonContent = ({ isLocked, text }) => {
  return (
    <>
      {isLocked && (
        <span className="u-margin-right">
          <OpenPadlock />
        </span>
      )}
      {text}
    </>
  );
};

export class ValuableDetails extends React.PureComponent<Props> {
  get expiresWithin24Hours() {
    return this.props.valuableDetails.expirationTimeInHours <= 24;
  }

  get expirationBadgeInfo(): BadgeInfoType {
    const { expirationTimeInHours } = this.props.valuableDetails;

    return this.expiresWithin24Hours
      ? { key: "hours", value: expirationTimeInHours }
      : { key: "days", value: convertHoursToDays(expirationTimeInHours) };
  }

  get expirationBadgeColour(): string {
    const { expirationTimeInHours } = this.props.valuableDetails;

    return expirationTimeInHours >= 24
      ? expirationBadgeClasses.default
      : expirationBadgeClasses.expiresToday;
  }

  get requirementType(): ?ValuableRequirementType {
    const { valuableDetails } = this.props;

    if (
      valuableDetails.__typename === "PlayerValuableCash" ||
      valuableDetails.__typename === "PlayerValuableSpins"
    ) {
      return valuableDetails.requirementType;
    }

    return null;
  }

  get wageringRequirementsExist(): boolean {
    const {
      valuableDetails: { leftToWager, wageringThreshold },
    } = this.props;

    return (
      typeof leftToWager === "number" && typeof wageringThreshold === "number"
    );
  }

  get game(): ?Game {
    const { valuableDetails } = this.props;

    if (valuableDetails.__typename === "PlayerValuableSpins") {
      return valuableDetails.game;
    }

    return null;
  }

  handleAction = () => {
    const { valuableDetails } = this.props;
    const { valuableType, valuableState, id } = valuableDetails;
    const { onConsumeValuable } = this.props;
    const game = this.game;

    if (shouldUseValuable(valuableType, valuableState)) {
      const gameSlug = game ? game.slug : null;

      onConsumeValuable({ id, valuableType, gameSlug });
    }
  };

  render() {
    const { translations, children, valuableDetails } = this.props;
    const {
      id,
      backgroundImage,
      caveat,
      content,
      currency,
      leftToWager,
      market,
      valuableType,
      valuableState,
      wageringThreshold,
    } = valuableDetails;
    const {
      termsAndConditionLabel,
      expirationTimeLabel,
      termsAndConditionsContent,
      wageringStatus,
    } = translations;
    const expirationInfo = this.expirationBadgeInfo;
    const durationKey = durationToTranslationKey(
      expirationInfo.key,
      expirationInfo.value
    );

    const expirationValueText =
      translations[durationKey] &&
      interpolate(translations[durationKey], {
        value: expirationInfo.value,
      });

    const actionButtonProps = getValuableDetailsAction({
      valuableType,
      valuableState,
      requirementType: this.requirementType,
      translations,
    });

    return (
      <div>
        <div className="o-ratio o-ratio--valuable-details">
          <div className="o-ratio__content c-valuable-details__header">
            <MaskImage
              id={`${id}-detail`}
              imageUrl={backgroundImage}
              width={375}
              height={334}
            >
              <HeaderImgMask />
            </MaskImage>
          </div>
          <Flex
            className="o-ratio__content u-margin-bottom--md"
            justify="end"
            align="center"
            direction="vertical"
          >
            <div data-test-id="valuable-renderer-wrapper">{children}</div>
          </Flex>
        </div>
        <div className="u-margin-top--2xlg u-padding-x--md">
          <Flex
            direction="vertical"
            align="center"
            className="u-margin-bottom--lg"
          >
            <Flex.Item>
              <Text className="center" tag="p" size="md">
                {content}
              </Text>
            </Flex.Item>
            {this.wageringRequirementsExist && (
              <Flex.Item className="u-margin-top--xlg">
                <ValuableWageringProgressBar
                  currency={currency}
                  data-test="valuable-details-wagering-progress-bar"
                  leftToWager={leftToWager || 0}
                  label={wageringStatus}
                  market={market}
                  wageringThreshold={wageringThreshold || 0}
                />
              </Flex.Item>
            )}
            <Flex.Item className="u-margin-top--lg">
              <Badge
                tag="p"
                size="sm"
                data-test="valuable-expiration-badge"
                bgColor={this.expirationBadgeColour}
                className="u-text-transform-uppercase u-font-weight-bold"
                radius="sm"
              >
                {`${expirationTimeLabel} ${expirationValueText}`}
              </Badge>
            </Flex.Item>
            <Flex.Item className="u-margin-top--lg">
              <Text tag="p" className="t-color-grey" size="sm">
                {caveat}
              </Text>
            </Flex.Item>
            <Flex.Item className="u-width--1/3 u-margin-y--xlg">
              <hr className="t-color-grey-light-2 t-border-width--md t-border-r--pill" />
            </Flex.Item>
            <Flex.Item>
              <Text tag="strong" className="t-color-grey" size="sm">
                {termsAndConditionLabel}
              </Text>
            </Flex.Item>
            <Flex.Item>
              <Text
                tag="p"
                className="t-color-grey u-text-align-left"
                size="sm"
              >
                {termsAndConditionsContent}
              </Text>
            </Flex.Item>
          </Flex>
          <div className="c-valuable-details__footer">
            <Button
              href={actionButtonProps.url}
              className="u-width--1/1"
              onClick={this.handleAction}
              data-test="valuable-action-button"
            >
              <ActionButtonContent
                text={actionButtonProps.text}
                isLocked={equals(valuableState, VALUABLE_STATES.LOCKED)}
                data-test="expiration-badge-content"
              />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
