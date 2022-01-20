import React from "react";
import { useDispatch } from "react-redux";
import { ContentHtmlContainer } from "Components/ContentHtml/ContentHtmlContainer";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";
import { useTranslations } from "Utils/hooks";
import {
  REACT_APP_EVENT_ROUTE_CHANGE,
  REACT_APP_MODAL,
  ROUTE_IDS,
  ROUTES,
} from "Src/constants";
import { showModal } from "Models/modal";
import bridge from "Src/DurandalReactBridge";

export function TermsAndConditionsForBonusesContainer() {
  const dispatch = useDispatch();
  const t = useTranslations<{
    terms_and_conditions_for_bonuses_and_rewards: string;
  }>("mobile.footer");
  const sportsTerms = useTranslations("sports-terms-bonus-rewards", true);
  const [isSport, setIsSport] = React.useState(
    window.location.pathname.split("/").includes(ROUTES[ROUTE_IDS.SPORTS])
  );

  bridge.on(REACT_APP_EVENT_ROUTE_CHANGE, route => {
    setIsSport(route.config.id === ROUTES[ROUTE_IDS.SPORTS]);
  });

  if (!t) {
    return <ParagraphSkeleton size="sm" className="u-margin-y--2xlg" />;
  }

  const content = isSport
    ? sportsTerms
    : t.terms_and_conditions_for_bonuses_and_rewards;

  if (content === "&nbsp;") {
    return null;
  }

  const onClickExpand = () =>
    dispatch(
      showModal(REACT_APP_MODAL.ID.CONTENT_HTML, { input: { html: content } })
    );

  return (
    <>
      <ContentHtmlContainer
        expandable
        html={content}
        className="u-font-xs bg-white u-padding--lg t-border-r--md text-grey-50"
        onClickExpand={onClickExpand}
      />
      <div className="u-height--sm bg-grey-0 t-border-r u-margin-y--2xlg" />
    </>
  );
}
