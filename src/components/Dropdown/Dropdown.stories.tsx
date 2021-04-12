import { storiesOf } from "@storybook/react";
import { AvatarIcon, AlertIcon } from "@casumo/cmp-icons";
import * as React from "react";
import { Dropdown, DropdownItem, DropdownItemContent } from "./Dropdown";

const dropdownItems = [
  { Icon: AvatarIcon, label: "Samuel L. Jackson", description: "Lvl 19" },
  { label: "Account" },
  {
    label: "Bonuses",
    description: "2 bonuses available",
    DescriptionIcon: AlertIcon,
  },
  {
    label: "Set Limits",
    description: "1 limit expiring",
    DescriptionIcon: AlertIcon,
  },
  { label: "Play Okay" },
  { label: "Help" },
  { label: "Logout" },
];

const stories = storiesOf("Dropdown", module).addParameters({
  noGlobalDecorator: true,
});

const Wrapper = ({ children }) => (
  <div className="t-background-grey-0 u-padding--3xlg">
    <div className="o-wrapper">{children}</div>
  </div>
);

stories.add("Default", () => (
  <Wrapper>
    <Dropdown triggerLabel="Open Dropdown">
      {dropdownItems.map((item, i) => (
        <DropdownItem key={i} withBottomBorder={i === 0}>
          <DropdownItemContent {...item} />
        </DropdownItem>
      ))}
    </Dropdown>
  </Wrapper>
));
