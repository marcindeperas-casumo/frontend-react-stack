// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { SportsModal } from "Features/sports/components/SportsModal";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import "./BettingGlossary.scss";
import DangerousHtml from "Components/DangerousHtml";
import { getCssCustomProperty } from "Utils/utils";

const dataAttr = {
  term: "data-glossary-term",
  link: "data-glossary-link",
};

const highlightedClass = "c-betting-glossary-entry--highlight";

const scrollToTerm = term => {
  const linkedTerm = window.document.querySelector(
    `[${dataAttr.term}="${term}"]`
  );

  if (linkedTerm) {
    const highlighted =
      window.document.querySelectorAll(`.${highlightedClass}`) || [];

    Array.from(highlighted).map(x => x.classList.remove(highlightedClass));

    linkedTerm.classList.add(highlightedClass);

    const topBarOffset = parseInt(
      getCssCustomProperty("--shell-offset-top") || "75px",
      10
    );

    window.document
      .querySelector(".c-modal__content")
      .scrollTo(0, linkedTerm.offsetTop - topBarOffset);
  }
};

const handleLinkedEntries = event => {
  const linkNode = event.currentTarget.querySelector(`[${dataAttr.link}]`);

  if (linkNode) {
    const linkTerm = linkNode.getAttribute(dataAttr.link);
    scrollToTerm(linkTerm);
  }
};

class GlossaryTypedQuery extends Query<GlossaryQuery, null> {}

export const GLOSSARY_QUERY = gql`
  query GlossaryQuery {
    glossary {
      id
      term
      aka
      definition
    }
  }
`;

const BettingGlossaryEntry = ({ id, term, aka, definition }) => (
  <Flex.Item
    className="c-betting-glossary-entry u-padding-y--md u-pointer-events-none"
    onClick={handleLinkedEntries}
    data-glossary-term={id}
  >
    <strong>{term}: </strong>
    <span>
      {aka && (
        <em>
          <DictionaryTerm termKey="glossary.aka" /> {aka}
          <br />
        </em>
      )}
    </span>
    <DangerousHtml html={definition} />
  </Flex.Item>
);

type Props = {
  onClose: any => any,
};

export const BettingGlossary = ({ onClose }: Props) => (
  <SportsModal>
    <SportsModal.Header
      onClose={onClose}
      className="t-background-blue-light-1 t-background-blue u-padding-x--none"
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
