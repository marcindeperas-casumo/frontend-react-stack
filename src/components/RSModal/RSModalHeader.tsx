import Flex from "@casumo/cmp-flex";
import Skeleton from "@casumo/cmp-skeleton";
import { CloseIcon, ArrowLeftIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import * as React from "react";

type BackButton = {
  showBackButton?: boolean;
  backAction?: () => void;
};
type CloseButton = {
  showCloseButton?: boolean;
  closeAction?: () => void;
};

// those shenanigans are to make flow aware that `closeAction` is required when
// `showCloseButton` is set to true, otherwise it shouldn't be present. Same thing
// goes for `backAction` and `showBackButton`.
type Props = BackButton &
  CloseButton & {
    title?: string;
  };

const noIcon = <div style={{ height: 72, width: 72 }} />;

export function ModalHeader(props: Props) {
  return (
    <Flex
      className="u-width--full t-border-bottom text-grey-5 o-flex__item--no-shrink"
      direction="horizontal"
      align="center"
      spacing="md"
      justify="space-between"
    >
      {props.showBackButton ? (
        <ArrowLeftIcon
          className="u-padding-x--lg text-black u-cursor--pointer"
          onClick={props.backAction}
        />
      ) : (
        noIcon
      )}
      <Text
        tag="span"
        className="u-padding-y--lg u-font-weight-bold text-black o-flex__block u-text-align-center"
      >
        {props.title || <ModalTitleSkeleton />}
      </Text>
      {props.showCloseButton ? (
        <CloseIcon
          className="u-padding-x--lg text-black u-cursor--pointer"
          onClick={props.closeAction}
        />
      ) : (
        noIcon
      )}
    </Flex>
  );
}

export function ModalTitleSkeleton() {
  return (
    <Text>
      <Skeleton width="100%" height={10}>
        <rect x="0" y="0" rx="2" ry="2" width="100%" height="100%" />
      </Skeleton>
    </Text>
  );
}
