// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { useTranslations } from "Utils/hooks";
import {
  CMS_SLUGS,
  WAGERING_NOTIFICATION_TYPES,
} from "Models/playing/playing.constants";

export type CmsContent = {
  modal_text_bonus: string,
  modal_text_real: string,
  cta_text: String,
};

type SlotsModalProps = {
  acceptModal?: () => void,
  config: any,
};

export const SlotsModal = ({
  acceptModal,
  config: { type },
}: SlotsModalProps) => {
  const t = useTranslations(CMS_SLUGS.MODAL_WAGERING);

  if (!t) {
    return null;
  }

  const modalText =
    type === WAGERING_NOTIFICATION_TYPES.BONUS_MONEY_WAGERING
      ? t.modal_text_bonus
      : t.modal_text_real;

  const modalCtaText = t.cta_text;

  return (
    <Flex
      direction="vertical"
      spacing="md"
      align="stretch"
      className="u-padding--md u-padding--lg@desktop u-padding--lg@tablet"
    >
      <Flex.Item className="u-margin-bottom--5xlg">
        <div>
          <p className="u-text-align-center u-font">
            <Text>{modalText}</Text>
          </p>
        </div>
      </Flex.Item>
      <Flex.Item>
        <ButtonPrimary
          onClick={acceptModal}
          size="md"
          className="u-width--full u-margin-top--5xlg"
        >
          <span>
            <Text>{modalCtaText}</Text>
          </span>
        </ButtonPrimary>
      </Flex.Item>
    </Flex>
  );
};
