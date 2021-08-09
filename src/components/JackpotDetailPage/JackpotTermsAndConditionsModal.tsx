import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { useTranslations } from "Utils/hooks";
import { ModalHeader, ModalLoadingState } from "Components/RSModal";
import type { ModalContentComponent } from "Components/RSModal";

type Props = ModalContentComponent<{}>;

export function JackpotTermsAndConditionsModal(props: Props) {
  const t = useTranslations<{ title: string; content: string }>(
    `jackpots-terms.${props.config.slug}`
  );

  if (!t) {
    return <ModalLoadingState />;
  }

  return (
    <>
      <ModalHeader
        title={t.title}
        showCloseButton
        closeAction={props.closeModal}
      />
      <Flex className="u-overflow-x--hidden u-padding--md" direction="vertical">
        <Text tag="span">{t.content}</Text>
      </Flex>
    </>
  );
}
