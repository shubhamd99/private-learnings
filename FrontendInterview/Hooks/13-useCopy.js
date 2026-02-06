//  Implement an useCopy() hook in React that copies the given text to the clipboard.

// The useCopy() method returns a method copy(text) which accepts the text as input
// and copies that text and the copied text.

// To implement this function we will use the browser's inbuilt method that
// allows copying things. navigator.clipboard

// navigator.clipboard has two methods.
// writeText(text) - Used to copy any given text.
// readText() - Used to read the copied text.

// Both operations are asynchronous and return promises.
// For our use, we will use the writeText(text) and
// wrap this inside the try...catch block.

// We will also use the useState() hook to persist the copied text.
//  If the promise is fulfilled then update the state with the text else set the state to null.

// This operation will take place inside the copy() function that accepts the text as input and tries to copy that.

import { useState } from "react";

const useCopy = () => {
  const [copiedText, setCopiedText] = useState();

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
    } catch (error) {
      console.error(`Failed copying the text ${text}`, error);
      setCopiedText(null);
    }
  };

  return [copiedText, copy];
};

function Example() {
  // call the hook which returns, copied text and the copy function
  const [copiedText, copy] = useCopy();
  return (
    <button onClick={() => copy("Hello World!")}>
      {" "}
      "copiedText" : {copiedText}
    </button>
  );
}

export default Example;

// Output:
// copiedText:  // initially
// copiedText: Hello World! // after click
