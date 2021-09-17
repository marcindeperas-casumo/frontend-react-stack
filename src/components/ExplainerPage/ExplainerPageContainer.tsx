import React from "react";
import { useTranslations } from "Utils/hooks";
import { ExplainerPage } from "./ExplainerPage";

export const explainerPageConfig = {
  origin: "jackpots",
  slug: "built-pages.what-are-casumo-jackpots",
};

export const ExplainerPageContainer = () => {
  const explainerPageTranslations = useTranslations<{
    content_builder: Array<Object>;
    more_link?: string;
  }>(explainerPageConfig.slug);

  const promotionListsSlugs = explainerPageTranslations?.content_builder;

  if (promotionListsSlugs) {
    const alteredList = promotionListsSlugs.map(obj => ({
      ...obj,
      hideShowMoreLink: true,
    }));

    return <ExplainerPage promotionLists={alteredList} />;
  }
  return null;
};
