import React from "react";

export default ({ text }) =>
  !text ? <div>❑❑❑❑❑❑❑❑❑</div> : <span>{text}</span>;
