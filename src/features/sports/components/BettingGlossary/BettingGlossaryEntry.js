// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import DangerousHtml from "Components/DangerousHtml";
import { getCssCustomProperty, isCmsEntryEmpty } from "Utils/utils";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";

import "./BettingGlossaryEntry.scss";

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

type Props = {
  id: string,
  term: string,
  aka: ?string,
  definition: string,
};

export class BettingGlossaryEntry extends React.PureComponent<Props> {
  scrollToTerm = (linkedElement: HTMLElement) => {
    const highlighted =
      window.document.querySelectorAll(`.${highlightedClass}`) || [];

    Array.from(highlighted).forEach(elem => {
      elem.classList.remove(highlightedClass);
      retriggerAnimation(elem);
    });

    linkedElement.classList.add(highlightedClass);

    if ("scrollIntoView" in linkedElement) {
      linkedElement.scrollIntoView({ behavior: "smooth" });
    } else {
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
    }
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
        className="c-betting-glossary-entry t-color-chrome-dark-3 u-font-weight-normal u-pointer-events-none"
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
