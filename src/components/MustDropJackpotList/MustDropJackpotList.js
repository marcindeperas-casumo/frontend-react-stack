// @flow
import React, { PureComponent } from "react";
import GameRow from "Components/GameRow";
import List from "Components/List";
import MustDropJackpotListSkeleton from "Components/MustDropJackpotList/MustDropJackpotListSkeleton";
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
      <MustDropJackpotListSkeleton />
    ) : (
      <div>
        <Text
          align="center"
          size="md"
          className="u-padding--lg t-background-grey-light-2"
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
