// @flow
import React from "react";
import "./LayoutPage.scss";
import Flex from "@casumo/cmp-flex";
import { isMobile } from "@casumo/fe-toolkit-ismobile";
import { FullscreenView } from "Components/FullscreenView";
import Sidebar from "Components/Sidebar";

type Props = {
  children: string,
};

export const LayoutPage = (props: Props) => {
  const isSidebarVisible = !isMobile(window);

  return (
    <FullscreenView className="u-height--full u-width--screen t-background-chrome-dark-3">
      <Flex direction="horizontal" className="u-height--full" spacing="none">
        {isSidebarVisible && <Sidebar />}
        <div className="c-layout-content t-background-chrome-dark-3">
          {props.children}
        </div>
      </Flex>
    </FullscreenView>
  );
};
