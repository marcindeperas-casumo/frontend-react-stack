import Flex from "@casumo/cmp-flex";
import React from "react";
import { showTerms } from "Services/ShowTermsService";
import { OpenModalMutation } from "Features/sports/components/GraphQL";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { MODAL } from "Features/sports/components/Modals";
import DangerousHtml from "Components/DangerousHtml";

export const SportsFooter = () => (
  <Flex
    className="c-sports-footer text-grey-50 u-font-weight-bold u-padding--xlg bg-white"
    align="center"
    justify="center"
    style={{ textDecoration: "underline" }}
    spacing="xlg"
  >
    <Flex.Item>
      <span className="u-cursor--pointer" onClick={showTerms}>
        <DictionaryTerm termKey="footer.terms">
          {footerTermsText => <DangerousHtml html={footerTermsText} />}
        </DictionaryTerm>
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
            <DictionaryTerm termKey="footer.glossary" />
          </span>
        )}
      </OpenModalMutation>
    </Flex.Item>
  </Flex>
);
