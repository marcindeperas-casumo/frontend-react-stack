import React from "react";
import sentenceCase from "sentence-case";
import { getCMSField } from "../applicationService/CMSService";
import { identity } from "../utils";

export default class CMSField extends React.Component {
  constructor(props) {
    super(props);
    const { field } = this.props;
    this.state = {
      text: sentenceCase(field),
    };
  }
  async componentDidMount() {
    const { field, slug } = this.props;
    const text = await getCMSField({
      slug,
      field,
      fallbackTextFn: () => sentenceCase(field),
    });

    this.setState({
      text,
    });
  }
  render() {
    const { view = identity } = this.props;
    const { text } = this.state;
    return view(text);
  }
}
