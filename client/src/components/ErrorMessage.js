import React from "react";
import "../styles/errorMessage.scss";

function ErrorMessage({ error, isEmpty, editable, setEmpty }) {
  return (
    error.empty !== null &&
    error.empty &&
    editable && (
      <div className={`error-message`} onClick={setEmpty}>
        <p>{error.message}</p>
      </div>
    )
  );
}

export default ErrorMessage;
