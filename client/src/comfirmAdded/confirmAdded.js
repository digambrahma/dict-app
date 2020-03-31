import React from "react";
import { Alert } from "react-bootstrap";
import "./confirmAdded.css";
export const ConfirmAdded = props => {
  var added = props.added;
  if (added === 1) {
    return (
      <div className="added">
        <Alert variant="warning">Defiition already Added!</Alert>
      </div>
    );
  } else if (added === 2) {
    return (
      <div className="added">
        <Alert variant="success">
          Thanks! You can add more definition if you wish.
        </Alert>
      </div>
    );
  } else if (added === 3) {
    return (
      <div className="added">
        <Alert variant="danger">Please fill in all required fields.</Alert>
      </div>
    );
  } else if (added === 4) {
    return (
      <div className="added">
        <Alert variant="secondary">Please connect to the internet.</Alert>
      </div>
    );
  } else {
    return <div className="added"></div>;
  }
};
