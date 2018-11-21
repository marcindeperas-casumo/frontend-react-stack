// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import PromotionCardContainer from "Components/PromotionCard";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableListTitle from "Components/ScrollableListTitle";

export type Props = {
  promotionsSlugs: Array<string>,
  isFetched: boolean,
  startFetch: () => void,
  title?: string,
  titleColor?: string,
  backgroundColor?: string,
  slug: string,
};

const paddingPerDevice = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

class PromotionCardList extends PureComponent<Props> {
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
          "u-padding-top--lg u-padding-bottom--lg u-margin-top--lg"
        )}
      >
        <ScrollableListTitle title={title} />
        <Scrollable padding={paddingPerDevice} itemSpacing="md">
          {promotionsSlugs.map(promotionSlug => (
            <PromotionCardContainer
              slug={`${slug}.${promotionSlug}`}
              key={promotionSlug}
            />
          ))}
        </Scrollable>
      </div>
    );
  }
}

export default PromotionCardList;
