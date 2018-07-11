import React from "react";
import ReactDOM from "react-dom";

import { getHostElement } from "../../utils";

import api from './lobbyAPI';
import lobbyWS from './lobbyWS';

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
    // fetch data from REST API
    this.fetch();
    // connect to Websockets and listen
    const ws = lobbyWS.connect();
    ws.onopen = e => console.log('ws onopen', e);
    ws.onmessage = e => console.log('ws onmessage', e.data);
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
        {data.map(x => <div key={x.name}>{x.name}</div>)}
      </React.Fragment>,
      this.el
    );
  }
}
