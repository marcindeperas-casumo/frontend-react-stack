import React from "react";
import { shallow } from "enzyme";
// import MockStore from "Components/MockStore";
import { ComponentBuilderRenderer } from "./ComponentBuilderRenderer";

const componentDefinitionGamesList = [
  { acf_fc_layout: "GAMES_LIST", listId: "foo" },
];

// const componentDefinitionHtml = [
//   { acf_fc_layout: "HTML_CONTENT", html: "<div>Foo bar.</div>" },
// ];

describe("ComponentBuilderRenderer", () => {
  test("renders GamesList Component based on component definitions", () => {
    const renderedShallow = shallow(
      <ComponentBuilderRenderer
        componentDefinitions={componentDefinitionGamesList}
      />
    );

    expect(renderedShallow.find("GameListHorizontalCMS")).toHaveLength(1);
  });

  // test("renders HTMLContent component based on component definitions", () => {
  //   const rendered = render(
  //     <MockStore>
  //       <ComponentBuilderRenderer
  //         componentDefinitions={componentDefinitionHtml}
  //       />
  //     </MockStore>
  //   );
  //   expect(rendered.find("ContentHtml")).toHaveLength(1);
  // });

  test("renders nothing if the component definitions is empty", () => {
    const rendered = shallow(
      <ComponentBuilderRenderer componentDefinitions={[]} />
    );

    expect(rendered.html()).toBeNull();
  });
});
