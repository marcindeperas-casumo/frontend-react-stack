import React from "react";

import LiveCasinoList from "../../components/LiveCasino/LiveCasinoList";
import lobbyWS from "./ws";

export default class LiveCasinoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      data: [],
    };
  }

  processType(data) {
    const i = this.state.data.findIndex(e => e.id === data.tableId);
    const exists = i !== -1;
    const updateState = prop => {
      if (exists) {
        const d = [...this.state.data];
        d[i][prop] = data[prop];
        this.setState({ ...this.state, data: d });
      }
    };
    const types = {
      State: () => {
        const tables = Object.keys(data.tables)
          .map(k => ({
            ...data.tables[k],
            id: k,
          }))
          .filter(table => table.open && table.display === "on_mobile");
        this.setState({ ...this.state, data: tables });
      },

      TableAssigned: () => {
        this.setState(prevState => {
          const t = data.table;
          t.id = data.tableId;
          return { data: [...prevState.data, t] };
        });
      },

      TableUnassigned: () =>
        this.setState({ data: this.state.data.splice(i, 1) }),

      TableUpdated: () => {
        const d = [...this.state.data];
        if (exists) {
          d[i] = data.table;
          d[i].id = data.tableId;
          this.setState({ ...this.state, data: d });
        }
      },

      TableOpened: () => updateState("open"),
      TableClosed: () => updateState("open"),
      SeatsUpdated: () => updateState("seatsTaken"),
      RouletteNumbersUpdated: () => updateState("results"),
      BaccaratRoadUpdated: () => updateState("road"),
      MoneyWheelNumbersUpdated: () => updateState("results"),
      PlayersUpdated: () => updateState("players"),
      OperationHoursUpdated: () => updateState("operationHours"),
      default: () => null,
    };
    return (types[data.type] || types["default"])();
  }

  onmessage(data) {
    // console.log("onmessage data", data, this.state);
    this.processType(data);
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    // connect to Websockets and listen for updates
    const ws = lobbyWS.connect();
    ws.onopen = e => console.log("ws onopen");
    ws.onmessage = e => this.onmessage(JSON.parse(e.data));
    // TODO: handle onclose and reconnection
  }

  render() {
    const { data } = this.state;

    return (
      <React.Fragment>
        <LiveCasinoList
          title="Roulette Games"
          type="Roulette"
          data={data.filter(table => table.gameType === "Roulette")}
        />
        <LiveCasinoList
          title="Roulette Games"
          type="Blackjack"
          data={data.filter(table => table.gameType === "Blackjack")}
        />
      </React.Fragment>
    );
  }
}
