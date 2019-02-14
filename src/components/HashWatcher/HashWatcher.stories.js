/* @flow */
import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import HashWatcher from "Components/HashWatcher";

const stories = storiesOf("HashWatcher", module);

const HashWatcherDemo = () => {
  const [newHash, setNewHash] = useState("some-hash");

  const applyNewHash = () => {
    // eslint-disable-next-line fp/no-mutation
    window.location.hash = newHash;
  };

  return (
    <div className="u-padding t-background-grey-light-1 t-border-r--4">
      <input
        className="u-margin u-padding"
        value={newHash}
        onChange={({ currentTarget }) => setNewHash(currentTarget.value)}
      />
      <button className="u-padding" onClick={applyNewHash}>
        set hash
      </button>
      <HashWatcher>
        {({ currentHash }) => (
          <div className="u-margin u-padding t-border-r--4 t-background-grey-light-2">
            <strong>window.location.hash:&nbsp;</strong>
            {currentHash || "<empty>"}
          </div>
        )}
      </HashWatcher>
      <p
        className="u-margin u-margin-top--lg u-font-xs"
        style={{ lineHeight: 1.6 }}
      >
        This is just a debug view. The HashWatcher component is providing the
        value after the "window.location.hash:" However, this won't be reflected
        in the brower's address bar as the story is shown inside an iframe
      </p>
    </div>
  );
};

stories.add("Default View", () => <HashWatcherDemo />);
