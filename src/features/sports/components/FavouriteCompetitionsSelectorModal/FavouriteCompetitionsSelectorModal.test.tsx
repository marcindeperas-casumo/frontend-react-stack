import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { shallow, mount } from "enzyme";
import { waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks";
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
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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

    rendered.find(SportsModal.Header).props().onClose();

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("should call onBack when back action is initiated", () => {
    const onBack = jest.fn();
    const rendered = mount(
      <MockedProvider mocks={mocks}>
        {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          initiallySelectedCompetitions={[{ id: 1 }]}
          onSave={() => {}}
          onBack={onBack}
        />
      </MockedProvider>
    );

    rendered.find(SportsModal.Header).props().onBack();

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  test("should render FavouriteCompetitionsSelector to change state of selections", () => {
    const rendered = shallow(
      <FavouriteCompetitionsSelectorModal
        groupId={1}
        initiallySelectedCompetitions={[{ id: 1 }]}
        onSave={() => {}}
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        onCancel={() => {}}
      />
    );

    const competitionSelector = rendered
      .find(FavouriteCompetitionsSelector)
      .first();
    const instance = rendered.instance();

    expect(competitionSelector.props().groupId).toBe(1);
    expect(competitionSelector.props().isCompetitionSelected).toBe(
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isCompetitionSelected' does not exist on... Remove this comment to see the full error message
      instance.isCompetitionSelected
    );
    expect(competitionSelector.props().toggleCompetition).toBe(
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleCompetition' does not exist on typ... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          onCancel={() => {}}
          onSave={onSave}
        />
      );
      const instance = rendered.instance();
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSave' does not exist on type 'Componen... Remove this comment to see the full error message
      instance.onSave();

      expect(onSave).toHaveBeenNthCalledWith(1, [{ id: 1 }]);

      rendered.setState({
        selectedCompetitions: [{ id: 1 }, { id: 2 }, { id: 3 }],
      });
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSave' does not exist on type 'Componen... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          onCancel={() => {}}
          onSave={() => {}}
        />
      );

      const instance = rendered.instance();

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isCompetitionSelected' does not exist on... Remove this comment to see the full error message
      expect(instance.isCompetitionSelected(1)).toBe(false);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isCompetitionSelected' does not exist on... Remove this comment to see the full error message
      expect(instance.isCompetitionSelected(2)).toBe(true);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isCompetitionSelected' does not exist on... Remove this comment to see the full error message
      expect(instance.isCompetitionSelected(3)).toBe(true);
    });
  });

  describe("toggleCompetition()", () => {
    test("should add group to selectedGroups list if group is not already selected", () => {
      const rendered = shallow(
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          initiallySelectedCompetitions={[]}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          onCancel={() => {}}
          onSave={() => {}}
        />
      );

      const instance = rendered.instance();

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleCompetition' does not exist on typ... Remove this comment to see the full error message
      instance.toggleCompetition({ id: 1 });
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isCompetitionSelected' does not exist on... Remove this comment to see the full error message
      expect(instance.isCompetitionSelected(1)).toBe(true);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleCompetition' does not exist on typ... Remove this comment to see the full error message
      instance.toggleCompetition({ id: 12 });
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isCompetitionSelected' does not exist on... Remove this comment to see the full error message
      expect(instance.isCompetitionSelected(12)).toBe(true);
    });

    test("should remove group from selectedGroups list if group is already already selected", () => {
      const rendered = shallow(
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          initiallySelectedCompetitions={[{ id: 1 }]}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          onCancel={() => {}}
          onSave={() => {}}
        />
      );

      const instance = rendered.instance();

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isCompetitionSelected' does not exist on... Remove this comment to see the full error message
      expect(instance.isCompetitionSelected(1)).toBe(true);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleCompetition' does not exist on typ... Remove this comment to see the full error message
      instance.toggleCompetition({ id: 1 });
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isCompetitionSelected' does not exist on... Remove this comment to see the full error message
      expect(instance.isCompetitionSelected(1)).toBe(false);
    });
  });
});
