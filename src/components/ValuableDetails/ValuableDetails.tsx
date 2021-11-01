import Flex from "@casumo/cmp-flex";
import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { allPass, propIs } from "ramda";
import * as React from "react";
import { EVENTS } from "Src/constants";
import TrackClick from "Components/TrackClick";
import * as A from "Types/apollo";
import { interpolate, convertHoursToDaysRoundUp } from "Utils";
import { launchErrorModal } from "Services/LaunchModalService";
import { depositBonusSelected } from "Services/DepositBonusSelectedService";
import { navigate } from "Services/NavigationService";
import { launchGame } from "Services/LaunchGameService";
import {
  VALUABLE_STATES,
  VALUABLE_TYPES,
  getValuableDetailsAction,
  durationToTranslationKey,
  getExpiryTimeLeft,
} from "Models/valuables";
import type {
  ValuableDetailsTranslations as Translations,
  ValuableActionProps,
  ValuableRequirementType,
  DurationProps,
} from "Models/valuables";
import MaskImage from "Components/MaskImage";
import DangerousHtml from "Components/DangerousHtml";
import { ValuableWageringProgressBar } from "./ValuableWageringProgressBar";
import OpenPadlock from "./open-padlock.svg";
import "./ValuableDetails.scss";

export const expirationBadgeClasses = {
  expiresToday: "red-30",
  default: "grey-50",
};

type Game = {
  slug: string;
};

type BadgeInfoType = {
  key: string;
  value: number;
};

