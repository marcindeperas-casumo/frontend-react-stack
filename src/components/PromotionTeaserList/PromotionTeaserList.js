// @flow
import React from "react";
import { PromotionTeaserRow } from "Components/PromotionTeaserRow";

type Props = {
  promotionsSlugs: Array<string>,
  fetchCampaign: () => void,
  fetchPromotions: () => void,
};

export function PromotionTeaserList(props: Props) {
  React.useEffect(() => {
    props.fetchCampaign();
    props.fetchPromotions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!props.promotionsSlugs.length) {
    return null;
  }

  return (
    <div className="u-padding-bottom--xlg">
      <div className="u-padding-x--lg u-padding-y">
        {props.promotionsSlugs.map(promotionSlug => (
          <PromotionTeaserRow
            slug={`promotions.${promotionSlug}`}
            link={`promotions/${promotionSlug}`}
            key={promotionSlug}
          />
        ))}
      </div>
    </div>
  );
}
