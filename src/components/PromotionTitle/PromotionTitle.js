// @flow
import React, { PureComponent } from "react";
import Media from "@casumo/cmp-media";
import Text from "@casumo/cmp-text";

type Props = {
  /** Promotion name */
  title: string,
  /** The Dates a promotion runs for */
  dates: string,
  /** Url of badge image on the left. */
  badge?: string,
};

const PromotionTitleText = ({ title, dates }: Props) => (
  <>
    <Text tag="h1" size="lg" className="u-margin-bottom--sm u-font-weight-bold">
      {title}
    </Text>
    <Text
      size="2xs"
      className="t-color-chrome-dark-1 u-margin-bottom--none u-font-weight-bold u-text-transform-uppercase"
    >
      {dates}
    </Text>
  </>
);

const PromotionTitleTextWithBadge = ({ title, dates, badge }: Props) => (
  <Media
    className="u-padding-x--lg u-margin-bottom--lg"
    renderText={() => <PromotionTitleText title={title} dates={dates} />}
    renderImage={() => (
      <img
        className="u-display--block"
        width={56}
        height={56}
        alt=""
        src={badge}
      />
    )}
  />
);

class PromotionTitle extends PureComponent<Props> {
  render() {
    const { title, dates, badge } = this.props;

    return badge ? (
      <PromotionTitleTextWithBadge title={title} dates={dates} badge={badge} />
    ) : (
      <div className="u-padding-x--lg u-margin-bottom--lg">
        <PromotionTitleText title={title} dates={dates} />
      </div>
    );
  }
}

export default PromotionTitle;
