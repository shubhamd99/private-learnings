// Switch-case component functions similarly to the switch-case method,
// the only difference is it conditionally renders elements that pass different cases.

// The default case is compulsory for each switch component and
// the cases can be a primitive value or a function,
// if it is a function then we will have to evaluate the returned response from the function.

// The JSX elements are converted to a function using babel, and each child is passed a nested object,
// thus we can access the children and get its name and properties.

// Based on the name, we can check if it is a CustomCase or DefaultCase.
// If it is DefaultCase we can store it in a variable.

// For the CustomCase children we perform equality checks if they pass,
// then we will store them in an array.
// Ultimately if the cases are there then we will return them else return the default case.

import React, { Children } from "react";

const CustomSwitch = ({ children, value }) => {
  const cases = [];
  const defaults = [];

  // Children is an array of React elements
  Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === CustomCase) {
      const caseValue = child.props.value;

      const isMatch =
        typeof caseValue === "function"
          ? caseValue(value)
          : caseValue === value;

      if (isMatch) {
        cases.push(child);
      }
    } else if (child.type === DefaultCase) {
      defaults.push(child);
    }
  });

  // Return matching cases if any, otherwise return the default(s)
  return <>{cases.length > 0 ? cases : defaults}</>;
};

const CustomCase = ({ children }) => <>{children}</>;

const DefaultCase = ({ children }) => <>{children}</>;

const App = () => {
  const testValue = "10";

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Custom Switch Result:</h2>

      <CustomSwitch value={testValue}>
        {/* Function Case: Returns true if value <= 10 (will be false here) */}
        <CustomCase value={(val) => Number(val) <= 10}>
          <div>Matched: Less than 10</div>
        </CustomCase>

        {/* Function Case: Returns true if value < 10 (will be false here) */}
        <CustomCase value={(val) => Number(val) < 9}>
          <div>Matched: Less than 9</div>
        </CustomCase>

        {/* Primitive Case: Match "20" */}
        <CustomCase value="20">
          <div>Matched: Hello 20</div>
        </CustomCase>

        {/* Primitive Case: Match "10" (This will match!) */}
        <CustomCase value="10">
          <div style={{ color: "green", fontWeight: "bold" }}>
            Matched: Hello 10 (Exact Match)
          </div>
        </CustomCase>

        {/* Default Case: Only shows if no CustomCase matches */}
        <DefaultCase>
          <div>Default: No matches found.</div>
        </DefaultCase>
      </CustomSwitch>
    </div>
  );
};

export default App;
