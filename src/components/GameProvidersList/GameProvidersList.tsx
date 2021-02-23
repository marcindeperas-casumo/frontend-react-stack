import React from "react";
import { Link } from "@reach/router";
import classNames from "classnames";
import type { CellRendererParams } from "react-virtualized";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import * as A from "Types/apollo";
import { topMarginClasses } from "Components/GameListHorizontal/constants";
import { horizontalListsDevicePaddings } from "Src/constants";
import GameProviderAvatar from "./GameProviderAvatar";

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
    <div className={`o-wrapper ${topMarginClasses}`}>
      <MobileAndTablet>
        <ScrollableListTitle paddingLeft title={title} />
        <Scrollable
          numberOfItems={gameStudios.length}
          keyGetter={i => gameStudios[i].id}
          itemRenderer={i => (
            <Link to={`../provider/${gameStudios[i].slug}`} className="o-ratio">
              <GameProviderAvatar {...gameStudios[i]} />
            </Link>
          )}
          itemClassName="c-game-provider-avatar"
          itemSpacing={DEFAULT_SPACING}
          padding={horizontalListsDevicePaddings}
        />
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
  );
};
