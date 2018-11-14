// @flow
import React, { PureComponent } from "react";
import Card from "@casumo/cmp-card";
import PromotionCardHeader from "Components/PromotionCard/PromotionCardHeader";
import PromotionCardContent from "Components/PromotionCard/PromotionCardContent";
import PromotionCardImage from "Components/PromotionCard/PromotionCardImage";
import PromotionCardSkeleton from "Components/PromotionCard/PromotionCardSkeleton";
import "./PromotionCard.scss";

export type Props = {
  isFetched: boolean,
  slug: string,
  image: string,
  badge: string,
  startFetch: () => void,
};

const PromotionCardWrapper = ({ slug, image, badge }) => {
  return (
    <a
      href={slug}
      className="c-promotion-card o-ratio o-ratio--promotion-card o-flex__item o-flex__item-fixed-size"
    >
      <Card
        className="o-ratio__content t-border-r--16 t-background-grey-light-2"
        spacing="none"
        header={() => <PromotionCardHeader slug={slug} badge={badge} />}
        content={() => <PromotionCardContent slug={slug} />}
        footer={() => <PromotionCardImage image={image} />}
      />
    </a>
  );
};

export default class PromotionCard extends PureComponent<Props> {
  componentDidMount() {
    const { isFetched, startFetch } = this.props;

    if (!isFetched) {
      startFetch();
    }
  }

  render() {
    const { isFetched, slug, image, badge } = this.props;

    return isFetched ? (
      <PromotionCardWrapper slug={slug} image={image} badge={badge} />
    ) : (
      <PromotionCardSkeleton />
    );
  }
}
