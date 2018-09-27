import React, { PureComponent } from "react";
import Card from "@casumo/cmp-card";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { PlayIcon, MoreIcon } from "@casumo/cmp-icons";
import LazyImage from "Components/LazyImage";

import { emitLaunchGame } from "Components/GameList/GameList";

const stringToHTML = string => {
  return { __html: string };
};

const CuratedGameFooter = ({ data }) => (
  <Flex align="center">
    <Flex.Item>
      <LazyImage
        width="60"
        height="60"
        src="https://cms.casumo.com/wp-content/uploads/2018/09/cc-small-starburst.png"
        imgixOpts={{ w: 60 }}
      />
    </Flex.Item>
    <Flex.Block>
      <Text tag="span" className="t-color-white">
        {data.fields.game}
      </Text>
    </Flex.Block>
    <Flex.Item>
      <Flex justify="center">
        <Button onClick={emitLaunchGame(data.fields.game)} variant="variant-1">
          <PlayIcon size="med" />
          <span className="u-margin-left--sm">
            {data.fields.primaryActionText}
          </span>
        </Button>
        <a
          href={`/en/play/${data.fields.game}`}
          className="u-display--none@mobile u-margin-left--md"
        >
          <MoreIcon
            size="med"
            className="t-color-white t-border t-border-r--circle u-padding"
          />
        </a>
      </Flex>
    </Flex.Item>
  </Flex>
);
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
        spacing="2xlg"
        header={() => (
          <Text
            className="u-font-weight-bold t-color-white"
            size="2xlg"
            tag="span"
            dangerouslySetInnerHTML={stringToHTML(data.fields.header)}
          />
        )}
        footer={() => <CuratedGameFooter data={data} />}
      />
    );
  }
}
