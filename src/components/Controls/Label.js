import React from "react";
import "../../components/Common.css";

function Label(props) {
  return (
    <label className="sr-lbl" htmlFor={props.htmlFor}>
      {props.content}
    </label>
  );
}

export default Label;
