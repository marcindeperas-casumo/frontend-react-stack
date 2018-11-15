import React from "react";
import { storiesOf } from "@storybook/react";

import info from "Storybook/storybookInfo";
import MustDropListItem from "Components/MustDropListItem";

const stories = storiesOf("MustDropListItem", module);

stories.add(
  "Default",
  () => (
    <MustDropListItem
      title="Must Drop Jackpot"
      subTitle="This jackpot could drop anytime between 0 and €1,000."
      renderImage={() => (
        <div className="t-background-grey-dark-3 t-border-r--16 u-padding">
          <img
            className="u-display--block"
            width={48}
            height={48}
            alt="mega drop"
            src="https://cms.casumo.com/wp-content/uploads/2018/11/Full-round-black-container.svg"
          />
        </div>
      )}
    />
  ),
  info({ text: "Default" })
);

stories.add(
  "Must Drop Jackpot",
  () => (
    <MustDropListItem
      className="u-padding--lg t-background-grey-dark-3 t-border-r--16"
      title="€12,000,000"
      titleColor="yellow"
      subTitle="Pays before €1000"
      subTitleColor="grey"
      renderImage={() => (
        <img
          className="u-display--block"
          width={48}
          height={48}
          alt="mega drop"
          src="https://cms.casumo.com/wp-content/uploads/2018/11/Full-round-black-container.svg"
        />
      )}
    />
  ),
  info({ text: "Must Drop Jackpot" })
);
