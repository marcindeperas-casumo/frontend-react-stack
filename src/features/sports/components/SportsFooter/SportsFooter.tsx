import Flex from "@casumo/cmp-flex";
import React from "react";
import { showTerms } from "Services/ShowTermsService";
import { OpenModalMutation } from "Features/sports/components/GraphQL";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { MODAL } from "Features/sports/components/Modals";

export const SportsFooter = () => (
  <Flex
    className="c-sports-footer t-color-grey-50 u-font-weight-bold u-padding--xlg t-background-white"
    align="center"
    justify="center"
    style={{ textDecoration: "underline" }}
    spacing="xlg"
  >
    <Flex.Item>
      <span className="u-cursor--pointer" onClick={showTerms}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm termKey="footer.terms" />
      </span>
    </Flex.Item>
    <Flex.Item>
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Modal'. */}
      <OpenModalMutation variables={{ modal: MODAL.BETTING_GLOSSARY }}>
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '(openChooseFavouritesModal: any) => Element'... Remove this comment to see the full error message */}
        {openChooseFavouritesModal => (
          <span
            className="u-cursor--pointer"
            onClick={openChooseFavouritesModal}
          >
            {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
            <DictionaryTerm termKey="footer.glossary" />
          </span>
        )}
      </OpenModalMutation>
    </Flex.Item>
  </Flex>
);
