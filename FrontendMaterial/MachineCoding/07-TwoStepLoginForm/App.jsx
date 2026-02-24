// Google has a unique login UX that completes the logic flow in two steps, First, where the email is verified, and second where the password verification is done.
// In this article, we will see how we can implement the same in Reactjs using Syncfusion’s react components library.

import { useState } from "react";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "./App.css";

const LoginForm = () => {
  const [track, setTrack] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verifyEmail = async () => {
    // async operations
    // validate email
    if (email) {
      setTrack(1);
    }
  };

  const handleSubmit = async () => {
    // async operations
  };

  return (
    <div className="box">
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "1.5em" }}>Sign In</p>
        <p>to continue to Gmail.</p>
      </div>
      {track === 0 ? (
        <>
          <TextBoxComponent
            type="email"
            value={email}
            placeholder="Email"
            floatLabelType="Auto"
            input={({ value }) => setEmail(value)}
            cssClass="e-outline"
          />
          <div className="buttonWrapper">
            <ButtonComponent
              type="submit"
              cssClass="e-info"
              style={{ fontSize: "18px", padding: "10px 20px" }}
              onClick={verifyEmail}
            >
              Next
            </ButtonComponent>
          </div>{" "}
        </>
      ) : (
        <>
          <TextBoxComponent
            type="password"
            value={password}
            placeholder="Password"
            floatLabelType="Auto"
            input={({ value }) => setPassword(value)}
            cssClass="e-outline"
            key="2"
          />
          <div className="buttonWrapper">
            <ButtonComponent
              type="submit"
              cssClass="e-danger"
              onClick={() => setTrack(0)}
              style={{ fontSize: "18px", padding: "10px 20px" }}
            >
              Change Email
            </ButtonComponent>{" "}
            <ButtonComponent
              type="submit"
              cssClass="e-success"
              onClick={handleSubmit}
              style={{ fontSize: "18px", padding: "10px 20px" }}
            >
              Submit
            </ButtonComponent>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginForm;

// If you are wondering why I haven’t separated the Email and Password components into two different functions
// Well because if I wrap them in a function and then use the global state, it creates a bug,
// and because of this, the input component loses its focus every time we type something
// because once the state is updated the component re-renders and because the input field is wrapped inside a function
// it is treated as functional component thus it loses it focus.

// To solve this we can maintain the state in each component but that will increase complexity as we will have to do
// the prop drill down or use a global state.
