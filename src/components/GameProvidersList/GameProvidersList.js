// @flow
import React from "react";
import { Link } from "@reach/router";
import classNames from "classnames";
import type { CellRendererParams } from "react-virtualized";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import * as A from "Types/apollo";
import GameProviderAvatar from "./GameProviderAvatar";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

const DEFAULT_SPACING = "default";

type Props = {
  title: string,
  gameStudios: Array<A.GameStudiosQuery_gameStudios>,
};

export const GameProvidersList = ({ title = "", gameStudios = [] }: Props) => {
  const itemRenderer = ({ columnIndex, style }: CellRendererParams) => {
    const isNotFirstElement = columnIndex > 0;
    const elementClassNames = classNames(
      "u-height--full c-game-provider-avatar",
      {
        "u-margin-left--md": isNotFirstElement,
      }
    );

    return (
      <div style={style}>
        <div className={elementClassNames}>
          <Link
            to={`../provider/${gameStudios[columnIndex].slug}`}
            className="o-ratio"
          >
            <GameProviderAvatar {...gameStudios[columnIndex]} />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="u-margin-x--3xlg@desktop">
      <div className="o-wrapper">
        <MobileAndTablet>
          <div className="u-padding-top--xlg">
            <ScrollableListTitle paddingLeft title={title} />
            <Scrollable
              numberOfItems={gameStudios.length}
              keyGetter={i => gameStudios[i].id}
              itemRenderer={i => (
                <Link
                  to={`../provider/${gameStudios[i].slug}`}
                  className="o-ratio"
                >
                  <GameProviderAvatar {...gameStudios[i]} />
                </Link>
              )}
              itemClassName="c-game-provider-avatar"
              padding={PADDING_PER_DEVICE}
              itemSpacing={DEFAULT_SPACING}
            />
          </div>
        </MobileAndTablet>
        <Desktop>
          <ScrollableListPaginated
            itemCount={gameStudios.length}
            title={title}
            itemRenderer={itemRenderer}
            tileHeight={160}
          />
        </Desktop>
      </div>
    </div>
  );
};
