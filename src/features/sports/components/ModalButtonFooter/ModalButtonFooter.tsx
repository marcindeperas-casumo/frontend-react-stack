import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import * as React from "react";

type Props = {
  /** onClick handler of the footer button */
  onClick: () => any;
  /** child components to render */
  children: React.ReactNode;
};

const ModalButtonFooter = ({ onClick, children }: Props): React.ReactNode => (
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
