/* @flow */
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

import Modal from "./Modal";

const stories = storiesOf("Modal", module);

const customHeader = (
  <h1
    style={{ fontFamily: "Comic Sans MS", color: "red", background: "yellow" }}
  >
    UGLY AF
  </h1>
);

const defaultProps = {
  children: (
    <div className="u-padding--lg">
      <img
        alt="Bob Ross"
        src="https://images05.military.com/sites/default/files/styles/full/public/media/people/2013/05/bobrosspainting.jpg"
        className="u-margin-bottom t-border-r--16"
      />
      <p>
        Let's make some happy little clouds in our world. If there's two big
        trees invariably sooner or later there's gonna be a little tree.
        Remember how free clouds are. They just lay around in the sky all day
        long.
      </p>
    </div>
  ),
  className: "c-modal--absolute",
  header: "Modal Header",
  onClose: action("dismiss modal"),
};

const renderModal = (props = {}) => () => (
  <div
    style={{
      position: "absolute",
      height: 640,
      width: 320,
    }}
  >
    <Modal {...defaultProps} {...props} />
  </div>
);

stories.add("Default", renderModal({ dismissType: "none" }));
stories.add("With Back Button", renderModal({ dismissType: "back" }));
stories.add("With Close Button", renderModal());
stories.add("With Custom Header", renderModal({ header: customHeader }));
