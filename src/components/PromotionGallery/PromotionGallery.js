// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import PromotionGalleryCardContainer from "Components/PromotionGalleryCard";

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
  default: "lg",
  tablet: "xlg",
  desktop: "xlg",
};

class PromotionCardGallery extends PureComponent<Props> {
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
          "u-padding-horiz@mobile u-padding-horiz--xlg u-padding-top--lg u-padding-bottom--lg"
        )}
      >
        <Flex
          justify="space-between"
          className="u-padding-horiz--sm@mobile u-padding-horiz u-font-weight-bold u-padding-bottom--md
          u-padding-bottom--lg@tablet u-padding-bottom--lg@desktop"
        >
          <Flex.Item className="u-padding-left@tablet">
            <Text tag="h3">{title}</Text>
          </Flex.Item>
          <Flex.Item className="u-padding-right@tablet">
            <a href="/promotions">
              <Text
                tag="span"
                className={classNames(titleColor && `t-color-${titleColor}`)}
              >
                {seeMore}
              </Text>
            </a>
          </Flex.Item>
        </Flex>
        <div
          className="o-flex o-flex-justify--center u-padding@tablet"
          style={{ flexWrap: "wrap" }}
        >
          {promotionsSlugs.map(promotionSlug => (
            <PromotionGalleryCardContainer
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

export default PromotionCardGallery;
