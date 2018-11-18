// @flow
import React, { PureComponent } from "react";
import Media from "Components/Media";
import Text from "@casumo/cmp-text";

type Props = {
  title: string,
  dates: string,
  badge: string,
};

export class PromotionTitle extends PureComponent<Props> {
  render() {
    const { title, dates, badge } = this.props;
    return (
      <Media
        className="u-margin-bottom--xlg"
        renderText={() => (
          <>
            <Text
              size="lg"
              className="u-margin-bottom--none u-font-weight-bold"
            >
              {title}
            </Text>
            <Text
              size="sm"
              className="t-color-red u-margin-bottom--none u-font-weight-bold u-text-transform-uppercase"
            >
              {dates}
            </Text>
          </>
        )}
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
  }
}

export default PromotionTitle;
