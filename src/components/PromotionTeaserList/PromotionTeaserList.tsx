import React, { PureComponent } from "react";
import { PromotionTeaserRow } from "Components/PromotionTeaserRow";

type Props = {
  promotionsSlugs: Array<string>;
  fetchCampaign: () => void;
  fetchPromotions: () => void;
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
      <div className="u-padding-bottom--xlg o-wrapper u-margin-top--5xlg@tablet u-padding-top--lg u-margin-top--5xlg@desktop t-background-white t-border-r--none t-border-r--md@tablet t-border-r--md@desktop">
        <div className="u-padding-x--lg u-padding-y o-list-wrapper">
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
