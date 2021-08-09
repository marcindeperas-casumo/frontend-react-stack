import React, { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { unescape } from "lodash";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";

type TProps = {
  text: string;
  jackpotSlug: string;
};

export const JackpotTermsAndConditionsLink = ({
  text,
  jackpotSlug,
}: TProps) => {
  const dispatch = useDispatch();
  const showTermsAndConditions = (e: MouseEvent) => {
    dispatch(
      showModal(REACT_APP_MODAL.ID.JACKPOT_TERMS_AND_CONDITIONS, {
        slug: jackpotSlug,
        isWide: true,
      })
    );
  };

  return <a onClick={showTermsAndConditions}>{unescape(text)}</a>;
};
