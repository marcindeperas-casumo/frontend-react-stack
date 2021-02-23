// @flow
import React from "react";
import classNames from "classnames";
import * as A from "Types/apollo";
import ScrollableList from "Components/ScrollableList";
import { PromotionCard } from "Components/PromotionCard";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import "./PromotionCardList.scss";
import { topMarginClasses } from "Components/GameListHorizontal/constants";
import { promotionsTileHeight } from "Src/constants";

type Props = A.PromotionsListQuery_promotionsList & {
  seeMoreText: string,
};

export const PromotionCardList = ({
  name = "",
  promotions,
  seeMoreText,
}: Props) => {
  const seeMoreUrl = "/promotions";

  const itemRenderer = ({ columnIndex, style }) => (
    <div style={style}>
      <div
        className={classNames("c-promotion-card", {
          "u-margin-left": columnIndex > 0,
        })}
      >
        <PromotionCard promotion={promotions[columnIndex]} />
      </div>
    </div>
  );

  return (
    <div className={`o-wrapper ${topMarginClasses}`}>
      <MobileAndTablet>
        <ScrollableList
          itemClassName="c-promotion-card"
          title={name}
          seeMoreText={seeMoreText}
          seeMoreUrl={seeMoreUrl}
          items={promotions}
          itemRenderer={i => <PromotionCard promotion={promotions[i]} />}
        />
      </MobileAndTablet>
      <Desktop>
        <ScrollableListPaginated
          title={name}
          itemCount={promotions.length}
          itemRenderer={itemRenderer}
          tileHeight={promotionsTileHeight}
          seeMore={{
            text: seeMoreText,
            url: seeMoreUrl,
          }}
        />
      </Desktop>
    </div>
  );
};
