// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import Scrollable from "@casumo/cmp-scrollable";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import PromotionCardContainer from "Components/PromotionCard";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, Mobile } from "Components/ResponsiveLayout";
import "./PromotionCardList.scss";

type Props = {
  promotionsSlugs: Array<string>,
  fetchCampaign: () => void,
  fetchPromotions: () => void,
  title?: string,
  titleColor?: string,
  backgroundColor?: string,
  seeMore: string,
};

const marginPerDevice = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
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
    const parentClassName = classNames(
      backgroundColor && `t-background-${backgroundColor}`,
      titleColor && `t-color-${titleColor}`,
      "u-padding-bottom--lg",
      "c-promotion-card-list"
    );
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
      <div className="u-margin-x--3xlg@desktop u-padding-top--xlg">
        <div className="o-wrapper">
          <Mobile>
            <ScrollableListTitleRow
              seeMore={{ text: seeMore, url: seeMoreUrl }}
              title={title}
              paddingLeft
            />
            <div
              className={classNames(
                createModifierClasses("u-margin-x", marginPerDevice)
              )}
            >
              <div className={parentClassName}>
                <Scrollable
                  itemClassName={itemClassName}
                  itemSpacing="md"
                  className="u-padding-top--lg"
                >
                  {promotionsSlugs.map(id =>
                    promotionCardContainerRenderer({ id })
                  )}
                </Scrollable>
              </div>
            </div>
          </Mobile>
          <Desktop>
            <ScrollableListTitleRow
              seeMore={{ text: seeMore, url: seeMoreUrl }}
              title={title}
            />
            <div className={parentClassName}>
              <ScrollableListPaginated
                list={{
                  itemIds: promotionsSlugs,
                }}
                Component={promotionCardContainerRenderer}
                className={itemClassName}
                itemControlClass="c-scrollable-list-paginated__button"
                tileHeight={308}
                itemSpacing="md"
              />
            </div>
          </Desktop>
        </div>
      </div>
    );
  }
}

export default PromotionCardList;
