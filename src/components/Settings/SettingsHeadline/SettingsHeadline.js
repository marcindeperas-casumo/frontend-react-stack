// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";

type Props = {
  title: ?string,
  description: ?string,
};

export class SettingsHeadline extends PureComponent<Props> {
  render() {
    const { title, description } = this.props;
    return (
      <div>
        <Text tag="h3" className="u-margin-bottom--sm t-color-grey-90">
          {title}
        </Text>
        <Text
          tag="p"
          size="sm"
          className="u-margin-bottom--none t-color-grey-50"
        >
          {description}
        </Text>
      </div>
    );
  }
}
