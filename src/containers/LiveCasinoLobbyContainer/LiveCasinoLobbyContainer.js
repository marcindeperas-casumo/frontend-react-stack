import React from "react";
import ReactDOM from "react-dom";

import Card from '@casumo/cmp-card';

import { getHostElement } from "../../utils";
import lobbyWS from './ws';


export default class LiveCasinoLobbyContainer extends React.Component {
  constructor (props) {
    super(props);
    this.hostElement = getHostElement("liveCasinoLobby");
    this.el = document.createElement("div");
    this.state = {
      loading: false,
      error: false,
      data: []
    };
  }

  processType (data) {
    const index = this.state.data.findIndex(e => e.id === data.tableId);
    const types = {
      // all tables
      'State': () => {
        const tables = Object.keys(data.tables)
          .map(k => ({...data.tables[k], id: k}));
        this.setState({ ...this.state, data: tables });
      },
      // tables status
      'TableAssigned': () => {
        this.setState(prevState => {
          const newTable = data.table;
          newTable.id = data.tableId;
          return {data: [...prevState.data, newTable]}
        });
      },
      'TableUnassigned': () => {
        this.setState({
          data: this.state.data.filter((_, i) => i !== index)
        });
      },
      'TableUpdated': () => {
        this.setState(prevState => {
            const newData = [...prevState.data];
            newData[index] = data.table;
            return {data: newData};
        });
      },
      'TableOpened': () => {
        this.setState(prevState => {
            const newData = [...prevState.data];
            newData[index].open = true;
            return {data: newData};
        });
      },
      'TableClosed': () => {
        this.setState(prevState => {
            const newData = [...prevState.data];
            newData[index].open = false;
            return {data: newData};
        });
      },
      // seats
      'SeatsUpdated': () => {
        this.setState(prevState => {
            const newData = [...prevState.data];
            newData[index].seatsTaken = data.seatsTaken;
            return {data: newData};
        });
      },
      // numbers
      'RouletteNumbersUpdated': () => {
        this.setState(prevState => {
            const newData = [...prevState.data];
            newData[index].results = data.results;
            return {data: newData};
        });
      },
      'BaccaratRoadUpdated': () => {
        this.setState(prevState => {
            const newData = [...prevState.data];
            newData[index].road = data.road;
            return {data: newData};
        });
      },
      'MoneyWheelNumbersUpdated': () => {
        this.setState(prevState => {
            const newData = [...prevState.data];
            newData[index].results = data.results;
            return {data: newData};
        });
      },
      // players
      'PlayersUpdated': () => {
        this.setState(prevState => {
            const newData = [...prevState.data];
            console.log('index', index, newData[index].name);
            newData[index].players = data.players;
            return {data: newData};
        });
      },
      // hours
      'OperationHoursUpdated': () => {
        this.setState(prevState => {
            const newData = [...prevState.data];
            newData[index].operationHours = data.operationHours;
            return {data: newData};
        });
      },

      'default': () => null
    };
    return (types[data.type] || types['default'])();
  }

  onmessage (data) {
    console.log('onmessage data', data, this.state);
    this.processType(data);
  }

  componentWillMount () {
    this.hostElement.appendChild(this.el);
    // connect to Websockets and listen for updates
    const ws = lobbyWS.connect();
    ws.onopen = e => console.log('ws onopen');
    ws.onmessage = e => this.onmessage(JSON.parse(e.data));
    // TODO: handle onclose and reconnection
  }

  componentDidMount () {
    this.setState({ ...this.state, loading: true });
  }

  componentWillUnmount () {
    this.hostElement.removeChild(this.el);
  }

  render () {
    const { data } = this.state;

    // TODO get placeholder if no image
    const getImg = o => o.videoSnapshot && o.videoSnapshot.thumbnails
      ? o.videoSnapshot.thumbnails['L']
      : null;
    // TODO get active currency!
    const getBetLimits = betLimits => betLimits[Object.keys(betLimits)[0]];

    return ReactDOM.createPortal(
      <React.Fragment>
        {data.map(o => (
          <Card
              key={o.id}
              imgSrc={getImg(o)}
              title={o.name}
              betLimits={getBetLimits(o.betLimits)}
              players={o.players}
          />
        ))}
      </React.Fragment>,
      this.el
    );
  }
}
