import React from "react";
import "./LoadingStyle.css";

const Loading = () => {
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col loading-spinner" style={{ height: "100vh" }}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-dark"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
