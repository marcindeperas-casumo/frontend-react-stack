import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon } from "@casumo/cmp-icons";
import DangerousHtml from "Components/DangerousHtml";
import { useTranslations } from "Utils/hooks";

export type Props = {
  translationSlug: string;
};

export function GenericNotification({ translationSlug }: Props) {
  const [acknowledged, setAcknowledged] = React.useState(false);
  const [prevSlug, setPrevSlug] = React.useState(translationSlug);
  const t = useTranslations(translationSlug, true);

  React.useEffect(() => {
    if (translationSlug !== prevSlug) {
      setAcknowledged(false);
      setPrevSlug(translationSlug);
    }
  }, [prevSlug, setPrevSlug, setAcknowledged, translationSlug]);

  if (!t || acknowledged) {
    return null;
  }

  return (
    <Flex
      direction="horizontal"
      className="u-padding--md bg-white t-border-r u-margin-bottom--md"
      align="center"
    >
      <Flex.Block>
        <Text size="sm" tag="span" className="text-black">
          <DangerousHtml html={t} />
        </Text>
      </Flex.Block>
      <Flex.Item>
        <div
          onClick={() => setAcknowledged(true)}
          className="t-border-r--circle bg-grey-0 u-padding u-cursor--pointer"
        >
          <CloseIcon className="text-black" />
        </div>
      </Flex.Item>
    </Flex>
  );
}
