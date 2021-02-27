// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { Navbar } from "Components/Navbar";
import { TabletAndDesktop } from "Components/ResponsiveLayout";
import {
  Dropdown,
  DropdownItem,
  DropdownItemContent,
} from "Components/Dropdown";
import { ContentWrapper } from "Components/ContentWrapper";
import { navItems, dropdownItems } from "./__mocks__";
import "./MainNavLayout.scss";

type TProps = {
  children: React.Node,
};

// @todo: need to add support for links/onClick
const MainDropdown = () => (
  <Dropdown>
    {dropdownItems.map((item, i) => (
      <DropdownItem key={i} withBottomBorder={i === 0}>
        <DropdownItemContent {...item} />
      </DropdownItem>
    ))}
  </Dropdown>
);

export const MainNavLayout = ({ children }: TProps) => {
  return (
    <div className="c-main-nav-layout u-height--screen">
      <ContentWrapper className="c-main-nav-layout__nav u-height--lg u-height--4xlg@tablet u-height--5xlg@desktop u-padding-y--md">
        <Flex justify="space-between" align="center" className="u-height--full">
          <TabletAndDesktop>
            <Flex.Block>Logo</Flex.Block>
          </TabletAndDesktop>
          <Flex.Item className="o-flex--horizontal o-flex-align--center">
            <Navbar items={navItems}></Navbar>
            <TabletAndDesktop>
              <MainDropdown />
            </TabletAndDesktop>
          </Flex.Item>
        </Flex>
      </ContentWrapper>
      <div className="t-background-grey-0 c-main-nav-layout__content">
        {children}
      </div>
    </div>
  );
};
