/**
 * There's bunch of "wrapper.update()" in this file. Now enzyme doesn't support
 * hooks yet, they probably can be safely removed when they do.
 */
// @flow
import * as React from "react";
import ReactModal from "react-modal";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useDelayedText, Modal } from "./RSModal";

jest.useFakeTimers();

const text1 = {
  title: "1",
  content: "1",
};
const text2 = {
  title: "2",
  content: "2",
};
const modal1 = "PRIVACY_NOTICE";
const modal2 = "REEL_RACES_CAVEATS";

describe("useDelayedText", () => {
  test("returns passed textProps if modalProps exists", () => {
    const wrapper = shallow(
      <HookWrapper hook={useDelayedText} args={[modal1, text1]} />
    );

    expectHook(wrapper).toEqual(text1);
  });

  test("renders last data when closing, until timeout passes", () => {
    // if we won't mount it hooks will forgot previous data with every update
    // it matters here because we are relying on previous values.
    const wrapper = mount(
      <HookWrapper hook={useDelayedText} args={[modal1, text1]} />
    );

    wrapper.setProps({ args: [null, null] });
    // returns previous data, even though it's not passed as props anymore
    // thanks to that we'll have that data available during animation.
    expectHook(wrapper).toEqual(text1);

    // simulate end of animation (it's setTimeout based)
    // it triggers hook update so it has to be wrapped in act
    act(jest.runAllTimers);
    wrapper.update(); // it's needed now to update prop :/ YOU from the future, remove and check if test fails
    expectHook(wrapper).toEqual(null); // now it should return null because modal animated out
  });

  test("properly overrides visible modal", () => {
    const wrapper = mount(
      <HookWrapper hook={useDelayedText} args={[modal1, text1]} />
    );

    wrapper.setProps({ args: [modal2, text2] });
    wrapper.update();
    expectHook(wrapper).toEqual(text2);
  });

  test("shows loading state instead of last seen modal", () => {
    const wrapper = mount(
      <HookWrapper hook={useDelayedText} args={[modal1, text1]} />
    );

    wrapper.setProps({ args: [null, null] });
    wrapper.update();
    expectHook(wrapper).toEqual(text1);
    // above part is tested in "renders last data when closing, until timeout passes"

    wrapper.setProps({ args: [modal2, null] });
    wrapper.update();
    expectHook(wrapper).toEqual(null); // should return null, instead of last text

    wrapper.setProps({ args: [modal2, text2] });
    wrapper.update();
    expectHook(wrapper).toEqual(text2); // even if 1st arg doesn't change it should return 2nd arg as soon as available
  });
});

describe("RSModal", () => {
  beforeAll(() => {
    // supress ReactModal warning
    ReactModal.setAppElement("*");
  });

  test("Correctly renders modal header when headerBgColor, headerTextColor and headerIsTextCentered are provided", () => {
    const wrapper = mount(
      <Modal
        t={text1}
        modalType={modal1}
        hideModal={() => {}}
        headerBgColor="green"
        headerTextColor="black"
        headerIsTextCentered={true}
      />
    );
    const headerEl = wrapper.find(`[data-test-name="rsmodal-header"]`).first();
    const headerTextEl = wrapper
      .find(`[data-test-name="rsmodal-header-text"]`)
      .first();

    expect(headerEl.hasClass("t-background-green")).toEqual(true);

    expect(headerTextEl.hasClass("t-color-black")).toEqual(true);

    expect(
      wrapper
        .find(`[data-test-name="rsmodal-header-close"]`)
        .first()
        .hasClass("t-color-black")
    ).toEqual(true);

    expect(headerTextEl.hasClass("o-flex__block u-text-align-center")).toEqual(
      true
    );
  });
});
