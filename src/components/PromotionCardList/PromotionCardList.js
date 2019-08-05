// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import Scrollable from "@casumo/cmp-scrollable";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import { PromotionCardListTitleRow } from "Components/PromotionCardList/PromotionCardListTitleRow";
import PromotionCardContainer from "Components/PromotionCard";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, Mobile } from "Components/ResponsiveLayout";

type Props = {
  promotionsSlugs: Array<string>,
  fetchCampaign: () => void,
  fetchPromotions: () => void,
  title?: string,
  titleColor?: string,
  backgroundColor?: string,
  seeMore: string,
};

const paddingPerDevice = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

const marginPerDevice = {
  default: "lg",
  tablet: "xlg",
  desktop: "xlg",
};

class PromotionCardList extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchCampaign();
    this.props.fetchPromotions();
  }

  render() {
    const {
      title = "",
      titleColor,
      backgroundColor,
      promotionsSlugs,
      seeMore,
    } = this.props;
    const hasNoPromotionSlugs = !promotionsSlugs || !promotionsSlugs.length;
    const seeMoreUrl = "/promotions";
    const itemClassName = "c-promotion-card";
    const promotionCardContainerRenderer = ({ id }) => (
      <PromotionCardContainer
        slug={`promotions.${id}`}
        link={`promotions/${id}`}
        key={id}
      />
    );

    if (hasNoPromotionSlugs) {
      return null;
    }

    return (
      <div
        className={classNames(
          backgroundColor && `t-background-${backgroundColor}`,
          titleColor && `t-color-${titleColor}`,
          createModifierClasses("u-margin-top", marginPerDevice),
          "u-padding-bottom--lg"
        )}
      >
        <div className="u-margin-x--3xlg@desktop">
          <div className="o-wrapper">
            <Mobile>
              <PromotionCardListTitleRow
                title={title}
                seeMoreUrl={seeMoreUrl}
                titleColor={titleColor}
                seeMoreText={seeMore}
              />
              <Scrollable
                itemClassName={itemClassName}
                padding={paddingPerDevice}
                itemSpacing="md"
              >
                {promotionsSlugs.map(id =>
                  promotionCardContainerRenderer({ id })
                )}
              </Scrollable>
            </Mobile>
            <Desktop>
              <ScrollableListPaginated
                list={{
                  title: title,
                  itemIds: promotionsSlugs,
                }}
                Component={promotionCardContainerRenderer}
                className={itemClassName}
                itemControlClass="c-scrollable-list-paginated__button"
                tileHeight={308}
                seeMore={{
                  text: seeMore,
                  url: seeMoreUrl,
                  color: classNames(titleColor && `t-color-${titleColor}`),
                }}
                itemSpacing="md"
              />
            </Desktop>
          </div>
        </div>
      </div>
    );
  }
}

export default PromotionCardList;
