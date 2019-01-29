/* eslint-disable fp/no-mutation */
import React, { PureComponent } from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import { action } from "@storybook/addon-actions";
import Flex from "@casumo/cmp-flex";
import GameRow from "Components/GameRow/GameRow";

import games from "./__mocks__/games";
import VirtualList from "./";

const stories = storiesOf("VirtualList", module);

class MyComponent extends PureComponent {
  constructor() {
    super();
    this.ROW_HEIGHT = 80;
    this.PAGE_SIZE = 50;
    this.REMOTE_ROWS_COUNT = 1290;
    this.renderRow = this.renderRow.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);

    this.state = {
      list: [],
      pagesLoaded: [],
    };
  }

  isRowLoaded({ index }) {
    return !!this.state.list[index];
  }

  loadMoreRows = ({ startIndex, stopIndex }) => {
    if (!this.isRowLoaded(startIndex)) {
      if (!this.state.pagesLoaded.includes(startIndex)) {
        this.setState({
          pagesLoaded: [...this.state.pagesLoaded, startIndex],
        });

        return new Promise(resolve => {
          setTimeout(() => {
            resolve(games);
          }, 1000 + Math.round(Math.random() * 1000 + 2000));
        }).then(games => {
          this.setState({
            list: [...this.state.list, ...games],
          });
          return this.state.list;
        });
      }
    }
    return Promise.resolve(this.state.list);
  };

  renderRow({ key, index, style }) {
    if (this.isRowLoaded({ index })) {
      return (
        <div key={key} index={index} style={style} className="t-border-bottom">
          <GameRow
            game={this.state.list[index]}
            onLaunchGame={() => action(this.state.list[index].name)}
          />
        </div>
      );
    }
    return (
      <Flex
        align="center"
        key={key}
        index={index}
        style={style}
        className="t-border-bottom"
      >
        loading...
      </Flex>
    );
  }

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <VirtualList
          isRowLoaded={this.isRowLoaded}
          rowHeight={this.ROW_HEIGHT}
          totalNumberOfRows={this.REMOTE_ROWS_COUNT}
          loadMoreRows={this.loadMoreRows}
          rowRenderer={this.renderRow}
          pageSize={this.PAGE_SIZE}
        />
      </div>
    );
  }
}

stories.add("Default", () => <MyComponent />, info({ text: "Default" }));
