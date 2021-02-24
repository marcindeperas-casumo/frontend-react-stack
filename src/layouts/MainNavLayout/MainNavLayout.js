// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import {
  CasinoTabSelectedIcon,
  CasumoProfileIcon,
  FootballIcon,
} from "@casumo/cmp-icons";
import { Navbar } from "Components/Navbar";
import { ContentWrapper } from "Components/ContentWrapper";

import "./MainNavLayout.scss";

type TProps = {
  children: React.Node,
};

const items = [
  {
    icon: CasinoTabSelectedIcon,
    label: "Casino",
    to: "/casino",
  },
  {
    icon: FootballIcon,
    label: "Sports",
    to: "/sports",
  },
  {
    icon: CasumoProfileIcon,
    label: "Samuel L. Jackson",
    to: "/profile",
  },
];

export const MainNavLayout = ({ children }: TProps) => {
  return (
    <div className="c-main-nav-layout u-height--screen">
      <ContentWrapper className="c-main-nav-layout__nav u-height--lg u-height--4xlg@tablet u-height--5xlg@desktop u-padding-y--md">
        <Flex justify="space-between" align="center" className="u-height--full">
          <Flex.Item>Logo</Flex.Item>
          <Flex.Item>
            <Navbar items={items}></Navbar>
          </Flex.Item>
        </Flex>
      </ContentWrapper>
      <div className="t-background-grey-0 c-main-nav-layout__content">
        <ContentWrapper>{children}</ContentWrapper>
      </div>
    </div>
  );
};
