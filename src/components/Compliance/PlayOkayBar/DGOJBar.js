import React from "react";
import Flex from "@casumo/cmp-flex";
import RGIAJIcon from "./icons/rgiaj.svg";
import JugarbienIcon from "./icons/jugarbien.svg";
import PlayOkayIcon from "./icons/playokay.svg";
import "./PlayOkayBar.scss";

export const DGOJBar = () => (
  <Flex
    justify="end"
    align="center"
    className="c-playokay-bar t-background-chrome-dark-3 t-color-white u-padding-x"
  >
    <Flex.Item>
      <a rel="noopener noreferrer" target="_blank" href="/play-okay">
        <PlayOkayIcon className="c-playokay-bar__icon" />
      </a>
    </Flex.Item>

    <Flex.Item>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="http://www.ordenacionjuego.es/es/rgiaj"
      >
        <RGIAJIcon className="c-playokay-bar__icon" />
      </a>
    </Flex.Item>
    <Flex.Item>
      <a
        href="http://www.jugarbien.es/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <JugarbienIcon className="c-playokay-bar__icon" />
      </a>
    </Flex.Item>
  </Flex>
);
