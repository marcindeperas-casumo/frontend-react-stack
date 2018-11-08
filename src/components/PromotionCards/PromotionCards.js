// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import PromotionCardContainer from "Components/PromotionCard";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableListTitle from "Components/ScrollableListTitle";

export type Props = {
  promotionsSlugs: Array<string>,
  parentSlug: string,
  isFetched: boolean,
  startFetch: () => void,
  title?: string,
  titleColor?: string,
  backgroundColor?: string,
};

const paddingPerDevice = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

export class PromotionCards extends PureComponent<Props> {
  componentDidMount() {
    const { isFetched, startFetch } = this.props;

    if (!isFetched) {
      startFetch();
    }
  }

  render() {
    const {
      title,
      titleColor,
      backgroundColor,
      promotionsSlugs,
      slug,
    } = this.props;
    const hasNoPromotionSlugs = !promotionsSlugs || !promotionsSlugs.length;

    if (hasNoPromotionSlugs) {
      return null;
    }

    return (
      <div
        className={classNames(
          backgroundColor && `${backgroundColor}`,
          titleColor && `${titleColor}`,
          "u-padding-top--lg u-padding-bottom--lg"
        )}
      >
        {/* find the right padding top */}
        <ScrollableListTitle title={title} />
        <Scrollable padding={paddingPerDevice} itemSpacing="md">
          {promotionsSlugs.map(promotionSlug => (
            <PromotionCardContainer
              promotionSlug={promotionSlug}
              parentSlug={slug}
              key={promotionSlug}
            />
          ))}
        </Scrollable>
      </div>
    );
  }
}

export default PromotionCards;
