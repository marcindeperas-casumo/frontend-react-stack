// @flow
import React, { PureComponent } from "react";
import * as A from "Types/apollo";
import ScrollableList from "Components/ScrollableList";
import PromotionCard from "Components/PromotionCard";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import "./PromotionCardList.scss";

type Props = {
  ...A.PromotionsListQuery_promotionsList,
  seeMore: string,
};

const promotionCardRendererMobile = ({ item }) => (
  <PromotionCard promotion={item} />
);

const promotionCardRendererDesktop = ({ id }) => (
  <PromotionCard promotion={id} />
);

class PromotionCardList extends PureComponent<Props> {
  render() {
    const { name = "", promotions, seeMore } = this.props;
    const seeMoreUrl = "/promotions";
    const itemClassName = "c-promotion-card";

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <MobileAndTablet>
            <ScrollableList
              itemClassName={itemClassName}
              title={name}
              seeMoreText={seeMore}
              seeMoreUrl={seeMoreUrl}
              items={promotions}
              Component={promotionCardRendererMobile}
            />
          </MobileAndTablet>
          <Desktop>
            <ScrollableListPaginated
              list={{
                title: name,
                itemIds: promotions,
              }}
              Component={promotionCardRendererDesktop}
              className={itemClassName}
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
