import React from "react";
import classNames from "classnames";
import "./GameTileHeart.scss";

export const GameTileHeart = ({ onClick, isActive }) => (
  <svg
    onClick={onClick}
    className="t-color-white u-display--block"
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke="currentColor"
      strokeWidth="2"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.265 0.8C2.814 0.8 0.818 2.875 0.818 5.425C0.818 10.78 7.771 15.2 9 15.2C10.23 15.2 17.182 10.78 17.182 5.425C17.182 2.875 15.187 0.8 12.736 0.8C11.528 0.8 10.404 1.497 9.804 2.618C9.488 3.207 8.513 3.207 8.197 2.618C7.597 1.497 6.473 0.8 5.265 0.8Z"
    />
    <path
      fill="currentColor"
      className={classNames(
        "c-game-tile__heart-fill",
        isActive && "c-game-tile__heart-fill--is-active"
      )}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.265 0.8C2.814 0.8 0.818 2.875 0.818 5.425C0.818 10.78 7.771 15.2 9 15.2C10.23 15.2 17.182 10.78 17.182 5.425C17.182 2.875 15.187 0.8 12.736 0.8C11.528 0.8 10.404 1.497 9.804 2.618C9.488 3.207 8.513 3.207 8.197 2.618C7.597 1.497 6.473 0.8 5.265 0.8Z"
    />
  </svg>
);
