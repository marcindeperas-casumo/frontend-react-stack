// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";
import { range } from "ramda";
import { SportsModal } from "Features/sports/components/SportsModal";
import "./BettingGlossary.scss";

const DATA_ATTR = "data-glossary-term";

const scrollToTerm = term => {
  const entry = window.document.querySelector(`[${DATA_ATTR}="${term}"]`);

  if (entry) {
    window.document
      .querySelector(".c-modal__content")
      .scrollTo(0, entry.offsetTop);
  }
};

const handleLinkedEntries = event => {
  const termNode = event.currentTarget.querySelector(`[${DATA_ATTR}]`);

  if (termNode) {
    const term = termNode.getAttribute(DATA_ATTR);
    scrollToTerm(term);
  }
};

const content = range(0, 50).map(i => [
  `Glossary Entry ${i}`,
  <p data-glossary-term={`glossary-term${i}`}>
    <span
      data-glossary-term={`glossary-term${i + 10}`}
      className="u-display--block u-border-bottom u-cursor-pointer"
    >
      go to entry {i + 10}
    </span>
    A bet market that is popular in football, where one team receives a “virtual
    head start”, leading the game by an amount of goals before the game starts.
    The team who scores the most with the handicap applied is the winner.{" "}
    <strong>
      <em>See ‘handicap’.</em>
    </strong>
  </p>,
]);

const repeatedContent = [...content, ...content, ...content];

const BettingGlossaryEntry = ({ term, definition }) => (
  <Flex.Item
    className="c-betting-glossary-entry u-padding-vert--md u-pointer-events-none"
    onClick={handleLinkedEntries}
  >
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

export const BettingGlossary = ({ onClose }: Props) => (
  <SportsModal>
    <SportsModal.Header
      onClose={onClose}
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
