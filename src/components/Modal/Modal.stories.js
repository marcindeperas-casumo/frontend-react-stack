/* @flow */
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Modal } from "./Modal";

const stories = storiesOf("Modal", module);

stories.add("Default", () => (
  <div
    style={{
      flex: 1,
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      minHeight: 1000,
    }}
  >
    <Modal onClose={action("onClose")}>
      <Modal.Header>Header</Modal.Header>
      <Modal.Content>
        <div>
          <img
            alt="Bob Ross"
            src="https://images05.military.com/sites/default/files/styles/full/public/media/people/2013/05/bobrosspainting.jpg"
            className="u-margin-bottom t-border-r--md"
          />
          <p>
            Let's make some happy little clouds in our world. If there's two big
            trees invariably sooner or later there's gonna be a little tree.
            Remember how free clouds are. They just lay around in the sky all
            day long.
          </p>
          <p>
            Let's make some happy little clouds in our world. If there's two big
            trees invariably sooner or later there's gonna be a little tree.
            Remember how free clouds are. They just lay around in the sky all
            day long.
          </p>
          <p>
            Let's make some happy little clouds in our world. If there's two big
            trees invariably sooner or later there's gonna be a little tree.
            Remember how free clouds are. They just lay around in the sky all
            day long.
          </p>
          <p>
            Let's make some happy little clouds in our world. If there's two big
            trees invariably sooner or later there's gonna be a little tree.
            Remember how free clouds are. They just lay around in the sky all
            day long.
          </p>
        </div>
      </Modal.Content>
      <Modal.Footer>Footer</Modal.Footer>
    </Modal>
  </div>
));
