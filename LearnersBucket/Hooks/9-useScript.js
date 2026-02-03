// create a hook in React that will inject new script at the end of the body.

// Keeping the main Javascript bundle as small as possible drastically boosts the performance of the app
// as it is faster to load, process, & parse.

// There are scripts that we don't require on the initial load of our app,
// rather than in certain components or places.

// For example, Google Adsense script, we can load it after once the application is ready
// and the component that will display the ads is mounted

// In such scenarios, we can use the useScript() hook to asynchronously inject scripts

// The idea is simple, pass the script source to the useScript() hook
// and it will check if any script with this source is already injected or not,
// if it is present, return 'ready' state.
// Else create a new script with the source and
// inject it at the end of the body.

// Assign even listeners on this script tag, which will update the statuses.
// on successful load 'ready' and on error 'error'.

import { useState, useEffect } from "react";

function useScript(src) {
  // keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = useState(src ? "loading" : "idle");

  useEffect(() => {
    // if no url provided, set the state to be idle
    if (!src) {
      setStatus("idle");
      return;
    }

    // get the script to check if it is already sourced or not
    let script = document.querySelector(`script[src="${src}"]`);

    if (script) {
      // if script is already loaded, get its status and update.
      // data-status is a custom attribute we will add to the script tag
      setStatus(script.getAttribute("data-status"));
    } else {
      // create script
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      setStatus("loading");

      // inject the script at the end of the body
      document.body.appendChild(script);
    }

    // helper function to update both the script status attribute and React state
    const setStatusFromEvent = (event) => {
      const newStatus = event.type === "load" ? "ready" : "error";

      // Update the custom attribute on the script tag
      script.setAttribute("data-status", newStatus);

      // Update the React state
      setStatus(newStatus);
    };

    // assign the event listeners to monitor if script is loaded properly
    script.addEventListener("load", setStatusFromEvent);
    script.addEventListener("error", setStatusFromEvent);

    // clean up
    return () => {
      if (script) {
        script.removeEventListener("load", setStatusFromEvent);
        script.removeEventListener("error", setStatusFromEvent);
      }
    };
  }, [src]);

  return status;
}

const Dummy = () => {
  const status = useScript("https://cdn.jsdelivr.net/npm/dummy@0.1.6/+esm");

  useEffect(() => {
    console.log(status);
  }, [status]);
  return <></>;
};

export default Dummy;

// loading
// loading
// ready
