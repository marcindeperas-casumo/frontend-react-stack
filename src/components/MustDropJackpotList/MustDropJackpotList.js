// @flow
import React, { PureComponent } from "react";
import GameRow from "Components/GameRow";
import List from "@casumo/cmp-list";
import GameListSkeleton from "Components/GameListSkeleton/GameListSkeleton";
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
      <GameListSkeleton
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
        <div className="u-padding-horiz--md u-padding-bottom--md">
          <List items={ids} render={id => <GameRow id={id} />} />
        </div>
      </div>
    );
  }
}
