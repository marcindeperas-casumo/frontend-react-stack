/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import HashWatcher from "Components/HashWatcher";

const stories = storiesOf("HashWatcher", module);

type State = {
  newHash: string,
};

class HashWatcherDemo extends React.Component<{}, State> {
  state = {
    newHash: "some-hash",
  };

  applyNewHash = () => {
    window.location.hash = this.state.newHash;
  };

  render() {
    return (
      <div className="u-padding t-background-grey-5 t-border-r--sm">
        <input
          className="u-margin u-padding"
          value={this.state.newHash}
          onChange={({ currentTarget }) =>
            this.setState({ newHash: currentTarget.value })
          }
        />
        <button className="u-padding" onClick={this.applyNewHash}>
          set hash
        </button>
        <HashWatcher>
          {({ currentHash }) => (
            <div className="u-margin u-padding t-border-r--sm t-background-grey-0">
              <strong>window.location.hash:&nbsp;</strong>
              {currentHash || "<empty>"}
            </div>
          )}
        </HashWatcher>
        <p
          className="u-margin u-margin-top--lg u-font-2xs"
          style={{ lineHeight: 1.6 }}
        >
          This is just a debug view. The HashWatcher component is providing the
          value after the "window.location.hash:" However, this won't be
          reflected in the brower's address bar as the story is shown inside an
          iframe
        </p>
      </div>
    );
  }
}

if (isNotChromatic) {
  stories.add("Default View", () => <HashWatcherDemo />);
}
