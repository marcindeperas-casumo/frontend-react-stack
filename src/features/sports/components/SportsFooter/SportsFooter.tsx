import React from "react";
import { showTerms } from "Services/ShowTermsService";
import { OpenModalMutation } from "Features/sports/components/GraphQL";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { MODAL } from "Features/sports/components/Modals";
import DangerousHtml from "Components/DangerousHtml";

export const SportsFooter = () => (
  <div className="c-sports-footer text-grey-50 font-bold p-6 bg-white underline justify-center flex">
    <span className="cursor-pointer mr-4" onClick={showTerms}>
      <DictionaryTerm termKey="footer.terms">
        {footerTermsText => <DangerousHtml html={footerTermsText} />}
      </DictionaryTerm>
    </span>
    {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Modal'. */}
    <OpenModalMutation variables={{ modal: MODAL.BETTING_GLOSSARY }}>
      {/* @ts-expect-error ts-migrate(2559) FIXME: Type '(openChooseFavouritesModal: any) => Element'... Remove this comment to see the full error message */}
      {openChooseFavouritesModal => (
        <span
          className="cursor-pointer"
          onClick={openChooseFavouritesModal}
        >
          <DictionaryTerm termKey="footer.glossary" />
        </span>
      )}
    </OpenModalMutation>
  </div>
);
