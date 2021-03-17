import React from "react";
import { shallow } from "enzyme";
import SectionsList from "Components/SectionList";

describe("SectionsList", () => {
  test("should render a List component with no title", () => {
    const sections = [
      {
        data: ["mega-fortune-dreams", "mega-fortune", "hall-of-gods"],
      },
    ];
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    const rendered = shallow(<SectionsList sections={sections} />);

    expect(rendered.find("List").length).toBe(1);
    expect(rendered.find("p").length).toBe(0);
  });

  test("should not render any List component if no data", () => {
    const sections = [{ data: [] }];
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    const rendered = shallow(<SectionsList sections={sections} />);

    expect(rendered.find("List").length).toBe(0);
    expect(rendered.find("p").length).toBe(0);
  });

  test("should render a List component with title", () => {
    const sections = [{ title: "hi!", data: ["mega-fortune"] }];
    const renderSectionHeader = title => <p>{title}</p>;
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <SectionsList
        renderSectionHeader={renderSectionHeader}
        sections={sections}
      />
    );

    expect(rendered.find("p").text()).toBe("hi!");
  });
});
