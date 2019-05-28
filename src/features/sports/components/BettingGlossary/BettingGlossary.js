// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { SportsModal } from "Features/sports/components/SportsModal";

const close = () => {
  /* TODO: implement */
};

const content = [
  [
    "Accumulator",
    <p>
      See <a>Combination Bet</a>
    </p>,
  ],
  [
    "American odds",
    <p>
      <em>Also known as Moneyline</em> See <a>Odds format</a>.
    </p>,
  ],
  [
    "Asian handicap",
    <p>
      See <a>Combination Bet</a>
    </p>,
  ],
];

const repeatedContent = [...content, ...content, ...content];

const BettingGlossaryEntry = ({ term, entry }) => (
  <Flex.Item>
    <span>{term}:</span>
    <span>{entry}</span>
  </Flex.Item>
);

const renderGlossaryEntries = () =>
  repeatedContent.map(([term, entry]) => (
    <BettingGlossaryEntry term={term} entry={entry} />
  ));

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
      <Flex>{renderGlossaryEntries()}</Flex>
    </SportsModal.Content>
  </SportsModal>
);
