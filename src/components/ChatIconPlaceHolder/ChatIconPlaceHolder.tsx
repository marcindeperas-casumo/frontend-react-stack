import { ChatIcon } from "@casumo/cmp-icons";
import React from "react";

type Props = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
  hidden?: boolean;
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
