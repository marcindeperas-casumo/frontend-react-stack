// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

type Props = {
  /** onClick handler of the footer button */
  onClick: () => any,
  /** child components to render */
  children: React.Node,
};

const ModalButtonFooter = ({ onClick, children }: Props): React.Node => (
  <Flex.Block onClick={onClick} className="t-background-green">
    <Text className="t-color-white u-font-weight-bold u-padding--lg u-text-align-center">
      {children}
    </Text>
  </Flex.Block>
);

export default ModalButtonFooter;
