// @flow
import React from "react";
import "./LayoutPage.scss";
import Flex from "@casumo/cmp-flex";
import { isMobile } from "@casumo/is-mobile";
import { FullscreenView } from "Components/FullscreenView";
import Sidebar from "Components/Sidebar";

type Props = {
  children: string,
};

export const LayoutPage = (props: Props) => {
  const isSidebarVisible = !isMobile(window);

  return (
    <FullscreenView className="u-height--full u-width--screen t-background-grey-90">
      <Flex direction="horizontal" className="u-height--full" spacing="none">
        {isSidebarVisible && <Sidebar />}
        <div className="c-layout-content t-background-grey-90">
          {props.children}
        </div>
      </Flex>
    </FullscreenView>
  );
};
