// @flow
import React from "react";
import { ChatIcon } from "@casumo/cmp-icons";

type Props = {
  onClick: Function,
  className?: string,
  hidden?: boolean,
};

export const ChatIconPlaceHolder = ({
  className = "",
  hidden = false,
  onClick,
}: Props) => {
  if (hidden) {
    return null;
  }

  return (
    <div
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'Function' is not assignable to type '(event:... Remove this comment to see the full error message
      onClick={onClick}
      className={`
      c-chat-icon
      u-cursor--pointer
      u-display--inline-block
      u-padding
      t-opacity-background--50
      t-border-r--circle
      t-background-grey-90
      t-background-purple-80:hover
      ${className}`}
    >
      <ChatIcon className="t-color-white t-background-purple-80:hover" />
    </div>
  );
};
