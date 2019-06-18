// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import List from "@casumo/cmp-list";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { SportsModal } from "Features/sports/components/SportsModal";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { ErrorMessage } from "Components/ErrorMessage";
import { BettingGlossarySkeleton } from "Features/sports/components/BettingGlossary";
import "./BettingGlossary.scss";
import DangerousHtml from "Components/DangerousHtml";
import { getCssCustomProperty, isCmsEntryEmpty } from "Utils/utils";

const dataAttr = {
  term: "data-glossary-term",
  link: "data-glossary-link",
};

// hack to force reanimation if the class is applied to the same node in succession
// https://css-tricks.com/restart-css-animation/
const retriggerAnimation = (element: HTMLElement) => {
  // eslint-disable-next-line no-void
  void element.offsetWidth;
};

export const highlightedClass = "c-betting-glossary-entry--highlight";

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

type EntryProps = {
  id: string,
  term: string,
  aka: ?string,
  definition: string,
};

export class BettingGlossaryEntry extends React.PureComponent<EntryProps> {
  scrollToTerm = (linkedElement: HTMLElement) => {
    const highlighted =
      window.document.querySelectorAll(`.${highlightedClass}`) || [];

    Array.from(highlighted).forEach(elem => {
      elem.classList.remove(highlightedClass);
      retriggerAnimation(elem);
    });

    linkedElement.classList.add(highlightedClass);

    const topBarOffset = parseInt(
      getCssCustomProperty("--shell-offset-top") || "75px",
      10
    );

    window.document
      .querySelector(".c-modal__content")
      .scrollTo(
        0,
        linkedElement.offsetTop + topBarOffset - window.innerHeight * 0.5
      );
  };

  handleLinkedEntries = (event: SyntheticEvent<HTMLElement>) => {
    const linkNode = event.currentTarget.querySelector(`[${dataAttr.link}]`);

    if (!linkNode) {
      return;
    }

    const linkedTermId = linkNode.getAttribute(dataAttr.link) || "";
    const linkedElement = document.querySelector(
      `[${dataAttr.term}="${linkedTermId}"]`
    );

    if (linkedElement) {
      this.scrollToTerm(linkedElement);
    }
  };

  render() {
    return (
      <Flex.Item
        className="c-betting-glossary-entry u-font-weight-normal u-padding-y--md u-pointer-events-none"
        onClick={this.handleLinkedEntries}
        data-glossary-term={this.props.id}
      >
        <strong>{this.props.term}: </strong>
        {!isCmsEntryEmpty(this.props.aka) && (
          <span>
            <em>
              <DictionaryTerm
                data-test-glossary-entry-aka
                termKey="glossary.aka"
              />{" "}
              {this.props.aka}
              <br />
            </em>
          </span>
        )}
        <DangerousHtml html={this.props.definition} />
      </Flex.Item>
    );
  }
}

type Props = {
  onClose: any => void,
};

export const BettingGlossary = ({ onClose }: Props) => (
  <SportsModal>
    <SportsModal.Header
      onClose={onClose}
      className="c-sports-modal-header--left-align t-background-blue-light-1 t-color-white"
      dismissButtonClassName="t-background-blue-light-1 t-color-blue"
    >
      <DictionaryTerm termKey="glossary.heading" />
    </SportsModal.Header>
    <GlossaryTypedQuery query={GLOSSARY_QUERY}>
      {({ data, error, loading }) => {
        if (error) {
          return (
            <ErrorMessage
              errorMessage={<DictionaryTerm termKey="glossary.error" />}
            />
          );
        }

        if (!data?.glossary || loading) {
          return (
            <SportsModal.Content>
              <BettingGlossarySkeleton />
            </SportsModal.Content>
          );
        }

        return (
          <SportsModal.Content>
            <List
              items={data.glossary}
              render={props => <BettingGlossaryEntry {...props} />}
            />
          </SportsModal.Content>
        );
      }}
    </GlossaryTypedQuery>
  </SportsModal>
);
