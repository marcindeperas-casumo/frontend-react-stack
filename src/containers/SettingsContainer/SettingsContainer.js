import React from "react";
import ReactDOM from "react-dom";
import Settings from "../../components/Settings";
import { playerSettings, changeEmail } from "../../api";
import "../../App.css";

export default class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.settingsRoot = document.getElementById("settingsApp");
    this.state = {
      loading: false,
      data: {}
    };
    this.el = document.createElement("div");
  }

  componentDidMount() {
    this.settingsRoot.appendChild(this.el);
    this.setState({ ...this.state, loading: true });

    playerSettings()
      .then(data => {
        this.setState({
          ...this.state,
          loading: false,
          data
        });
      })
      .catch(console.error);
  }

  componentWillUnmount() {
    this.settingsRoot.removeChild(this.el);
  }

  onChangeEmail() {
    const email = `asdfas${new Date().getTime()}@casumo.com`;
    changeEmail({ email, password: "Pass123" }).then(() =>
      this.setState(prevState => ({
        ...prevState,
        data: { ...this.state.data, email }
      }))
    );
  }

  render() {
    return ReactDOM.createPortal(
      <Settings
        {...{
          ...this.state.data,
          onChangeEmail: this.onChangeEmail.bind(this)
        }}
      />,
      this.el
    );
  }
}
