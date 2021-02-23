// @flow
import * as React from "react";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";

type Props = {
  /** onClick handler of the footer button */
  onClick: () => any,
  /** child components to render */
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
};

// @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
const ModalButtonFooter = ({ onClick, children }: Props): React.Node => (
  <Flex
    align="stretch"
    justify="center"
    className="u-padding--md t-background-white"
  >
    <ButtonPrimary size="md" onClick={onClick} className="u-width--full">
      {children}
    </ButtonPrimary>
  </Flex>
);

export default ModalButtonFooter;
