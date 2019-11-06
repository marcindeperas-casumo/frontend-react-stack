import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { waitAndUpdateWrapper } from "Utils";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks.js";
import { SportsModal } from "Features/sports/components/SportsModal";
import FavouriteCompetitionsSelectorModal from "./FavouriteCompetitionsSelectorModal";
import { FavouriteCompetitionsSelector } from "./FavouriteCompetitionsSelector";
import favouriteCompetitionsSelectorMocks from "./FavouriteCompetitionsSelector/__mocks__/favouriteCompetitionsSelectorQuery";

const mocks = [...cmsMocks, ...favouriteCompetitionsSelectorMocks];

describe("<FavouriteCompetitionsSelectorModal />", () => {
  test("should render save button only when there are selected competitions", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks}>
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          initiallySelectedCompetitions={[]}
          onCancel={() => {}}
          onSave={() => {}}
        />
      </MockedProvider>
    );
    const renderedSelected = mount(
      <MockedProvider mocks={mocks}>
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          initiallySelectedCompetitions={[{ id: 1 }]}
          onCancel={() => {}}
          onSave={() => {}}
        />
      </MockedProvider>
    );

    await waitAndUpdateWrapper(rendered);
    await waitAndUpdateWrapper(renderedSelected);

    expect(rendered.find("ModalButtonFooter").length).toBe(0);
    expect(renderedSelected.find("ModalButtonFooter").length).toBe(1);
  });

  test("should call onClose when modal is closed", () => {
    const onClose = jest.fn();
    const rendered = mount(
      <MockedProvider mocks={mocks}>
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          initiallySelectedCompetitions={[{ id: 1 }]}
          onSave={() => {}}
          onClose={onClose}
        />
      </MockedProvider>
    );

    rendered
      .find(SportsModal.Header)
      .props()
      .onClose();

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("should call onBack when back action is initiated", () => {
    const onBack = jest.fn();
    const rendered = mount(
      <MockedProvider mocks={mocks}>
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          initiallySelectedCompetitions={[{ id: 1 }]}
          onSave={() => {}}
          onBack={onBack}
        />
      </MockedProvider>
    );

    rendered
      .find(SportsModal.Header)
      .props()
      .onBack();

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  test("should render FavouriteCompetitionsSelector to change state of selections", () => {
    const rendered = shallow(
      <FavouriteCompetitionsSelectorModal
        groupId={1}
        initiallySelectedCompetitions={[{ id: 1 }]}
        onSave={() => {}}
        onCancel={() => {}}
      />
    );

    const competitionSelector = rendered
      .find(FavouriteCompetitionsSelector)
      .first();
    const instance = rendered.instance();

    expect(competitionSelector.props().groupId).toBe(1);
    expect(competitionSelector.props().isCompetitionSelected).toBe(
      instance.isCompetitionSelected
    );
    expect(competitionSelector.props().toggleCompetition).toBe(
      instance.toggleCompetition
    );
  });

  describe("onSave()", () => {
    test("should call props.onSave with the list of selected competitions", () => {
      const onSave = jest.fn();
      const rendered = shallow(
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          initiallySelectedCompetitions={[{ id: 1 }]}
          onCancel={() => {}}
          onSave={onSave}
        />
      );
      const instance = rendered.instance();
      instance.onSave();

      expect(onSave).toHaveBeenNthCalledWith(1, [{ id: 1 }]);

      rendered.setState({
        selectedCompetitions: [{ id: 1 }, { id: 2 }, { id: 3 }],
      });
      instance.onSave();

      expect(onSave).toHaveBeenNthCalledWith(2, [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
    });
  });

  describe("isCompetitionSelected()", () => {
    test("should return true only if group is in it's list of selected groups", () => {
      const rendered = shallow(
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          initiallySelectedCompetitions={[{ id: 2 }, { id: 3 }]}
          onCancel={() => {}}
          onSave={() => {}}
        />
      );

      const instance = rendered.instance();

      expect(instance.isCompetitionSelected(1)).toBe(false);
      expect(instance.isCompetitionSelected(2)).toBe(true);
      expect(instance.isCompetitionSelected(3)).toBe(true);
    });
  });

  describe("toggleCompetition()", () => {
    test("should add group to selectedGroups list if group is not already selected", () => {
      const rendered = shallow(
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          initiallySelectedCompetitions={[]}
          onCancel={() => {}}
          onSave={() => {}}
        />
      );

      const instance = rendered.instance();

      instance.toggleCompetition({ id: 1 });
      expect(instance.isCompetitionSelected(1)).toBe(true);

      instance.toggleCompetition({ id: 12 });
      expect(instance.isCompetitionSelected(12)).toBe(true);
    });

    test("should remove group from selectedGroups list if group is already already selected", () => {
      const rendered = shallow(
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          initiallySelectedCompetitions={[{ id: 1 }]}
          onCancel={() => {}}
          onSave={() => {}}
        />
      );

      const instance = rendered.instance();

      expect(instance.isCompetitionSelected(1)).toBe(true);

      instance.toggleCompetition({ id: 1 });
      expect(instance.isCompetitionSelected(1)).toBe(false);
    });
  });
});
