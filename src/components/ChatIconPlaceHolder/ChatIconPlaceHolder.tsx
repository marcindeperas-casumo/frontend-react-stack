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
      bg-opacity-50
      t-border-r--circle
      bg-grey-90
      hover:bg-purple-80
      ${className}`}
    >
      <ChatIcon className="text-white hover:bg-purple-80" />
    </div>
  );
};
