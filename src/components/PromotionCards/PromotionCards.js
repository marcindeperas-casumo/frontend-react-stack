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
    // const { promotionsSlugs } = this.props;
    const { title, titleColor, backgroundColor } = this.props;
    const promotionsSlugs = [
      "dai",
      "cazzo",
      "test",
      "another test",
      "make",
      "it",
      "scrollable",
    ]; // SWITCH THIS ONE WITH THE ABOVE ☝🏻
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
          {promotionsSlugs.map(slug => (
            <PromotionCardContainer slug={slug} key={slug} />
          ))}
        </Scrollable>
      </div>
    );
  }
}

export default PromotionCards;
