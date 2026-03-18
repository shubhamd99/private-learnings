// Create a Like button which appearance changes based on the following states:

// Requirements
// In the button's default state, when it is clicked, it goes into the loading state
// and a request is made to the provided back end API which has a
// 50% chance of succeeding/failing.

// Success response: If the request was successful,
// the button changes to the "Liked" state.

// Failure response: Otherwise it returns to the "Default"/"Hovered" state depending on
// whether the cursor is still over the button. The error message from the back end
// API should be shown below the button.

// If the user clicks on a button in the "Liked" state, the reverse happens.

// Submission API
// URL: https://questions.greatfrontend.com/api/questions/like-button
// HTTP Method: POST
// Content Type: json

// Parameters
// The following fields are accepted in the request body:

// action: A string of either 'like' or 'unlike' depending on the desired action.

// Success: { message: 'Success!' }
// Failure: { message: 'Unknown error during attempted {{action}}. Please try again later.!' }

import { useState } from "react";
import { HeartIcon, SpinnerIcon } from "./icons";

function classNames(...args) {
  return args.filter(Boolean).join(" ");
}

export default function App() {
  // Determines if the button is in the default/liked state.
  const [liked, setLiked] = useState(false);
  // Whether there's a pending background API request.
  const [isPending, setIsPending] = useState(false);
  // Error message to be shown if the API request failed.
  const [errorMessage, setErrorMessage] = useState(null);

  async function likeUnlikeAction() {
    try {
      setIsPending(true);
      setErrorMessage(null);

      const response = await fetch(
        "https://questions.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: liked ? "unlike" : "like",
          }),
        },
      );

      if (!response.ok) {
        const res = await response.json();
        setErrorMessage(res.message);
        return;
      }

      setLiked(!liked);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="button-container">
      <button
        className={classNames(
          "like-button",
          liked ? "like-button--liked" : "like-button--default",
        )}
        disabled={isPending}
        onClick={() => {
          likeUnlikeAction();
        }}
      >
        {isPending ? <SpinnerIcon /> : <HeartIcon />}
        {liked ? "Liked" : "Like"}
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}
