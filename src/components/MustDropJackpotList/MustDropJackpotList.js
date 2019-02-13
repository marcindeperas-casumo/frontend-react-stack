// @flow
import React, { PureComponent } from "react";
import GameRow from "Components/GameRow";
import List from "@casumo/cmp-list";
import MustDropJackpotListSkeleton from "Components/MustDropJackpotList/MustDropJackpotListSkeleton";
import Text from "@casumo/cmp-text";

type Props = {
  ids: Array<string>,
  areGamesLoaded: boolean,
  title: string,
  initFetchTopLists: () => void,
};
export default class MustDropJackpotList extends PureComponent<Props> {
  componentDidMount() {
    const { areGamesLoaded, initFetchTopLists } = this.props;
    if (!areGamesLoaded) {
      initFetchTopLists();
    }
  }

  render() {
    const { ids, areGamesLoaded, title } = this.props;

    return !areGamesLoaded ? (
      <MustDropJackpotListSkeleton
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
