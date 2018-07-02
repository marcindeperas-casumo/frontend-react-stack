import * as React from "react";
import classNames from "classnames";
import Heading from '@casumo/cmp-heading';
import { AlertIcon, PlayIcon, MoreIcon } from "@casumo/cmp-icons";

import LazyImage from "./LazyImage";

export default class GameTile extends React.Component {
  constructor() {
    super();
    this.state = {
      isOverlayVisible: false
    };
    this.onBlur = this.onBlur.bind(this);
    this.showOverlay = this.showOverlay.bind(this);
  }

  showOverlay() {
    this.setState({ isOverlayVisible: true });
  }

  onBlur() {
    this.setState({ isOverlayVisible: false });
  }

  render() {
    const {
      className,
      logoBackground,
      slug,
      logo,
      name,
      inMaintenanceMode
    } = this.props;

    const componentClasses = classNames(
      "c-game-tile",
      "o-ratio",
      "o-ratio--game-tile",
      className
    );

    const overlayClasses = classNames(
      "flex-vertical",
      "o-ratio__content",
      "c-game-tile__overlay",
      "u-padding-vert--normal",
      "u-padding-horiz--small"
    );

    if (inMaintenanceMode) {
      return (
        <div className={componentClasses}>
          <LazyImage
            className="o-ratio__content t-greyscale"
            src={logoBackground}
            mark={logo}
            alt={name}
            dpr={3}
          />
          <div className="o-ratio__content c-game-tile__overlay c-game-tile__overlay--maintenance">
            <AlertIcon size="med" />
            <Heading size="milli" text={"Maintence Mode"} />
          </div>
        </div>
      );
    }

    return (
      <div
        className={componentClasses}
        tabIndex={0}
        onBlur={this.onBlur}
        onClick={this.showOverlay}
      >
        <LazyImage
          className="o-ratio__content"
          src={logoBackground}
          mark={logo}
          alt={name}
          dpr={3}
        />
        <div className={overlayClasses}>
          <Heading className="t-color-white" size="milli" text={name} />
          <PlayIcon
            size="med"
            className="t-background-white t-color-grey-dark-3 t-border-r--circle u-padding--small"
          />
          <a
            href={`/en/play/${slug}`}
            onMouseDown={e => e.preventDefault()}
          >
            <MoreIcon
              size="med"
              className="t-background-white t-color-grey-dark-3 t-border-r--circle u-padding--micro"
            />
          </a>
        </div>
      </div>
    );
  }
}
