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
  link: string,
};

const PromotionCardWrapper = ({ slug, link, image, badge }) => {
  return (
    <a
      href={link}
      className="c-promotion-card o-ratio o-ratio--promotion-card o-flex__item o-flex__item-fixed-size"
    >
      <Card
        className="o-ratio__content t-border-r--16 t-background-white"
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
    const { isFetched, slug, image, badge, link } = this.props;

    if (!isFetched) {
      return <PromotionCardSkeleton />;
    }

    return (
      <PromotionCardWrapper
        slug={slug}
        link={link}
        image={image}
        badge={badge}
      />
    );
  }
}
