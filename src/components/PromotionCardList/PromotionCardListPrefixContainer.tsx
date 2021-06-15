import React from "react";
import PromotionCardListContainer from "./PromotionCardListContainer";

type Props = {
  slug_2: string;
  title?: string;
  showSeeMoreLink?: boolean;
};

/** This is temporary prefix since slug_2 is now created to be used for multiple cases in cms and automatically omits prefix -
 * this wrapper will be deleted once slug is no longer used from cms
 * and then it would simply be a change of renaming slug to slug_2 inside PromotionCardListContainer */
export const PromotionCardListPrefixContainer = ({
  slug_2,
  title,
  showSeeMoreLink,
}: Props) => {
  return (
    <PromotionCardListContainer
      slug={`campaigns.${slug_2}`}
      name={title}
      showSeeMoreLink={showSeeMoreLink}
    />
  );
};
