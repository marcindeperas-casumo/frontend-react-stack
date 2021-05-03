import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Modal from "@casumo/cmp-modal";
import {
  LockIcon,
  PlayIcon,
  TimeLockedIcon,
  LiveChatIcon,
} from "@casumo/cmp-icons";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as A from "Types/apollo";
import { stringToHTML } from "Utils";
import { REACT_APP_MODAL } from "Src/constants";
import { useHideModal } from "Models/modal";
import { launchGame } from "Services/LaunchGameService";
import { navigateById } from "Services/NavigationService";
import type { TPlayerWarmUpDetailsResponse } from "Models/accountWarmUp";
import { useAccountWarmUp } from "./useAccountWarmUp";
import { TAccountWarmUpPage } from "./AccountWarmUp.types";
import "./AccountWarmUp.scss";

// TODO: create union type for input with reelRace and warmupdetails
type TProps = {
  acceptModal: () => void;
  closeModal: () => void;
  config: {
    content?: TAccountWarmUpPage;
    input?: A.ReelRaceCard_ReelRaceFragment &
      Partial<TPlayerWarmUpDetailsResponse>;
  };
};

// eslint-disable-next-line max-lines-per-function
export const AccountWarmUp = ({ acceptModal, closeModal, config }: TProps) => {
  const { timeRemaining } = useAccountWarmUp(
    config.input.inWarmupPhase,
    config.input.warmupTimeEnd
  );
  const modalHide = useHideModal(REACT_APP_MODAL.ID.ACCOUNT_WARM_UP);

  const rootClassName = "c-account-warm-up";

  // Todo: use DRY components
  // eslint-disable-next-line no-unused-vars
  const TimeItem = (timeValue, unitTranslation) => (
    <Flex.Item>
      <Flex direction="vertical" align="center" justify="center">
        <Text size="md" className="u-font-weight-bold">
          {timeValue}
        </Text>
        <Text size="xs" className="text-grey-50">
          {unitTranslation}
        </Text>
      </Flex>
    </Flex.Item>
  );

  const playButtonConfig = {
    text: config.content?.play_button_text,
    icon: PlayIcon,
    action: () => {
      acceptModal();
      launchGame({ slug: config.input.game.slug });
    },
  };

  const dismissButtonConfig = {
    text: config.content?.dismiss_button_text,
    action: () => {
      acceptModal();
    },
  };

  return (
    <Modal
      className={cx(rootClassName)}
      closeIcon={{ action: closeModal }}
      primaryButton={config.input.game ? playButtonConfig : dismissButtonConfig}
    >
      <Flex
        direction="vertical"
        spacing="md"
        className={cx(`${rootClassName}__content`)}
      >
        <Text tag="h3" className="u-padding u-font-lg u-margin-top--lg">
          {config.content?.title}
        </Text>
        <Text
          className="u-padding u-text-align-left"
          dangerouslySetInnerHTML={stringToHTML(config.content?.content)}
        ></Text>
        <Flex direction="vertical" className="u-padding u-margin-left--3xlg">
          <Flex className={cx(`${rootClassName}__verification-status-title`)}>
            <div className="t-border-r--circle bg-grey-5 u-height--xlg u-width--xlg u-margin-top u-margin-right u-padding--sm">
              <LiveChatIcon
                size="sm"
                style={{
                  width: "24px",
                  height: "20px",
                  transform: "scaleX(-1)",
                }}
                className="text-grey-50"
              />
            </div>
            <Text className="u-padding u-text-align-left">
              {config.content?.verification_status_title}
            </Text>
          </Flex>
          <Flex
            spacing="md"
            direction="vertical"
            className={cx(
              `${rootClassName}__verification-status`,
              "o-position--relative u-padding--md t-border-r--md bg-grey-5"
            )}
          >
            <Flex spacing="md">
              <Text size="sm" className="u-font-weight-bold o-flex__block">
                {config.content?.verification_status_label}
              </Text>
              <Text
                size="xs"
                className={cx(
                  `${rootClassName}__verification-status__status-label`,
                  "t-border-r--sm u-padding-x--sm u-font-weight-bold u-text-transform-uppercase text-white",
                  { "bg-green-30": config.input?.verified },
                  { "bg-orange-30": !config.input?.verified }
                )}
              >
                {config.input?.verified
                  ? config.content?.verification_status_verified
                  : config.content?.verification_status_unverified}
              </Text>
            </Flex>
            <Flex.Block>
              <Text size="sm" className="text-grey-50">
                {config.input?.verified
                  ? config.content?.verification_status_verified_message
                  : config.content?.verification_status_unverified_message}
              </Text>
            </Flex.Block>
            {!config.input?.verified && (
              <Flex.Block>
                <ButtonPrimary
                  size="sm"
                  className="u-width--full u-padding-y--md u-padding-x--lg"
                  onClick={() => {
                    modalHide.closeModal();
                    navigateById({ routeId: "documents-verification" });
                  }}
                >
                  {config.content?.verify_button_text}
                </ButtonPrimary>
              </Flex.Block>
            )}
          </Flex>
        </Flex>

        <Flex direction="vertical" className="u-padding u-margin-left--3xlg">
          <Flex className={cx(`${rootClassName}__time-remaining-title`)}>
            <div className="t-border-r--circle bg-grey-5 u-height--xlg u-width--xlg u-margin-top u-margin-right u-padding--sm">
              <TimeLockedIcon
                size="sm"
                style={{ width: "24px", height: "20px" }}
                className="text-grey-50"
              />
            </div>
            <Text className="u-padding u-text-align-left o-flex__block">
              {config.content?.days_left_title}
            </Text>
          </Flex>

          {timeRemaining && (
            <Flex
              spacing="md"
              justify="center"
              className={cx(
                `${rootClassName}__time-remaining`,
                "o-position--relative u-padding--md t-border-r--md bg-grey-5"
              )}
            >
              <Flex.Item>
                <Flex direction="vertical" align="center" justify="center">
                  <Text size="md" className="u-font-weight-bold">
                    {timeRemaining.days}
                  </Text>
                  <Text size="xs" className="text-grey-50">
                    {config.content?.days}
                  </Text>
                </Flex>
              </Flex.Item>
              <Flex.Item>:</Flex.Item>
              <Flex.Item>
                <Flex direction="vertical" align="center" justify="center">
                  <Text size="md" className="u-font-weight-bold">
                    {timeRemaining.hours}
                  </Text>
                  <Text size="xs" className="text-grey-50">
                    {config.content?.hours}
                  </Text>
                </Flex>
              </Flex.Item>
              <Flex.Item>:</Flex.Item>
              <Flex.Item>
                <Flex direction="vertical" align="center" justify="center">
                  <Text size="md" className="u-font-weight-bold">
                    {timeRemaining.minutes}
                  </Text>
                  <Text size="xs" className="text-grey-50">
                    {config.content?.minutes}
                  </Text>
                </Flex>
              </Flex.Item>
              <Text
                size="xs"
                tag="div"
                className={cx(
                  `${rootClassName}__days-left`,
                  "o-position--absolute u-padding--sm u-font-weight-bold bg-grey-20 t-border-r--sm"
                )}
              >
                {config.content?.days_left_label}
                <LockIcon
                  size="sm"
                  className="u-margin-left--sm"
                  style={{ width: "10px", height: "11px" }}
                />
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};
