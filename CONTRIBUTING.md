# Contributing Guidelines

Here are some high level recommendations on how to best contribute to the project.

## Commits

- It is highly encouraged to install [commitizen and the casumo-conventional-changelog](https://gist.github.com/camilleriluke/68c1d250761317066b621b8a66ee6fb1#file-cz-conventional-changelog-casumo-install-sh) so commit messages follow a format and contain issue numbers.

## PRs

- Require 2 reviews.
- Should adhere to the PR template (issue number, assignment, labels, etc).
- Will be rejected without any [tests](#test-strategy).
- Visual Regression tests should be checked [here](https://www.chromaticqa.com/builds?appId=5b9fa923b6b01b00248452c7). (Oauth with github if need be.)
- Should be kept as small as possible. E.g create PRs for single components rather than one large feature branch.
- Feedback commits should be descriptive rather than "PR fixes" or "PR feedback".
- Should have all issues detected by SonarQube resolved before being merged.

## Components

Before you create a component please consider the following steps:

- Check [CUDL React](http://cudl-react.at.casumotest.local:8080) in case there is a component you can reuse.
- Check Storybook in this repo in case there is a component you can reuse.
- Creating a new component should be done with `yarn generate-component <component_name>` to give a [good starting point](#folder-structure).
- Components should use named exports.
- Use [Storybook](https://storybook.js.org) when developing components. This component "playground" helps to consider the role of the component without thinking about where it lives in the app.
- Refer to the relevant design file and/or liase with a designer to give the component a descriptive name.
- Avoid writing custom styling in favour of using CUDL utility classes (Colors, Typography, Spacings etc). If in doubt talk to a designer to understand the components' specification.
- If component styling is required Sass files should live inside the component's folder.
- Be mindful when using state within a component. Stateless components FTW!
- Consider keeping component APIs to a minimum. If your component API is large it's a good indication that it is trying to do too much and should be separated out.
- Containers should live in the same folder as the component it wraps.
- When making changes to a component or introducing a new prop make sure there is a story that caters for it.
- Every component that isn't a) exclusively an inner component of another (read: not re-usable) or b) a Container should be a top level component.
- Test files (tests or stories) should live alongside the components it tests.
- Create chromatic stories for each visual regression required on the component and a single non-chromatic story with all the available knobs/actions required.

# Events

Make sure that all Mixpanel events are defined on [`src/constants.js`](src/constants.js) file, and not spread across the code.
And the same applies to the event properties.

## Folder structure

```bash
|-- src
    |-- components
        |-- MyComponent
            |-- index.js
            |-- MyComponent.js
            |-- MyComponent.scss
            |-- MyComponent.stories.js
            |-- MyComponent.test.js
            |-- MyComponentContainer.js
            |-- MyComponentContainer.test.js
            |-- MyComponentInnerComponent.js
        |-- MyOtherComponent
    |-- models
        |-- cms
            |-- index.js
            |-- cms.actions.js
            |-- cms.actions.test.js
            |-- cms.constants.js
            |-- cms.sagas.js
            |-- cms.sagas.test.js
            |-- cms.selectors.js
            |-- cms.selectors.test.js
        |-- other-model-domain
```

## Testing

### Unit testing

Consider the following piece of code:

```javascript
export class MyComponent extends PureComponent<Props> {
  render() {
    return isA ? <ComponentA /> : <ComponentB />;
  }
}
```

Before thinking about which tools to use, think about what we should be testing.

In this example, we need to make sure `MyComponent` renders `<ComponentA />` when `isA` is `true` and `<ComponentB />` when `isA` is `false`.

This can be done by writing [Stories](https://github.com/storybooks/storybook) or through [Enzyme](https://github.com/airbnb/enzyme)'s DOM inspection.

Stories are better suited for Presentational components, especially as they are integrated with [Chromatic](https://www.chromaticqa.com/) to form a visual regression layer.

_**All reusable components should have stories to facilitate component discovery in storybook!**_

Enzyme is great at testing logic heavy components as it can manipulate the component's state with ease.

### Contract testing

We should always try to add contract tests for any internal service that we rely on. They will help make sure any breaking changes to our APIs are flagged before they reach production, and also provide a map of all the dependencies the project has.

Before adding a new contract, make sure you are aligned with the team providing (or consuming) your APIs. Good communication is fundamental to making sure we have solid contracts that are not flaky and won't disrupt any builds.

_NOTE_: Be very careful when publishing contracts, as they can break other teams' builds if you are have set up the wrong interactions! That's why talking and making sure providers and consumers are working in harmony is key here.

For more information on best practices, please read the [Effective Pact Guide](https://docs.pact.io/best_practices/pact_nirvana#what-are-the-steps-for-reaching-pact-nirvana).
If you want to take a look at our current published Pacts, check out our [Broker](http://pact-broker.casumo.cloud/).

### Mocks

We should always try to make tests as independent and atomic as possible. This means we should avoid sharing data between tests so they don't have to rely on each other's setup. In cases where we do need big chunks of data to render complex components, it is acceptable to use mocks to avoid exhaustive duplication of data.

When using mocked data that we push into components for testing purposes we should avoid hardcoding values found in the mocks within the tests themselves.

_BAD_

```javascript
import { MyComponent } from "./MyComponent";
import mockData from "Models/something/__mocks__/data.json";

describe("MyComponent", () => {
  describe("should render propA as text", () => {
    const propAExpectedValue = "a string";
    const rendered = shallow(<MyComponent propA={mockData.propA} />);
    const output = rendered.find("p").text();

    expect(output.length).toBe(1);
    expect(output.text()).toBe(propAExpectedValue);
  });
});
```

In the above example we passed the mockData to the component but now we assert against a value defined in this test (`propAExpectedValue`). This is incredibly brittle. Should a developer update the value of `mockDate.propA` this test will fail even though the functionality hasn't changed. Rather we should assert against the mock data like so:

_GOOD_

```javascript
import { MyComponent } from "./MyComponent";
import mockData from "Models/something/__mocks__/data.json";

describe("MyComponent", () => {
  describe("should render propA as text", () => {
    const rendered = shallow(<MyComponent propA={mockData.propA} />);
    const output = rendered.find("p").text();

    expect(output.length).toBe(1);
    expect(output.text()).toBe(mockData.propA);
  });
});
```

Often times, a combination of the tools we have available will result in the best outcome.

The same principles apply to Services, Reducers, Sagas and so on although, as they aren't components, [Jest](https://jestjs.io/) works best in those cases.

The takeaway here is to think about the different paths your application can take and the various cases they form, then write tests to cover them all!

_**Note: If you are adding a new key user journey, make sure to also add tests to our [smoke test project](https://github.com/Casumo/smoke-tests)!!**_

## Flow

Use flow _all the time_. 😳

## Commenting code

When adding comments to a piece of code, try to explain _why_ that code is needed and not how it works.

If the _how_ is hard to understand, that is probably because the code isn't written as well as it could be.

Writing tests is an even better way of documenting your code!

## SonarQube

[SonarQube](https://www.sonarqube.org/) is a Continuous Inspection tool capable of showing the current health of an application and highlighting newly introduced issues.

The Casumo Sonar dashboard for this project can be found [**here**](http://sonar.casumo.cloud/dashboard?id=frontend-react-stack).

It is advised that all issues raised by Sonar be solved prior to any code merge. To help with that, using [SonarLint's VSCode extension](https://www.sonarlint.org/vscode/) is recommended. Instructions on setting up the extension can be found on the [Configuring SonarLint](#configuring-sonarlint-with-vscode) session below.

For more information on how to configure Sonar itself, please refer to the [jenkins-pipeline-libraries](https://github.com/Casumo/jenkins-pipeline-libraries/) project.

### Configuring SonarLint with VSCode

1. Install the SonarLint extension from the [Marketplace](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode).

2. Configure your User and Workspace settings, as detailed below.

#### User Settings

```
    "sonarlint.connectedMode.servers": [
        {
           "serverId": "<key>", //http://sonar.casumo.cloud/admin/settings -> System -> System -> Server ID
           "serverUrl": "http://sonar.casumo.cloud", //http://sonar.casumo.cloud/account -> Security -> Generate token
           "token": "<myToken>" //http://sonar.casumo.cloud/account -> Security -> Generate token. Make sure to have your own user set up first!
        }
    ],
```

#### Workspace Settings

```
    "sonarlint.connectedMode.project": {
        "serverId": "<key>", //http://sonar.casumo.cloud/admin/settings -> System -> System -> Server ID
        "projectKey": "frontend-react-stack"
      }
```
