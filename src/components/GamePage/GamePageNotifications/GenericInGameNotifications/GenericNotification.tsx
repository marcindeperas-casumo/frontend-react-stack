import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon } from "@casumo/cmp-icons";
import DangerousHtml from "Components/DangerousHtml";
import { useTranslationsGql } from "Utils/hooks";
import { noop } from "Utils";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";

export type Props = {
  translationSlug: string;
  Icon?: React.ReactElement;
  Cta?: React.ReactElement;
  footer?: React.ReactElement;
  onClick?: (...args: any[]) => any;
};

export function GenericNotification({
  translationSlug,
  Icon,
  Cta,
  footer,
  onClick,
}: Props) {
  const [acknowledged, setAcknowledged] = React.useState(false);
  const [prevSlug, setPrevSlug] = React.useState(translationSlug);
  const isNotificationClickable = Boolean(onClick);

  const contentSlug = translationSlug.includes(":")
    ? translationSlug
    : `root:${translationSlug}:content`;

  const { t } = useTranslationsGql({
    content: contentSlug,
  });

  React.useEffect(() => {
    if (translationSlug !== prevSlug) {
      setAcknowledged(false);
      setPrevSlug(translationSlug);
    }
  }, [prevSlug, setPrevSlug, setAcknowledged, translationSlug]);

  if (!t || acknowledged) {
    return null;
  }

  const onClose = (e: React.SyntheticEvent) => {
    setAcknowledged(true);
    e.stopPropagation();
  };

  return (
    <Flex
      direction="horizontal"
      className={cx("u-padding--md bg-white t-border-r u-margin-bottom--md", {
        "u-cursor--pointer": isNotificationClickable,
      })}
      align="center"
      onClick={onClick || noop}
    >
      {Icon && <Flex.Item className="o-position--relative">{Icon}</Flex.Item>}
      <Flex.Block>
        <span>
          <Text size="sm" tag="span" className="text-black">
            <DangerousHtml html={t.content} />
            {footer}
          </Text>
          <MobileAndTablet>
            <>
              {Cta && (
                <div className="u-text-align-center u-margin-top--sm">
                  {Cta}
                </div>
              )}
            </>
          </MobileAndTablet>
        </span>
      </Flex.Block>
      <Flex.Item>
        <Desktop>
          <>{Cta && <>{Cta}</>}</>
        </Desktop>
      </Flex.Item>
      <Flex.Item>
        <div
          onClick={onClose}
          className="t-border-r--circle bg-grey-0 u-padding u-cursor--pointer"
        >
          <CloseIcon className="text-black" />
        </div>
      </Flex.Item>
    </Flex>
  );
}
