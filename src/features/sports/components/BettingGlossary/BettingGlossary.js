// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";
import { range } from "ramda";
import { SportsModal } from "Features/sports/components/SportsModal";

const linkTo = term => () => {
  const entry = window.document.querySelector(`[data-glossary-term="${term}"]`);
  const modalContent = window.document.querySelector(".c-modal__content");

  modalContent.scrollTo(0, entry.offsetTop);
};

const content = range(0, 50).map(i => [
  `Glossary Entry ${i}`,
  <p data-glossary-term={`glossary.term${i}`}>
    <span
      onClick={linkTo(`glossary.term${i + 10}`)}
      className="u-display--block u-border-bottom u-cursor-pointer"
    >
      go to entry {i + 10}
    </span>
    A bet market that is popular in football, where one team receives a “virtual
    head start”, leading the game by an amount of goals before the game starts.
    The team who scores the most with the handicap applied is the winner. See
    ‘handicap’.
  </p>,
]);

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
