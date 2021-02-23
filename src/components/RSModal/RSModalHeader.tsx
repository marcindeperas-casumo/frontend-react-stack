// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Skeleton from "@casumo/cmp-skeleton";
import { CloseIcon, ArrowLeftIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";

type BackButton =
  | {|
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'showBackButton'.
      showBackButton: true,
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'backAction'.
      backAction: () => void,
    |}
  // @ts-expect-error ts-migrate(2363) FIXME: The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
  | {| showBackButton?: false |};
type CloseButton =
  | {|
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'showCloseButton'.
      showCloseButton: true,
      // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'closeAction'. Did you mean 'Clos... Remove this comment to see the full error message
      closeAction: () => void,
    |}
  // @ts-expect-error ts-migrate(2363) FIXME: The right-hand side of an arithmetic operation mus... Remove this comment to see the full error message
  | {| showCloseButton?: false |};

// those shenanigans are to make flow aware that `closeAction` is required when
// `showCloseButton` is set to true, otherwise it shouldn't be present. Same thing
// goes for `backAction` and `showBackButton`.
type Props = {|
  // @ts-expect-error ts-migrate(2693) FIXME: 'BackButton' only refers to a type, but is being u... Remove this comment to see the full error message
  ...BackButton,
  // @ts-expect-error ts-migrate(2693) FIXME: 'CloseButton' only refers to a type, but is being ... Remove this comment to see the full error message
  ...CloseButton,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'title'.
  title?: string,
|};

const noIcon = <div style={{ height: 72, width: 72 }} />;

export function ModalHeader(props: Props) {
  return (
    <Flex
      className="u-width--full t-border-bottom t-color-grey-5 o-flex__item--no-shrink"
      direction="horizontal"
      align="center"
      spacing="md"
      justify="space-between"
    >
      {props.showBackButton ? (
        <ArrowLeftIcon
          className="u-padding-x--lg t-color-black u-cursor-pointer"
          onClick={props.backAction}
        />
      ) : (
        noIcon
      )}
      <Text
        tag="span"
        className="u-padding-y--lg u-font-weight-bold t-color-black o-flex__block u-text-align-center"
      >
        {props.title || <ModalTitleSkeleton />}
      </Text>
      {props.showCloseButton ? (
        <CloseIcon
          className="u-padding-x--lg t-color-black u-cursor-pointer"
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
