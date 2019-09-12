// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";

type Props = {
  title: string,
  description: string,
};

export class SettingsHeadline extends PureComponent<Props> {
  render() {
    const { title, description } = this.props;
    return (
      <div>
        <Text tag="h3" className="u-margin-bottom--sm t-color-chrome-dark-3">
          {title}
        </Text>
        <Text
          tag="p"
          size="sm"
          className="u-margin-bottom--none t-color-chrome-dark-1"
        >
          {description}
        </Text>
      </div>
    );
  }
}
