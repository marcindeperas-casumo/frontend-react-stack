import React from "react";
import ReactDOM from "react-dom";

import { getHostElement } from "../../utils";
import lobbyWS from './ws';

export default class LiveCasinoLobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.hostElement = getHostElement("liveCasinoLobby");
    this.el = document.createElement("div");
    this.state = {
      loading: false,
      error: false,
      data: []
    };
  }

  onmessage (data) {
    console.log('onmessage data', data);

    if (data.type === 'State') {
      const tables = Object.keys(data.tables).map(k => ({...data.tables[k], id: k}));
      this.setState({ ...this.state, data: tables });

      console.log('onmessage tables', tables);
    }
  }

  componentWillMount () {
    this.hostElement.appendChild(this.el);
    // connect to Websockets and listen for updates
    const ws = lobbyWS.connect();
    ws.onopen = e => console.log('ws onopen');
    ws.onmessage = e => this.onmessage(JSON.parse(e.data));
  }

  componentDidMount () {
    this.setState({ ...this.state, loading: true });
  }

  componentWillUnmount () {
    this.hostElement.removeChild(this.el);
  }

  render () {
    const { data } = this.state;

    return ReactDOM.createPortal(
      <React.Fragment>
        {data.map(x => <div key={x.id}>{x.name}</div>)}
      </React.Fragment>,
      this.el
    );
  }
}
