import React from "react";
import { showTerms } from "Services/ShowTermsService";
import { OpenModalMutation } from "Features/sports/components/GraphQL";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { MODAL } from "Features/sports/components/Modals";
import DangerousHtml from "Components/DangerousHtml";
import { kambiNavigate } from "Features/sports/kambi";

export const SportsFooter = () => (
  <div className="c-sports-footer text-grey-50 font-bold p-md bg-white underline justify-center flex">
    <span className="cursor-pointer mr-md" onClick={showTerms}>
      <DictionaryTerm termKey="footer.terms">
        {footerTermsText => <DangerousHtml html={footerTermsText} />}
      </DictionaryTerm>
    </span>
    <OpenModalMutation variables={{ modal: MODAL.BETTING_GLOSSARY }}>
      {/* @ts-expect-error ts-migrate(2559) FIXME: Type '(openChooseFavouritesModal: any) => Element'... Remove this comment to see the full error message */}
      {openChooseFavouritesModal => (
        <span className="cursor-pointer" onClick={openChooseFavouritesModal}>
          <DictionaryTerm termKey="footer.glossary" />
        </span>
      )}
    </OpenModalMutation>
    <span
      className="cursor-pointer ml-md"
      onClick={() => kambiNavigate("settings")}
    >
      <DictionaryTerm termKey="footer.settings" />
    </span>
  </div>
);
