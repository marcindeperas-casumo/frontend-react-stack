import React from "react";
import { useLocation } from "@reach/router";
import { useLocalStorage } from "react-use";
import sortBy from "lodash/sortBy";
import { getUrlSearchParam } from "Utils";
import { useTranslations } from "Utils/hooks";
import { verticalSlugMapping } from "./PromotionPage.constants";
import { PromotionPage } from "./PromotionPage";

export const verticalCampaigns = [
  { origin: "casino", slug: "promotion-lists.lis-casino-promos" },
  { origin: "sports", slug: "promotion-lists.lis-sports-promos" },
];

export const PromotionPageContainer = () => {
  const { search } = useLocation();
  const [verticalOriginInStorage]: any = useLocalStorage(
    "promotionsVerticalOrigin"
  );
  const promotionListsTranslations = useTranslations<{
    content_builder: Array<Object>;
    more_link?: string;
  }>("built-pages.promotion-lists-page");

  const verticalOriginParam = getUrlSearchParam(search, "origin");
  const verticalOrigin: string = verticalOriginParam || verticalOriginInStorage;

  const prioritizeByVerticalFn = obj => obj.slug !== mappedVerticalSlug;
  const mappedVerticalSlug = verticalSlugMapping[verticalOrigin];
  const promotionListsSlugs = promotionListsTranslations?.content_builder;

  if (promotionListsSlugs) {
    const alteredList = promotionListsSlugs.map(obj => ({
      ...obj,
      hideViewMore: true,
    }));
    const prioritizedLists = sortBy(alteredList, prioritizeByVerticalFn);
    return <PromotionPage promotionLists={prioritizedLists} />;
  }
  return null;
};
