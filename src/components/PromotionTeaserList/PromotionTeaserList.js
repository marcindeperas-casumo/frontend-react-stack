// @flow
import React, { PureComponent } from "react";
import { PromotionTeaserRow } from "Components/PromotionTeaserRow";

type Props = {
  promotionsSlugs: Array<string>,
  fetchCampaign: () => void,
  fetchPromotions: () => void,
};

export class PromotionTeaserList extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchCampaign();
    this.props.fetchPromotions();
  }

  render() {
    const { promotionsSlugs } = this.props;

    if (!promotionsSlugs.length) {
      return null;
    }

    return (
      <div className="u-padding-bottom--xlg">
        <div className="u-padding-x--lg u-padding-y">
          {promotionsSlugs.map(promotionSlug => (
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
}
