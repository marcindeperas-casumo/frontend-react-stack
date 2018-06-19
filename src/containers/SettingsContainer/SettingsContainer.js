import React from "react";
import ReactDOM from "react-dom";
import Settings from "../../components/Settings";
import {
  playerSettings,
  changeEmail,
  setAdventurerPublicity,
  setNewsletterSubscription
} from "../../api";
import {
  toPlayerSettingsData,
  toPlayerConfigurationData,
  getHostElement
} from "../../utils";
import "../../App.css";

export default class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.settingsRoot = getHostElement("settingsApp");
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
      .then(data => [
        toPlayerSettingsData(data),
        toPlayerConfigurationData(data)
      ])
      .then(([playerSettings, playerConfiguration]) => {
        this.setState({
          ...this.state,
          loading: false,
          data: {
            ...playerSettings,
            ...playerConfiguration
          }
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

  onChangeAdventurerPublicity(onState) {
    setAdventurerPublicity(onState).then(() => {
      this.setState(prevState => ({
        ...prevState,
        data: { ...this.state.data, adventurerPublic: onState }
      }));
    });
  }

  onChangeNewsletterSubscription(onState) {
    setNewsletterSubscription(onState).then(() => {
      this.setState(prevState => ({
        ...prevState,
        data: { ...this.state.data, subscribedToNewsletters: onState }
      }));
    });
  }

  render() {
    return ReactDOM.createPortal(
      <Settings
        {...{
          ...this.state.data,
          onChangeEmail: this.onChangeEmail.bind(this),
          onChangeAdventurerPublicity: this.onChangeAdventurerPublicity.bind(
            this
          ),
          onChangeNewsletterSubscription: this.onChangeNewsletterSubscription.bind(
            this
          )
        }}
      />,
      this.el
    );
  }
}
