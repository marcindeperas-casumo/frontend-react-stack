import Text from "@casumo/cmp-text";
import Modal from "@casumo/cmp-modal";
import * as React from "react";
import { stringToHTML } from "Utils";
import { useTranslations } from "Utils/hooks";

type Props = {
  closeModal: () => void;
};

export type AccountWarmUpPage = {
  title: string;
  content: string;
  daysLeft: string;
  verificationStatus: string;
  ctaText: string;
};

export const AccountWarmUp = ({ closeModal }: Props) => {
  const t = useTranslations<AccountWarmUpPage>("shared.account-warm-up");

  return (
    <Modal closeIcon={{ action: closeModal }}>
      <Text tag="h3" className="u-padding u-margin-top--lg u-text-align-center">
        {t?.title || "Your action is still fresh"}
      </Text>
      <Text
        className="u-padding u-text-align-left"
        dangerouslySetInnerHTML={stringToHTML(
          t?.content ||
            "You can only play in reel races after 30 days and upon succesful verification of your account"
        )}
      ></Text>
    </Modal>
  );
};
