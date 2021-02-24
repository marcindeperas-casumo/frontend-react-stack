// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AvatarIcon, AlertIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { Dropdown, DropdownItem } from "./Dropdown";

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

const DropdownItemContent = ({ Icon, label, description, DescriptionIcon }) => (
  <Flex align="center" spacing="md">
    {Icon && (
      <Flex.Item>
        <Icon />
      </Flex.Item>
    )}
    <Flex.Item>
      <Flex direction="vertical">
        <Flex.Item>
          <Text className="u-margin--none u-font-weight-bold">{label}</Text>
        </Flex.Item>
        {description && (
          <Flex.Item className="o-flex__item-align--center">
            {DescriptionIcon && <DescriptionIcon size="sm" />}
            <Text
              tag="span"
              className="u-margin-left--sm u-font-sm t-color-grey-50"
            >
              {description}
            </Text>
          </Flex.Item>
        )}
      </Flex>
    </Flex.Item>
  </Flex>
);

stories.add("Default", () => (
  <Wrapper>
    <Dropdown triggerLabel="Open Dropdown">
      {dropdownItems.map((item, i) => (
        <DropdownItem withBottomBorder={i === 0}>
          <DropdownItemContent {...item} />
        </DropdownItem>
      ))}
    </Dropdown>
  </Wrapper>
));
