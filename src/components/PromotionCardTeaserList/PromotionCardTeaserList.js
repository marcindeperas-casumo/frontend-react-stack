// @flow
import React, { PureComponent } from "react";
import PromotionCardTeaser from "Components/PromotionCardTeaser";
import classNames from "classnames";
import "./PromotionCardTeaserList.scss";

type Props = {
  promotionsSlugs: Array<string>,
  backgroundColor?: string,
  fetchCampaign: () => void,
  fetchPromotions: () => void,
};

class PromotionCardTeaserList extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchCampaign();
    this.props.fetchPromotions();
  }

  render() {
    const { promotionsSlugs, backgroundColor } = this.props;
    const backgroundImage =
      "https://cms.casumo.com/wp-content/uploads/2018/11/squiggles.svg";
    if (!promotionsSlugs.length) {
      return null;
    }

    return (
      <div
        className={classNames(
          backgroundColor && `t-background-${backgroundColor}`,
          "u-margin-bottom--lg"
        )}
      >
        <img src={`${backgroundImage}`} alt="" />
        <div className="c-promotion-card-teaser-list">
          {promotionsSlugs.map(promotionSlug => (
            <div className="u-margin-bottom--md" key={promotionSlug}>
              <PromotionCardTeaser
                slug={`promotions.${promotionSlug}`}
                link={`promotions/${promotionSlug}`}
                key={promotionSlug}
              />
            </div>
          ))}
        </div>
        <img src={`${backgroundImage}`} alt="" />
      </div>
    );
  }
}

export default PromotionCardTeaserList;
