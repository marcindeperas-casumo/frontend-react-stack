// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { showTerms } from "Services/ShowTermsService";
import { OpenModalMutation } from "Features/sports/components/GraphQL";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { MODAL } from "Features/sports/components/Modals";

export const SportsFooter = () => (
  <Flex
    className="c-sports-footer t-color-grey-50 u-font-weight-bold u-padding--xlg"
    align="center"
    justify="center"
    style={{ textDecoration: "underline" }}
    spacing="xlg"
  >
    <Flex.Item>
      <span className="u-cursor-pointer" onClick={showTerms}>
        <DictionaryTerm termKey="footer.terms" />
      </span>
    </Flex.Item>
    <Flex.Item>
      <OpenModalMutation variables={{ modal: MODAL.BETTING_GLOSSARY }}>
        {openChooseFavouritesModal => (
          <span
            className="u-cursor-pointer"
            onClick={openChooseFavouritesModal}
          >
            <DictionaryTerm termKey="footer.glossary" />
          </span>
        )}
      </OpenModalMutation>
    </Flex.Item>
  </Flex>
);
