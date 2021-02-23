// @flow
import React from "react";
import { useDispatch } from "react-redux";
import { ContentHtml } from "Components/ContentHtml";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";
import { useTranslations } from "Utils/hooks";
import { REACT_APP_MODAL } from "Src/constants";
import { showModal } from "Models/modal";

export function TermsAndConditionsForBonusesContainer() {
  const dispatch = useDispatch();
  const t = useTranslations<{
    terms_and_conditions_for_bonuses_and_rewards: string,
  }>("mobile.footer");

  if (!t) {
    return <ParagraphSkeleton size="sm" className="u-margin-y--2xlg" />;
  }

  const content = t.terms_and_conditions_for_bonuses_and_rewards;

  if (content === "&nbsp;") {
    return null;
  }

  const onClickExpand = () =>
    dispatch(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      showModal(REACT_APP_MODAL.ID.CONTENT_HTML, { input: { html: content } })
    );

  return (
    <>
      <ContentHtml
        expandable
        html={content}
        className="u-font-xs t-background-white u-padding--lg t-border-r--md t-color-grey-50"
        onClickExpand={onClickExpand}
      />
      <div className="u-height--sm t-background-grey-0 t-border-r u-margin-y--2xlg" />
    </>
  );
}
