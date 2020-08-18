// @flow
import React from "react";
import { ChatIcon } from "@casumo/cmp-icons";

import "./ChatIconPlaceHolder.scss";

type Props = {
  onClickCallBack: Function,
  className?: string,
  hidden?: boolean,
};

export const ChatIconPlaceHolder = ({
  className,
  hidden = false,
  onClickCallBack,
}: Props) =>
  !hidden ? (
    <div
      onClick={() => {
        onClickCallBack();
      }}
      className={`${
        className ? className : ""
      } u-cursor--pointer u-display--inline-block u-padding t-border-r--circle c-chat-icon t-background-grey-90`}
    >
      <ChatIcon className="t-color-white" />
    </div>
  ) : null;
