// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import "./SettingsHeadline.scss";

type Props = {
  title: string,
  description: string,
};

class SettingsHeadline extends PureComponent<Props> {
  render() {
    const { title, description } = this.props;
    return (
      <div className="c-headline">
        <Text
          tag="h1"
          size="default"
          className="c-headline-title t-color-grey-dark-3"
        >
          {title}
        </Text>
        <Text tag="p" size="sm" className="u-margin-bottom--none t-color-grey">
          {description}
        </Text>
      </div>
    );
  }
}

export default Headline;
