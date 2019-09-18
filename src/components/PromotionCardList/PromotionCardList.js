// @flow
import React, { PureComponent } from "react";
import ScrollableList from "Components/ScrollableList";
import PromotionCardContainer from "Components/PromotionCard";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, Mobile } from "Components/ResponsiveLayout";
import "./PromotionCardList.scss";

type Props = {
  promotionsSlugs: Array<string>,
  fetchCampaign: () => void,
  fetchPromotions: () => void,
  title?: string,
  seeMore: string,
};

const promotionCardContainerRenderer = ({ id }) => (
  <PromotionCardContainer
    slug={`promotions.${id}`}
    link={`promotions/${id}`}
    key={id}
  />
);

class PromotionCardList extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchCampaign();
    this.props.fetchPromotions();
  }

  render() {
    const { title = "", promotionsSlugs, seeMore } = this.props;
    const hasNoPromotionSlugs = !promotionsSlugs.length;
    const seeMoreUrl = "/promotions";
    const itemClassName = "c-promotion-card";

    if (hasNoPromotionSlugs) {
      return null;
    }

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <Mobile>
            <ScrollableList
              itemClassName={itemClassName}
              title={title}
              seeMoreText={seeMore}
              seeMoreUrl={seeMoreUrl}
              itemIds={promotionsSlugs}
              Component={promotionCardContainerRenderer}
            />
          </Mobile>
          <Desktop>
            <ScrollableListPaginated
              list={{
                title,
                itemIds: promotionsSlugs,
              }}
              Component={promotionCardContainerRenderer}
              className={itemClassName}
              itemControlClass="c-scrollable-list-paginated__button"
              tileHeight={318}
              seeMore={{
                text: seeMore,
                url: seeMoreUrl,
              }}
            />
          </Desktop>
        </div>
      </div>
    );
  }
}

export default PromotionCardList;
