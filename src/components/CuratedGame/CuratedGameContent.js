import React, { PureComponent, Fragment } from "react";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";

export default class CuratedGameContent extends PureComponent<Props> {
  render() {
    const { className, data } = this.props;

    return (
      <Card
        className={className}
        content={() => (
          <Text className="t-color-white">
            {<Fragment>{data.fields.header}</Fragment>}
          </Text>
        )}
        footer={() => <div>Footer</div>}
      />
    );
  }
}
