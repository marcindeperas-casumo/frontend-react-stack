// @flow
import React, { PureComponent } from "react";
import GameListRow from "Components/GameListRow";
import MustDropJackpotsSkeleton from "Components/MustDropJackpotList/MustDropJackpotListSkeleton";
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
      <MustDropJackpotsSkeleton />
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
          {ids.map(id => (
            <GameListRow id={id} key={`jackpot-${id}`} />
          ))}
        </div>
      </div>
    );
  }
}
