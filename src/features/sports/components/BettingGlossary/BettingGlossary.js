// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { SportsModal } from "Features/sports/components/SportsModal";

const close = () => {
  /* TODO: implement */
};

export const BettingGlossary = () => (
  <SportsModal>
    <SportsModal.Header
      onClose={close}
      className="t-background-blue-light-1 t-background-blue"
      dismissButtonClassName="t-color-blue"
    >
      Betting Glossary
    </SportsModal.Header>
    <SportsModal.Content>
      <Flex>
        <Text>...List to go here</Text>
      </Flex>
    </SportsModal.Content>
  </SportsModal>
);
