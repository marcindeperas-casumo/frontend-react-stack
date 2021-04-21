import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Modal from "@casumo/cmp-modal";
import * as React from "react";
import { stringToHTML } from "Utils";
import { TAccountWarmUpPage } from "./AccountWarmUp.types";
import { useAccountWarmUp } from "./useAccountWarmUp";

type TProps = {
  closeModal: () => void;
  config: {
    content?: TAccountWarmUpPage;
  };
};

export const AccountWarmUp = ({ closeModal, config }: TProps) => {
  const { timeRemaining } = useAccountWarmUp();

  return (
    <Modal closeIcon={{ action: closeModal }}>
      <Text tag="h3" className="u-padding u-margin-top--lg">
        {config.content?.title}
      </Text>
      <Text
        className="u-padding u-text-align-left"
        dangerouslySetInnerHTML={stringToHTML(config.content?.content)}
      ></Text>
      <Flex direction="vertical" className="u-margin-left--xlg">
        <div className="o-flex--horizontal">
          <Text className="u-padding u-text-align-left o-flex__block">
            {config.content?.verification_status_label}
          </Text>
        </div>
        <div className="o-flex--horizontal">
          <Text className="u-padding u-text-align-left o-flex__block">
            {config.content?.days_left_label}
          </Text>
        </div>

        {timeRemaining && (
          <Flex
            spacing="md"
            justify="center"
            className="u-padding--md t-border-r--md t-background-grey-5"
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
          </Flex>
        )}
      </Flex>
    </Modal>
  );
};
