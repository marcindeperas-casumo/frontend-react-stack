// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { WAGERING_NOTIFICATION_TYPES } from "Models/playing/playing.constants";
import { ModalHeader } from "../RSModalHeader";

export type CmsContent = {
  modal_title: String,
  modal_text_bonus: string,
  modal_text_real: string,
  cta_text: String,
};

type SlotsModalProps = {
  acceptModal?: () => void,
  config: any,
  t: CmsContent,
};

export const SlotsModal = ({
  acceptModal,
  config: { type },
  t,
}: SlotsModalProps) => {
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
      <ModalHeader title={modalTitle} showCloseButton />
      <Flex
        direction="vertical"
        spacing="md"
        align="stretch"
        className="u-padding--md u-padding--lg@desktop u-padding--lg@tablet"
      >
        <Flex.Item className="u-margin-bottom--5xlg">
          <div>
            <p className="u-text-align-center u-font">
              <Text tag="span" className="u-font-weight-bold">
                {modalText}
              </Text>
            </p>
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
