// @flow
import * as React from "react";
import { mount } from "enzyme";
import { waitAndUpdateWrapper } from "Utils";
import { DEVICES } from "Src/constants";
import { HookWrapper } from "Utils/HookWrapper";
import { ThunderkickGame } from "GameProviders";
import { useGameLaunchData } from "./useGameLaunchData";

const responseData = {
  providedSession: {
    parameters: {
      providerName: "THUNDERKICK",
      providerType: "THUNDERKICK_MOBILE",
      url: "https://gameurl.test.com",
    },
  },
};

describe("useGameLaunchData", () => {
  beforeEach(function() {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => ({ responseData }),
      })
    );
  });

  test("returns gameProvider model", async () => {
    const wrapper = mount(
      <HookWrapper
        hook={useGameLaunchData}
        args={[
          {
            slug: "fruit-warp",
            playForFun: true,
            platform: DEVICES.MOBILE,
            language: "en",
          },
        ]}
      />
    );

    await waitAndUpdateWrapper(wrapper);

    const { gameProviderModel } = wrapper.find("div").props().hook;

    expect(gameProviderModel).toBeInstanceOf(ThunderkickGame);
  });
});
