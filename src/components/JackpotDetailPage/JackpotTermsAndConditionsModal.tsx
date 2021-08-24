import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import DangerousHtml from "Components/DangerousHtml";
import { useTranslations } from "Utils/hooks";
import { ModalHeader, ModalLoadingState } from "Components/RSModal";
import type { ModalContentComponent } from "Components/RSModal";

type Props = ModalContentComponent<{}>;

export function JackpotTermsAndConditionsModal(props: Props) {
  const cmsSlug = `jackpots-terms.${props.config.slug}`;
  const t = useTranslations<{ title: string }>(cmsSlug);
  const content = useTranslations(cmsSlug, true);

  if (!t || !content) {
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
        <Text tag="div">
          <DangerousHtml html={content} element="div" />
        </Text>
      </Flex>
    </>
  );
}
