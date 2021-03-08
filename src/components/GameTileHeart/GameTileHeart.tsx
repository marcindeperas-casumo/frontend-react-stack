import React from "react";
import classNames from "classnames";
import "./GameTileHeart.scss";

type Props = {
  onClick: (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => any;
  isActive: boolean;
  className?: string;
};

export const GameTileHeart = ({ onClick, isActive, className = "" }: Props) => (
  <svg
    onClick={onClick}
    className={classNames(
      "c-game-tile-container__heart u-display--block",
      {
        "is-active": isActive,
      },
      className
    )}
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="c-game-tile-container__heart--stroke"
      vectorEffect="non-scaling-stroke"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.1592 3.42632L10.1594 3.42589C10.6143 2.57592 11.4555 2.06514 12.339 2.06514C14.235 2.06514 15.8125 3.67701 15.8125 5.69864C15.8125 7.88225 14.3839 9.94217 12.7264 11.4968C11.9073 12.2651 11.0557 12.8874 10.3479 13.3148C9.99365 13.5287 9.68192 13.6899 9.43362 13.7959C9.3094 13.8489 9.20675 13.8856 9.12657 13.9084C9.08676 13.9197 9.05556 13.9267 9.03236 13.9307C9.01155 13.9343 9.00137 13.9348 9.00001 13.9348C8.99872 13.9348 8.98858 13.9343 8.96776 13.9307C8.94459 13.9267 8.91342 13.9197 8.87363 13.9084C8.79349 13.8856 8.69087 13.8489 8.56667 13.7959C8.31843 13.69 8.00672 13.5288 7.65252 13.3148C6.94471 12.8874 6.0931 12.2651 5.2739 11.4968C3.61631 9.94214 2.1875 7.88223 2.1875 5.69864C2.1875 3.67716 3.76578 2.06514 5.66192 2.06514C6.54536 2.06514 7.38657 2.57592 7.84151 3.42589L7.84174 3.42632C8.09007 3.8892 8.57443 4.08475 9.00045 4.08475C9.42646 4.08475 9.91082 3.8892 10.1592 3.42632Z"
    />
    <path
      className="c-game-tile-container__heart--fill"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.265 0.8C2.814 0.8 0.818 2.875 0.818 5.425C0.818 10.78 7.771 15.2 9 15.2C10.23 15.2 17.182 10.78 17.182 5.425C17.182 2.875 15.187 0.8 12.736 0.8C11.528 0.8 10.404 1.497 9.804 2.618C9.488 3.207 8.513 3.207 8.197 2.618C7.597 1.497 6.473 0.8 5.265 0.8Z"
    />
  </svg>
);
