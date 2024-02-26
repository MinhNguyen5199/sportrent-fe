// ADD THIS TO CONTROLS FOLDER

import React from "react";
import "../../components/Common.css";

function FormatAmount(props) {
  let val = parseFloat(props.amount);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>$</div>
      <div>{val.toFixed(2)}</div>
    </div>
  );
}

export default FormatAmount;
