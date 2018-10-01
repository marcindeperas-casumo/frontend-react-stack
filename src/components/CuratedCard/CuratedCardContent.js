import React, { PureComponent } from "react";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";

import CuratedCardFooter from "./CuratedCardFooter";

const stringToHTML = string => {
  return { __html: string };
};

export default class CuratedGameContent extends PureComponent<Props> {
  render() {
    const { className, data } = this.props;

    return (
      <Card
        className={className}
        justify={{
          mobile: "end",
          default: "space-between",
        }}
        spacing={{
          mobile: "2xlg",
          default: "lg",
        }}
        header={() => (
          <Text
            className="u-font-weight-bold t-color-white"
            size="2xlg"
            tag="span"
            dangerouslySetInnerHTML={stringToHTML(data.header)}
          />
        )}
        footer={() => <CuratedCardFooter data={data} />}
      />
    );
  }
}
