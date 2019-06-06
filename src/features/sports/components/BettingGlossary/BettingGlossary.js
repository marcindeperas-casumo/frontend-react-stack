// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";
import { range } from "ramda";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { SportsModal } from "Features/sports/components/SportsModal";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import "./BettingGlossary.scss";
import DangerousHtml from "Components/DangerousHtml";

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

class GlossaryTypedQuery extends Query<GlossaryQuery, null> {}

export const GLOSSARY_QUERY = gql`
  query GlossaryQuery {
    glossary {
      term
      aka
      definition
    }
  }
`;

const BettingGlossaryEntry = ({ term, definition }) => (
  <Flex.Item
    className="c-betting-glossary-entry u-padding-vert--md u-pointer-events-none"
    onClick={handleLinkedEntries}
  >
    <span>
      <strong>{term}: </strong>
      <DangerousHtml html={definition} />
    </span>
  </Flex.Item>
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
      <DictionaryTerm termKey="glossary.heading" />
    </SportsModal.Header>
    <SportsModal.Content>
      <GlossaryTypedQuery query={GLOSSARY_QUERY}>
        {({ data, loading }) => {
          if (loading) {
            return "loading";
          }

          return data && data.glossary ? (
            <List items={data.glossary} render={BettingGlossaryEntry} />
          ) : (
            "show error component"
          );
        }}
      </GlossaryTypedQuery>
    </SportsModal.Content>
  </SportsModal>
);
