// @flow
import * as React from "react";
import { mount } from "enzyme";
import { useDispatch } from "react-redux";
import { HookWrapper } from "Utils/HookWrapper";
import { REACT_APP_MODAL, ROUTE_IDS } from "Src/constants";
import { useHideModal } from "Models/modal";
import { useJurisdiction, useCrossCodebaseNavigation } from "Utils/hooks";
import { useBeforePlayingModal } from "./useBeforePlayingModal";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("Utils/hooks/useJurisdiction", () => ({
  useJurisdiction: jest.fn(),
}));

jest.mock("Utils/hooks/useCrossCodebaseNavigation", () => ({
  useCrossCodebaseNavigation: jest.fn(),
}));

const mockFn = (fn: any) => fn;

function mockUseJurisdictionDGOJ() {
  mockFn(useJurisdiction).mockReturnValue({
    jurisdiction: "DGOJ",
    isDGOJ: true,
  });
}

function mockUseJurisdictionMGA() {
  mockFn(useJurisdiction).mockReturnValue({
    jurisdiction: "MGA",
    isDGOJ: false,
  });
}

describe("Components/RSModal/SlotControlSystem/useBeforePlayingModal", () => {
  test("if jurisdiction is DGOJ and canLaunch input prop is false, it does not dispatch any Redux action", () => {
    const dispatchMock = jest.fn();
    const navigateToKO = jest.fn();

    mockFn(useCrossCodebaseNavigation).mockReturnValue({ navigateToKO });
    useDispatch.mockReturnValue(dispatchMock);
    mockUseJurisdictionDGOJ();

    mount(
      <HookWrapper hook={useBeforePlayingModal} args={[{ canLaunch: false }]} />
    );

    expect(dispatchMock).toHaveBeenCalledTimes(0);
  });

  test("if jurisdiction is MGA and canLaunch input prop is true, it does not dispatch any Redux action", () => {
    const dispatchMock = jest.fn();
    const navigateToKO = jest.fn();

    mockFn(useCrossCodebaseNavigation).mockReturnValue({ navigateToKO });
    useDispatch.mockReturnValue(dispatchMock);
    mockUseJurisdictionMGA();

    mount(
      <HookWrapper hook={useBeforePlayingModal} args={[{ canLaunch: true }]} />
    );

    expect(dispatchMock).toHaveBeenCalledTimes(0);
  });

  test("if jurisdiction is DGOJ and canLaunch input prop is true, it dispatches a Redux action to show the modal", () => {
    const dispatchMock = jest.fn();
    const navigateToKO = jest.fn();

    mockFn(useCrossCodebaseNavigation).mockReturnValue({ navigateToKO });
    useDispatch.mockReturnValue(dispatchMock);
    mockUseJurisdictionDGOJ();

    mount(
      <HookWrapper hook={useBeforePlayingModal} args={[{ canLaunch: true }]} />
    );

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "MODAL/SHOW",
      modalId: REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_CONFIGURATION,
    });
  });

  test("if jurisdiction is DGOJ and canLaunch input prop is true and displayed modal is dismissed, it navigates to TOP_LISTS", () => {
    const dispatchMock = jest.fn();
    const navigateToKO = jest.fn();
    const hideFns = useHideModal(
      REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_CONFIGURATION
    );

    mockFn(useCrossCodebaseNavigation).mockReturnValue({ navigateToKO });
    useDispatch.mockReturnValue(dispatchMock);
    mockUseJurisdictionDGOJ();

    mount(
      <HookWrapper hook={useBeforePlayingModal} args={[{ canLaunch: true }]} />
    );

    hideFns.dismissModal();

    expect(navigateToKO).toHaveBeenCalledWith(ROUTE_IDS.TOP_LISTS);
  });
});
