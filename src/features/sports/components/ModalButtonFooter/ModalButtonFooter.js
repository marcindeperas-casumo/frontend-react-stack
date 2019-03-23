// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Button from "@casumo/cmp-button";

type Props = {
  /** onClick handler of the footer button */
  onClick: () => any,
  /** child components to render */
  children: React.Node,
};

const ModalButtonFooter = ({ onClick, children }: Props): React.Node => (
  <div className="t-background-grey-light-3 u-padding--md">
    <Button size="md" onClick={onClick} className="u-width--1/1">
      {children}
    </Button>
  </div>
);

export default ModalButtonFooter;
