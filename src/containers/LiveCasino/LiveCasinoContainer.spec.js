import React from "react";
import { mount } from "enzyme";

import Component from "./LiveCasinoContainer";

// mocks
import State from "./__mocks__/State.json";
import TableUpdated from "./__mocks__/TableUpdated.json";
import TableOpened from "./__mocks__/TableOpened.json";
import TableClosed from "./__mocks__/TableClosed.json";
import BaccaratRoadUpdated from "./__mocks__/BaccaratRoadUpdated.json";
import MoneyWheelNumbersUpdated from "./__mocks__/MoneyWheelNumbersUpdated.json";
import PlayersUpdated from "./__mocks__/PlayersUpdated.json";
import RouletteNumbersUpdated from "./__mocks__/RouletteNumbersUpdated.json";
import SeatsUpdated from "./__mocks__/SeatsUpdated.json";

let component;

describe("LiveCasinoContainer", () => {
  beforeEach(() => {
    component = mount(<Component />);
    component.instance().onmessage(State);
  });

  it("should exist", () => {
    expect(component).toBeDefined();
  });

  it("should have tables", () => {
    expect(component.update().state().data).toHaveLength(31);
  });

  describe("should set correct state when `onmessage`", () => {
    it("if `TableUpdated` type", () => {
      component.instance().onmessage(TableUpdated);
      const table = component
        .update()
        .state()
        .data.find(o => o.id === TableUpdated.tableId);

      expect(table.id).toEqual(TableUpdated.tableId);
      expect(table.open).toEqual(TableUpdated.table.open);
      expect(table.players).toEqual(TableUpdated.table.players);
      expect(table.seats).toEqual(TableUpdated.table.seats);
    });

    it("if `TableOpened` type", () => {
      component.instance().onmessage(TableOpened);
      const d = component.update().state().data;
      const table = d.find(o => o.id === TableOpened.tableId);

      expect(table.open).toEqual(TableOpened.open);
    });

    it("if `TableClosed` type", () => {
      component.instance().onmessage(TableClosed);
      const d = component.update().state().data;
      const table = d.find(o => o.id === TableClosed.tableId);

      expect(table.open).toEqual(TableClosed.open);
    });

    it("if `SeatsUpdated` type", () => {
      component.instance().onmessage(SeatsUpdated);
      const d = component.update().state().data;
      const table = d.find(o => o.id === SeatsUpdated.tableId);

      expect(table.seatsTaken).toEqual(SeatsUpdated.seatsTaken);
    });

    it("if `RouletteNumbersUpdated` type", () => {
      component.instance().onmessage(RouletteNumbersUpdated);
      const d = component.update().state().data;
      const table = d.find(o => o.id === RouletteNumbersUpdated.tableId);

      expect(table.results).toEqual(RouletteNumbersUpdated.results);
    });

    it("if `BaccaratRoadUpdated` type", () => {
      component.instance().onmessage(BaccaratRoadUpdated);
      const d = component.update().state().data;
      const table = d.find(o => o.id === BaccaratRoadUpdated.tableId);

      expect(table.road).toEqual(BaccaratRoadUpdated.road);
    });

    it("if `MoneyWheelNumbersUpdated` type", () => {
      component.instance().onmessage(MoneyWheelNumbersUpdated);
      const d = component.update().state().data;
      const table = d.find(o => o.id === MoneyWheelNumbersUpdated.tableId);

      expect(table.results).toEqual(MoneyWheelNumbersUpdated.results);
    });

    it("if `PlayersUpdated` type", () => {
      component.instance().onmessage(PlayersUpdated);
      const d = component.update().state().data;
      const table = d.find(o => o.id === PlayersUpdated.tableId);

      expect(table.players).toEqual(PlayersUpdated.players);
    });
  });
});
