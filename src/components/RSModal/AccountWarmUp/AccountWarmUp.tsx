import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Modal from "@casumo/cmp-modal";
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

  const playButtonConfig = {
    text: config.content?.play_button_text,
    icon: PlayIcon,
    action: () => {
      acceptModal();
      launchGame({ slug: config.reelRace.game.slug });
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
      className={cx(rootClassName, classNames)}
      closeIcon={{ action: closeModal }}
      primaryButton={config.reelRace ? playButtonConfig : dismissButtonConfig}
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
          <Flex className={cx(`${rootClassName}__time-remaining-title`)}>
            <div className="t-border-r--circle t-background-grey-5 u-height--xlg u-width--xlg u-margin-top u-margin-right u-padding--sm">
              <TimeLockedIcon
                size="sm"
                style={{ width: "24px", height: "20px" }}
                className="t-color-grey-50"
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
      </Flex>
    </Modal>
  );
};
