import React, { useState, useEffect } from "react";
import { ChevronUpIcon } from "@casumo/cmp-icons";
import { ProfileIcon } from "Components/ProfileIcon";
import { InGameDrawer } from "Components/InGameDrawer";
import { injectIntercomScript } from "Features/chat/IntercomChatService";

export const ProfileDrawerContainer = () => {
  const cmsLabels = {
    in_game_drawer_live_chat: "Live chat",
    in_game_drawer_exit_game: "Exit game",
  };

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    injectIntercomScript();
  }, []);

  return isDrawerOpen ? (
    <React.Fragment>
      <ChevronUpIcon
        className="t-color-white u-margin-left"
        onClick={() => setDrawerOpen(false)}
      />
      <div
        style={{ top: "var(--play-okay-bar-height, 48px)" }}
        className="u-position-fixed u-zindex--content-overlay u-inset-x"
      >
        <InGameDrawer
          t={cmsLabels}
          onLiveChatClick={() => {
            //mstrz("onLiveChat clicked");
            window.Intercom("show");
          }}
          onExitGameClick={() => {
            //mstrz("onExitGame clicked");
          }}
        />
      </div>
    </React.Fragment>
  ) : (
    <ProfileIcon onClick={() => setDrawerOpen(true)} />
  );
};
