import React from "react";

export default function Removebtn(props) {
  return (
    <div className="button_cont" align="center">
      <a className="remove_btn" onClick={props.removeAll}>
        Remove All
      </a>
    </div>
  );
}
