import React, { useState, useRef } from "react";
import "./styles.css";

// 1. Controlled Form Component
function ControlledForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const renderCount = useRef(0);
  renderCount.current++;

  const handleChange = (e) => {
    const val = e.target.value;
    setName(val);
    setError(val.length < 3 ? "At least 3 characters required" : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted Controlled: ${name}`);
  };

  return (
    <div className="panel">
      <h3>Controlled Form</h3>
      <p className="badge">Renders: {renderCount.current}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name (state-driven):</label>
          <input type="text" value={name} onChange={handleChange} />
        </div>
        {error && <p className="error">{error}</p>}
        <p>
          Live state value: <strong>{name || "(empty)"}</strong>
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// 2. Uncontrolled Form Component
function UncontrolledForm() {
  const nameRef = useRef(null);
  const [error, setError] = useState("");
  const [submittedVal, setSubmittedVal] = useState("");
  const renderCount = useRef(0);
  renderCount.current++;

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = nameRef.current.value;
    if (val.length < 3) {
      setError("At least 3 characters required");
      setSubmittedVal("");
    } else {
      setError("");
      setSubmittedVal(val);
      alert(`Submitted Uncontrolled: ${val}`);
    }
  };

  return (
    <div className="panel">
      <h3>Uncontrolled Form</h3>
      <p className="badge">Renders: {renderCount.current}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name (DOM ref):</label>
          <input type="text" ref={nameRef} />
        </div>
        {error && <p className="error">{error}</p>}
        <p>
          Submitted value: <strong>{submittedVal || "(none yet)"}</strong>
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <h2>Controlled vs Uncontrolled Inputs</h2>
      <p className="desc">
        Controlled inputs re-render on every keystroke as state updates.
        Uncontrolled inputs read directly from the DOM using refs, avoiding
        re-renders.
      </p>
      <div className="panels">
        <ControlledForm />
        <UncontrolledForm />
      </div>
    </div>
  );
}
