// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ContentWrapper } from "Components/ContentWrapper";

import "./MainNavLayout.scss";

type Props = {
  children: React.Node,
};

export const MainNavLayout = ({ children }: Props) => {
  return (
    <div className="c-main-nav-layout u-height--screen">
      <ContentWrapper className="c-main-nav-layout__nav u-height--lg u-height--4xlg@tablet u-height--5xlg@desktop u-padding-y--md">
        <Flex justify="space-between" align="center" className="u-height--full">
          <Flex.Item>Logo</Flex.Item>
          <Flex.Item>Navigation</Flex.Item>
        </Flex>
      </ContentWrapper>
      <div className="t-background-grey-0 c-main-nav-layout__content">
        <ContentWrapper>{children}</ContentWrapper>
      </div>
    </div>
  );
};
