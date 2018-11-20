// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Media from "Components/Media";

type Props = {
  title: string,
  subTitle: string,
  imageSrc: string,
};

const MustDropListItem = ({ title, subTitle, imageSrc }: Props) => (
  <Media
    renderImage={() => (
      <div className="t-background-grey-dark-3 t-border-r--16 u-padding">
        <img
          className="u-display--block"
          width={48}
          height={48}
          alt=""
          src={imageSrc}
        />
      </div>
    )}
    renderText={() => (
      <>
        <Text size="sm" className="u-margin-bottom--sm u-font-weight-bold">
          {title}
        </Text>
        <Text size="sm" className="u-margin-bottom--none">
          {subTitle}
        </Text>
      </>
    )}
  />
);

export default MustDropListItem;
