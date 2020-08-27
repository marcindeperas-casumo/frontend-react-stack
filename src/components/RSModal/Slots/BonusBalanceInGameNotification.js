// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { WAGERING_NOTIFICATION_TYPES } from "Models/playing/playing.constants";
import { ModalHeader } from "../RSModalHeader";

export type CmsContent = {
  modal_title: string,
  modal_text_bonus: string,
  modal_text_real: string,
  cta_text: string,
};

type BonusBalanceInGameNotificationProps = {
  acceptModal?: () => void,
  config: any,
  t: ?CmsContent,
};

export const BonusBalanceInGameNotification = ({
  acceptModal = () => null,
  config: { type },
  t,
}: BonusBalanceInGameNotificationProps) => {
  if (!t) {
    return null;
  }

  const modalTitle = t.modal_title;
  const modalText =
    type === WAGERING_NOTIFICATION_TYPES.BONUS_MONEY_WAGERING
      ? t.modal_text_bonus
      : t.modal_text_real;

  const modalCtaText = t.cta_text;

  return (
    <>
      <ModalHeader
        title={modalTitle}
        showCloseButton
        closeAction={acceptModal}
      />
      <Flex
        direction="vertical"
        spacing="md"
        align="stretch"
        className="u-padding--md u-padding--lg@desktop u-padding--lg@tablet"
      >
        <Flex.Item className="u-margin-bottom--5xlg">
          <div>
            <Text
              tag="p"
              className="u-text-align-center u-font u-font-weight-bold"
            >
              {modalText}
            </Text>
          </div>
        </Flex.Item>
        <Flex.Item>
          <ButtonPrimary
            onClick={acceptModal}
            size="sm"
            className="u-width--full"
          >
            {modalCtaText}
          </ButtonPrimary>
        </Flex.Item>
      </Flex>
    </>
  );
};
