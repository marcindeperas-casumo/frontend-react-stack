// @flow

import React from "react";
import Flex from "@casumo/cmp-flex";
import RGIAJIcon from "./icons/rgiaj.svg";
import JugarbienIcon from "./icons/jugarbien.svg";
import PlayOkayIcon from "./icons/playokay.svg";
import "./PlayOkayBar.scss";

const links = {
  jugarbien: "http://www.jugarbien.es/",
  playokay: "/play-okay",
  rgiaj: "http://www.ordenacionjuego.es/es/rgiaj",
};

type Props = {
  className?: string,
};

export const DGOJBar = ({ className = "" }: Props) => (
  <Flex justify="end" align="center" className={className}>
    <Flex.Item>
      <a rel="noopener noreferrer" target="_blank" href={links.playokay}>
        <PlayOkayIcon className="c-playokay-bar__icon" />
      </a>
    </Flex.Item>

    <Flex.Item>
      <a rel="noopener noreferrer" target="_blank" href={links.rgiaj}>
        <RGIAJIcon className="c-playokay-bar__icon" />
      </a>
    </Flex.Item>
    <Flex.Item>
      <a href={links.jugarbien} rel="noopener noreferrer" target="_blank">
        <JugarbienIcon className="c-playokay-bar__icon" />
      </a>
    </Flex.Item>
  </Flex>
);
