import React from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0;
  if (page === "signIn") {
    stepPercentage = 16;
  } else if (page === "cart") {
    stepPercentage = 49.5;
  } else if (page === "checkout") {
    stepPercentage = 82.5;
  } else if (page === "Completed") {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
         
         <>
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("1")}
          >
            {index + 1}
          </div>
          <div className="MSP-label">Sign&nbsp;In</div></>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <><div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("2")}
          >
            {index + 1}
          </div>
          <div className="MSP-label">Cart</div></>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
         <>
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("3")}
          >
            {index + 1} 
          </div>
          <div className="MSP-label">Checkout</div></>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <>
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("4")}
          >
            {index + 1}
          </div>
          <div className="MSP-label">Complete</div></>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
