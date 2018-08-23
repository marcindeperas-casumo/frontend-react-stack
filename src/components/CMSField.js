import React from "react";
import CMSService from "../applicationService/CMSService";
import { identity } from "../utils";

export default class CMSField extends React.Component {
  constructor(props) {
    super(props);
    const { field, slug } = this.props;
    this.state = {
      text: field + " " + slug,
    };
  }
  componentDidMount() {
    CMSService.getPage({ slug: this.props.slug }).then(v => {
      this.setState({
        text: v.fields[this.props.field],
      });
    });
  }
  render() {
    const { view = identity } = this.props;
    const { text } = this.state;
    return view(text);
  }
}
