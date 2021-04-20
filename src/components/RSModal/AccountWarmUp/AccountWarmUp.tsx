import Text from "@casumo/cmp-text";
import CudlModal from "@casumo/cmp-modal";
import * as React from "react";
import { stringToHTML } from "Utils";
import { TAccountWarmUpPage } from "./AccountWarmUp.types";

type TProps = {
  closeModal: () => void;
  config: {
    content?: TAccountWarmUpPage;
  };
};

export const AccountWarmUp = ({ closeModal, config }: TProps) => {
  return (
    <CudlModal closeIcon={{ action: closeModal }}>
      <Text tag="h3" className="u-padding u-margin-top--lg u-text-align-center">
        {config.content?.title}
      </Text>
      <Text
        className="u-padding u-text-align-left"
        dangerouslySetInnerHTML={stringToHTML(config.content?.content)}
      ></Text>
      <Text className="u-padding u-text-align-left">
        {config.content?.days_left_label}
      </Text>
      <Text className="u-padding u-text-align-left">
        {config.content?.verification_status_label}
      </Text>
    </CudlModal>
  );
};
