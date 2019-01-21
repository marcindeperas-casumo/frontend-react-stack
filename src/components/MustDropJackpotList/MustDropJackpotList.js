// @flow
import React, { PureComponent } from "react";
import GameRow from "Components/GameRow";
import List from "Components/List";
import ListSkeleton from "Components/ListSkeleton/ListSkeleton";
import Text from "@casumo/cmp-text";

type Props = {
  ids: Array<string>,
  isLoaded: boolean,
  title: string,
};
export default class MustDropJackpotList extends PureComponent<Props> {
  render() {
    const { ids, isLoaded, title } = this.props;

    return !isLoaded ? (
      <ListSkeleton
        className="u-padding--md"
        titleXOffset="100"
        titleYOffset="10"
      />
    ) : (
      <div>
        <Text
          align="center"
          size="md"
          className="u-padding--lg t-background-grey-light-2"
          data-test="must-drop-jackpot-title"
        >
          {title}
        </Text>
        <div className="u-padding--md">
          <List items={ids} render={id => <GameRow id={id} />} />
        </div>
      </div>
    );
  }
}
