import React from "react";
import sortBy from "lodash/sortBy";
import { useTranslations } from "Utils/hooks";
import { ExplainerPage } from "./ExplainerPage";

type TProps = {
  jackpotSlug: string;
};

export const ExplainerPageContainer = ({ jackpotSlug }: TProps) => {
  const explainerPageTranslations = useTranslations<{
    content_builder: Array<Object>;
    more_link?: string;
  }>(`built-pages.what-are-${jackpotSlug}`);

  const promotionListsSlugs = explainerPageTranslations?.content_builder;

  if (promotionListsSlugs) {
    const alteredList = promotionListsSlugs.map(obj => ({
      ...obj,
      hideShowMoreLink: true,
    }));

    const prioritizedLists = sortBy(alteredList);
    // @ts-expect-error: apply fix if you know the context
    return <ExplainerPage promotionLists={prioritizedLists} />;
  }
  return null;
};
