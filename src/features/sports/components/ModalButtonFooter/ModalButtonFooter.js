// @flow
import * as React from "react";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";

type Props = {
  /** onClick handler of the footer button */
  onClick: () => any,
  /** child components to render */
  children: React.Node,
};

const ModalButtonFooter = ({ onClick, children }: Props): React.Node => (
  <Flex
    align="stretch"
    justify="center"
    className="u-padding--md t-background-grey-light-3"
  >
    <Button
      size="md"
      variant="primary"
      onClick={onClick}
      className="u-width--full"
    >
      {children}
    </Button>
  </Flex>
);

export default ModalButtonFooter;
