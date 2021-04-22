import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Modal from "@casumo/cmp-modal";
import { ButtonPrimary } from "@casumo/cmp-button";
import { LockIcon, PlayIcon, TimeLockedIcon } from "@casumo/cmp-icons";
import * as A from "Types/apollo";
import { stringToHTML } from "Utils";
import { launchGame } from "Services/LaunchGameService";
import { useAccountWarmUp } from "./useAccountWarmUp";
import { TAccountWarmUpPage } from "./AccountWarmUp.types";
import "./AccountWarmUp.scss";

type TProps = {
  acceptModal: () => void;
  closeModal: () => void;
  config: {
    content?: TAccountWarmUpPage;
    reelRace?: A.ReelRaceCard_ReelRaceFragment;
  };
  classNames?: string;
};

export const AccountWarmUp = ({
  acceptModal,
  closeModal,
  config,
  classNames,
}: TProps) => {
  const { timeRemaining } = useAccountWarmUp();
  const rootClassName = "c-account-warm-up";

  // Todo: use DRY component
  // eslint-disable-next-line no-unused-vars
  const TimeItem = (timeValue, unitTranslation) => (
    <Flex.Item>
      <Flex direction="vertical" align="center" justify="center">
        <Text size="md" className="u-font-weight-bold">
          {timeValue}
        </Text>
        <Text size="xs" className="t-color-grey-50">
          {unitTranslation}
        </Text>
      </Flex>
    </Flex.Item>
  );

  const PlayGameButton = game => (
    <ButtonPrimary
      size="sm"
      className="u-margin-y--xlg u-padding-y--md u-padding-x--lg u-width--full"
      onClick={() => launchGame({ slug: game.slug })}
    >
      <span className="u-margin-right--md">
        {config.content?.play_button_text}
      </span>
      <PlayIcon size="sm" className="c-account-warm-up__button-icon" />
    </ButtonPrimary>
  );

  const DismissButton = () => (
    <ButtonPrimary
      size="sm"
      className="u-margin-y--xlg u-padding-y--md u-padding-x--lg u-width--full"
      onClick={acceptModal}
    >
      <span className="u-margin-left">
        {config.content?.dismiss_button_text}
      </span>
    </ButtonPrimary>
  );

  return (
    <Modal
      className={cx(rootClassName, classNames)}
      closeIcon={{ action: closeModal }}
      bigTitle={config.content?.title}
    >
      <Text
        className="u-padding-y-md u-text-align-left"
        dangerouslySetInnerHTML={stringToHTML(config.content?.content)}
      ></Text>
      <Flex direction="vertical" className="u-margin-left--xlg">
        {/* <div className="o-flex--horizontal">
          <Text className="u-padding u-text-align-left o-flex__block">
            {config.content?.verification_status_label}
          </Text>
        </div> */}
        <Flex className={cx(`${rootClassName}__time-remaining-title`)}>
          <div className="t-border-r--circle t-background-grey-5 u-height--lg u-margin-top u-padding--sm">
            <TimeLockedIcon />
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
              "u-padding--md t-border-r--md t-background-grey-5"
            )}
          >
            <Flex.Item>
              <Flex direction="vertical" align="center" justify="center">
                <Text size="md" className="u-font-weight-bold">
                  {timeRemaining.days}
                </Text>
                <Text size="xs" className="t-color-grey-50">
                  Days
                </Text>
              </Flex>
            </Flex.Item>
            <Flex.Item>:</Flex.Item>
            <Flex.Item>
              <Flex direction="vertical" align="center" justify="center">
                <Text size="md" className="u-font-weight-bold">
                  {timeRemaining.hours}
                </Text>
                <Text size="xs" className="t-color-grey-50">
                  Hours
                </Text>
              </Flex>
            </Flex.Item>
            <Flex.Item>:</Flex.Item>
            <Flex.Item>
              <Flex direction="vertical" align="center" justify="center">
                <Text size="md" className="u-font-weight-bold">
                  {timeRemaining.minutes}
                </Text>
                <Text size="xs" className="t-color-grey-50">
                  Minutes
                </Text>
              </Flex>
            </Flex.Item>
            <Text
              size="xs"
              tag="div"
              className={cx(
                `${rootClassName}__days-left`,
                "u-padding--sm u-font-weight-bold t-background-grey-20 t-border-r--sm"
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
      {config.reelRace ? (
        <PlayGameButton game={config.reelRace.game} />
      ) : (
        <DismissButton />
      )}
    </Modal>
  );
};
