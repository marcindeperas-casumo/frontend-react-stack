import React from "react";
import { shallow } from "enzyme";
import { ContentReplacer } from "Components/ContentReplacer";

describe("ContentReplacer", () => {
  test("should render a div with replaced content", () => {
    const rendered = shallow(
      <ContentReplacer
        element="div"
        value="a {{ var }}"
        replacements={{ var: "variable" }}
      />
    );
    expect(rendered.find("DangerousHtml").html()).toBe(
      '<div class="">a variable</div>'
    );
  });
});
