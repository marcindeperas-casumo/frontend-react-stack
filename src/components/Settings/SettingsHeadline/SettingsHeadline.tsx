import Text from "@casumo/cmp-text";
import React, { PureComponent } from "react";

type Props = {
  title: string | undefined;
  description: string | undefined;
};

export class SettingsHeadline extends PureComponent<Props> {
  render() {
    const { title, description } = this.props;
    return (
      <div>
        <Text tag="h3" className="u-margin-bottom--sm text-grey-90">
          {title}
        </Text>
        <Text tag="p" size="sm" className="u-margin-bottom--none text-grey-50">
          {description}
        </Text>
      </div>
    );
  }
}
