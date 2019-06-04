// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";
import { SportsModal } from "Features/sports/components/SportsModal";

const close = () => {
  /* TODO: implement */
};

const content = [
  [
    "Accumulator",
    <span id="acc">
      See <a>Combination Bet</a>
    </span>,
  ],
  [
    "American odds",
    <span id="ao">
      <em>Also known as Moneyline</em> See <a href="ah">Odds format</a>.
    </span>,
  ],
  [
    "Asian handicap",
    <span id="ah">
      A bet market that is popular in football, where one team receives a
      “virtual head start”, leading the game by an amount of goals before the
      game starts. The team who scores the most with the handicap applied is the
      winner. See ‘handicap’.
    </span>,
  ],
];

const repeatedContent = [...content, ...content, ...content];

const BettingGlossaryEntry = ({ term, definition }) => (
  <Flex.Item className="u-padding-vert--md">
    <span>
      <strong>{term}: </strong>
      {definition}
    </span>
  </Flex.Item>
);

const renderGlossaryEntry = ([term, definition]) => (
  <BettingGlossaryEntry term={term} definition={definition} />
);

type Props = {
  onClose: any => any,
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
      <List items={repeatedContent} render={renderGlossaryEntry} />
    </SportsModal.Content>
  </SportsModal>
);
