import * as React from "react";

export default class MockedObserver extends React.Component {
  componentDidMount() {
    this.handleChange();
  }

  handleChange = () =>
    this.props.onChange(
      {
        isIntersecting: true,
        intersectionRatio: 1,
      },
      () => null
    );

  render() {
    return this.props.children;
  }
}
