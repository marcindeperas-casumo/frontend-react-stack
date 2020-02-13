import React from "react";
import Flex from "@casumo/cmp-flex";
import { SidebarIconOpen } from "Components/Sidebar";
import RGIAJIcon from "./icons/rgiaj.svg";
import JugarbienIcon from "./icons/jugarbien.svg";
import PlayOkayIcon from "./icons/playokay.svg";
import "./DGOJBar.scss";

export const DGOJBar = () => (
  <Flex
    justify="space-between"
    align="center"
    className="c-dgoj-bar t-background-chrome-dark-3 t-color-white"
  >
    <SidebarIconOpen />
    <Flex.Block>
      <Flex
        justify="end"
        align="center"
        className="c-dgoj-bar u-padding-x"
        spacing="md"
      >
        <Flex.Item>
          <a rel="noopener noreferrer" target="_blank" href="/es/play-okay">
            <PlayOkayIcon />
          </a>
        </Flex.Item>

        <Flex.Item>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="http://www.ordenacionjuego.es/es/rgiaj"
          >
            <RGIAJIcon />
          </a>
        </Flex.Item>
        <Flex.Item>
          <a
            href="http://www.jugarbien.es/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <JugarbienIcon />
          </a>
        </Flex.Item>
      </Flex>
    </Flex.Block>
  </Flex>
);
