import React from "react";
import ReactDOM from "react-dom";

import { getHostElement } from "../../utils";
import api from './api'

export default class LiveCasinoLobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.liveCasinoLobby = getHostElement("liveCasinoLobby");
    this.el = document.createElement("div");
    this.state = {
      loading: false,
      error: false,
      data: []
    };
  }

  async fetch () {
    try {
      const r = await api.list();
      const data = Object.values(r.data.tables)
        .filter(o => o.display === 'on_mobile' ? o : null);

      this.setState({ ...this.state, data: data });
      console.log('LiveCasinoLobbyContainer data', this.state.data);

    } catch (e) {
      this.setState({ ...this.state, error: true });
      console.error('LiveCasinoLobbyContainer error', e);
    }
  }

  componentWillMount () {
    this.liveCasinoLobby.appendChild(this.el);
    this.fetch();
  }

  componentDidMount () {
    this.setState({ ...this.state, loading: true });
  }

  componentWillUnmount () {
    this.liveCasinoLobby.removeChild(this.el);
  }

  render () {
    const { data } = this.state;

    return ReactDOM.createPortal(
      <React.Fragment>
        {data.map(x => x.name)}
      </React.Fragment>,
      this.el
    );
  }
}
