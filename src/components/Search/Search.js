// @flow
import React, { PureComponent } from "react";
// import GameRow from "Components/GameRow";
// import List from "Components/List";
import SearchSkeleton from "Components/Search";
import Text from "@casumo/cmp-text";

type Props = {
  isLoaded: boolean,
};
export default class Search extends PureComponent<Props> {
  render() {
    const { isLoaded } = this.props;

    return !isLoaded ? (
      <SearchSkeleton />
    ) : (
      <div>
        <Text
          align="center"
          size="md"
          className="u-padding--lg t-background-grey-light-2"
          data-test="must-drop-jackpot-title"
        >
          :)
        </Text>
      </div>
    );
  }
}
