import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon } from "@casumo/cmp-icons";
import DangerousHtml from "Components/DangerousHtml";
import type { TReusableNotificationTranslations } from "../GamePageNotificationsConstants";

export type TReusableNotificationProps = {
  t: TReusableNotificationTranslations;
};

export function ReusableNotification({ t }: TReusableNotificationProps) {
  const [acknowledged, setAcknowledged] = React.useState(false);

  if (!t || acknowledged) {
    return null;
  }

  return (
    <>
      <Flex
        direction="horizontal"
        className="u-padding--md bg-white t-border-r u-margin-bottom--md"
        align="center"
      >
        {t.notification_image && (
          <Flex.Item className="o-position--relative">
            <img
              className="u-display--block t-border-r--circle"
              width={40}
              height={40}
              alt=""
              src={t.notification_image}
            />
          </Flex.Item>
        )}
        {t.notification_content && (
          <Flex.Block>
            <Text size="sm" tag="span" className="text-black">
              <DangerousHtml html={t.notification_content} />
            </Text>
          </Flex.Block>
        )}
        <Flex.Item>
          <div
            onClick={() => setAcknowledged(true)}
            className="t-border-r--circle bg-grey-0 u-padding u-cursor--pointer"
          >
            <CloseIcon className="text-black" />
          </div>
        </Flex.Item>
      </Flex>
    </>
  );
}