export type Props = {
  valuableDetails: A.ValuableDetails_PlayerValuableFragment;
  /** The function to be called to consume the valuable which will be triggered by each card click */
  onConsumeValuable: (id: string) => Promise<void>;
  translations: Translations;
  playerId?: string;
  children: React.ReactChild;
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
  get expiryTimeLeft(): DurationProps | null {
    if (!this.props.valuableDetails.expiryDate) {
      return null;
    }
    return getExpiryTimeLeft(this.props.valuableDetails.expiryDate);
  }

  get expirationBadgeInfo(): BadgeInfoType | null {
    if (!this.expiryTimeLeft) {
      return null;
    }

    const { hours, minutes } = this.expiryTimeLeft;
    const expiresWithin24Hours = hours < 24;
    const expiresInLessThanAnHour = hours < 1;

    if (expiresWithin24Hours) {
      if (expiresInLessThanAnHour) {
        return { key: "minutes", value: minutes };
      }

      return { key: "hours", value: hours };
    }

    // more than 24h will be treated as 2 days
    return { key: "days", value: convertHoursToDaysRoundUp(hours) };
  }

  get durationKey(): string | null {
    const expirationInfo = this.expirationBadgeInfo;

    if (!expirationInfo) {
      return null;
    }
    return durationToTranslationKey(expirationInfo.key, expirationInfo.value);
  }

  get expirationBadgeColour(): string | null {
    if (!this.expiryTimeLeft) {
      return null;
    }

    const { hours } = this.expiryTimeLeft;

    return hours > 24
      ? expirationBadgeClasses.default
      : expirationBadgeClasses.expiresToday;
  }

  get requirementType(): ValuableRequirementType | null {
    const { valuableDetails } = this.props;

    if (
      valuableDetails.__typename === "PlayerValuableCash" ||
      valuableDetails.__typename === "PlayerValuableCashback" ||
      valuableDetails.__typename === "PlayerValuableFreeBet" ||
      valuableDetails.__typename === "PlayerValuableSpins"
    ) {
      return valuableDetails.requirementType;
    }

    return null;
  }

  get wageringRequirementsExist(): boolean {
    return allPass([
      propIs(Number, "leftToWager"),
      propIs(Number, "wageringThreshold"),
    ])(this.props.valuableDetails);
  }

  get game(): Game | null {
    const { valuableDetails } = this.props;

    if (valuableDetails.__typename === "PlayerValuableSpins") {
      return valuableDetails.game;
    }

    return null;
  }

  handleAction = async (actionProps: ValuableActionProps) => {
    const {
      valuableDetails: { id },
      onConsumeValuable,
    } = this.props;

    const { url, isDepositBonusSelected } = actionProps;

    try {
      await onConsumeValuable(id);

      const valuableGames =
        "game" in this.props.valuableDetails ||
        ("games" in this.props.valuableDetails &&
          (this.props.valuableDetails.games || []).length);

      if (!isDepositBonusSelected && valuableGames) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'games' does not exist on type 'ValuableD... Remove this comment to see the full error message
        const gameSlug = this.props.valuableDetails?.games?.length // @ts-expect-error ts-migrate(2339) FIXME: Property 'games' does not exist on type 'ValuableD... Remove this comment to see the full error message
          ? this.props.valuableDetails?.games[0]?.slug // @ts-expect-error ts-migrate(2339) FIXME: Property 'games' does not exist on type 'ValuableD... Remove this comment to see the full error message
          : this.props.valuableDetails?.game?.slug;
        return launchGame({
          slug: gameSlug,
          playForFun: false,
        });
      }
      // TODO - more TOREMOVE But This needs to work on production

      if (isDepositBonusSelected) {
        depositBonusSelected({ badgeId: id });
      }

      if (url) {
        navigate({ url });
      }
    } catch (error) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const {
          extensions: { exception },
        } = error.graphQLErrors[0];

        launchErrorModal({
          rejectReasonId: exception.rejectReasonId,
        });
      }
    }
  };

  render() {
    const { translations, children, valuableDetails, playerId } = this.props;
    const {
      id,
      backgroundImage,
      caveat,
      content,
      currency,
      leftToWager,
      market,
      specificTerms,
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
    const trackingData = {
      playerId: playerId,
      valuableId: id,
      valuableType: valuableType,
    };

    const requirementType = this.requirementType;
    const expirationValueText =
      translations[this.durationKey] &&
      interpolate(translations[this.durationKey], {
        value: this.expirationBadgeInfo.value,
      });

    const actionButtonProps = getValuableDetailsAction({
      valuableType,
      valuableState,
      requirementType,
      translations,
    });

    const actionButtonVisible =
      valuableState === VALUABLE_STATES.USED ||
      valuableState === VALUABLE_STATES.FRESH ||
      valuableState === VALUABLE_STATES.LOCKED ||
      ([
        VALUABLE_TYPES.CASHBACK,
        VALUABLE_TYPES.WAGERING_LOCK,
        VALUABLE_TYPES.FREE_BET,
        VALUABLE_TYPES.DEPOSIT,
      ] as Array<A.ValuableType>).includes(valuableType);

    return (
      <div>
        <div className="o-ratio c-valuable-details t-border-r--md">
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
            className="o-ratio__content u-margin-bottom--md c-valuable-details__valuable-card-wrapper u-margin-bottom--lg"
            justify="end"
            align="center"
            direction="vertical"
          >
            <div data-test-id="valuable-renderer-wrapper">{children}</div>
          </Flex>
        </div>
        <div className="u-padding-x--md">
          <Flex
            direction="vertical"
            align="center"
            className="u-margin-bottom--lg u-margin-top--xlg"
          >
            <Flex.Item>
              <Text className="center">
                <DangerousHtml html={content} />
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
            {expirationTimeLabel && expirationValueText && (
              <Flex.Item className="u-margin-top--lg">
                <Badge
                  tag="p"
                  size="2xs"
                  data-test="valuable-expiration-badge"
                  bgColor={this.expirationBadgeColour}
                  className="u-text-transform-uppercase u-font-weight-bold"
                  radius="sm"
                >
                  {`${expirationTimeLabel} ${expirationValueText}`}
                </Badge>
              </Flex.Item>
            )}
            {caveat && (
              <Flex.Item className="u-margin-top--lg">
                <Text className="text-grey-20" size="sm">
                  <DangerousHtml html={caveat} />
                </Text>
              </Flex.Item>
            )}
            <Flex.Item className="u-width--1/3 u-margin-y--md">
              <hr className="c-valuable-details__separator t-border t-border-r--pill border-grey-0" />
            </Flex.Item>
            {specificTerms && (
              <Flex.Item className="u-width--full u-overflow-x--hidden">
                <Text
                  tag="div"
                  className="text-grey-70 u-text-align-left"
                  size="sm"
                >
                  <DangerousHtml
                    data-test="valuable-card-title"
                    html={specificTerms}
                  />
                </Text>
              </Flex.Item>
            )}
            <Flex.Item>
              <Text tag="strong" className="text-grey-70" size="xs">
                {termsAndConditionLabel}
              </Text>
            </Flex.Item>
            <Flex.Item className="u-width--full u-overflow-x--hidden">
              <Text
                tag="div"
                className="text-grey-70 u-text-align-left"
                size="sm"
              >
                <DangerousHtml
                  data-test="valuable-card-title"
                  html={termsAndConditionsContent}
                />
              </Text>
            </Flex.Item>
          </Flex>
          {actionButtonVisible && (
            <div className="c-valuable-details__footer u-padding--md o-position--sticky o-inset-bottom--none">
              <TrackClick
                eventName={EVENTS.MIXPANEL_VALUABLE_USE_CTA}
                data={trackingData}
              >
                <ButtonPrimary
                  className="u-width--full"
                  onClick={() => this.handleAction(actionButtonProps)}
                  data-test="valuable-action-button"
                >
                  <ActionButtonContent
                    text={actionButtonProps.text}
                    isLocked={valuableState === VALUABLE_STATES.LOCKED}
                    data-test="expiration-badge-content"
                  />
                </ButtonPrimary>
              </TrackClick>
            </div>
          )}
        </div>
      </div>
    );
  }
}
