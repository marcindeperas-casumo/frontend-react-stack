// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import Scrollable from "@casumo/cmp-scrollable";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import ScrollableListTitle from "Components/ScrollableListTitle";
import PromotionCardContainer from "Components/PromotionCard";

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
      title,
      titleColor,
      backgroundColor,
      promotionsSlugs,
      seeMore,
    } = this.props;
    const hasNoPromotionSlugs = !promotionsSlugs || !promotionsSlugs.length;

    if (hasNoPromotionSlugs) {
      return null;
    }

    return (
      <div
        className={classNames(
          backgroundColor && `t-background-${backgroundColor}`,
          titleColor && `t-color-${titleColor}`,
          createModifierClasses("u-margin-top", marginPerDevice),
          "u-padding-top--lg u-padding-bottom--lg"
        )}
      >
        <Flex justify="space-between">
          <Flex.Item>
            {title ? <ScrollableListTitle paddingLeft title={title} /> : null}
          </Flex.Item>
          <Flex.Item align="right" className="u-padding-right--md">
            <a href="/promotions">
              <Text
                size="sm"
                tag="h3"
                className={classNames(titleColor && `t-color-${titleColor}`)}
              >
                {seeMore}
              </Text>
            </a>
          </Flex.Item>
        </Flex>
        <Scrollable
          itemClassName="c-promotion-card"
          padding={paddingPerDevice}
          itemSpacing="md"
        >
          {promotionsSlugs.map(promotionSlug => (
            <PromotionCardContainer
              slug={`promotions.${promotionSlug}`}
              link={`promotions/${promotionSlug}`}
              key={promotionSlug}
            />
          ))}
        </Scrollable>
      </div>
    );
  }
}

export default PromotionCardList;
