// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Lazy from "Components/Lazy";

const stories = storiesOf("Lazy", module);

stories.add(
  "Lazy",
  () => (
    <>
      <Lazy
        loader={() => import("Components/DangerousHtml")}
        props={{ html: "<div>Sample lazy-loaded html.</div>" }}
        namedExport="DangerousHtml"
      />
    </>
  ),
  {
    info: {
      text: `Lazy loads a component - the component code is split into a separate bundle and
    is not downloaded by the client until the component is actually rendered. All the props
    except "loader" and "fallback" will be passed down to the loaded component.`,
    },
  }
);
