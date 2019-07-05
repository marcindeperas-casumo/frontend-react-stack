import React from "react";
import { mount } from "enzyme";
import ReactModal from "react-modal";
import { ValuableDetails } from "./ValuableDetails";

describe("ValuableDetails", () => {
  ReactModal.setAppElement(document.createElement("div"));

  test("should render skeleton on loading", () => {
    const rendered = mount(
      <ValuableDetails isOpen={true} onClose={() => {}} loading={true} />
    );
    expect(rendered.find("ParagraphSkeleton")).toHaveLength(1);
  });

  test("should render ErrorMessage on error and it should refetch when clicked", () => {
    const mock = jest.fn();
    const rendered = mount(
      <ValuableDetails
        isOpen={true}
        onClose={() => {}}
        loading={false}
        error={true}
        refetch={mock}
      />
    );
    expect(rendered.find("ErrorMessage")).toHaveLength(1);
    rendered
      .find("ErrorMessage")
      .find("Button")
      .simulate("click");
    expect(mock).toHaveBeenCalled();
  });
});
