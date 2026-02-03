// This question was asked in Adobe’s MTS 2 frontend interview and Rippling's SDE2 frontend interview,
// where it was asked to create a custom hook for Infinite scroll with cursor-based pagination

// Pagination

// Offset-based
// In offset-based navigation we can jump to any page for navigation.
// GET https://rickandmortyapi.com/api/character/page/10 // jump directly to the 10th page

// Cursor-based
// In cursor-based navigation we get pointer to the next list of items,
// so we go to the list where we have last left from
// The cusor based  navigation can be any direction, forward or backward,
// with the next and  prev props

// GET https://rickandmortyapi.com/api/character

// {
//   "info": {
//     "count": 826,
//     "pages": 42,
//     "next": "https://rickandmortyapi.com/api/character/?page=2",
//     "prev": null
//   },
//   "results": [
//     // ...
//   ]
// }

// Here the next contains the whole URL, but this can change depending upon the implementation.Infinite scrolling

// Infinite scrolling
// Infinite-scroll is a navigation and performance optimization technique,
//  in which we provide infinite scrolling experience to the user
// where  when the user nears to the end of the current list,
// we fetch the new list and thus the scroll size increases.

// This helps to progressively render the large datasets with the fetching the next list at the end

// We will create a custom hook in React, that will support the infinite scroll and with the cursor-based pagination.

// I am going to use this dummy API https://rickandmortyapi.com/api/character that supports the cursor-based pagination.
// It will return cursor details and the result.

// {
//   "info": {
//     "count": 826,
//     "pages": 42,
//     "next": "https://rickandmortyapi.com/api/character/?page=2",
//     "prev": null
//   },
//   "results": [
//     // ...
//   ]
// }

// We are going to maintain 5 different states in our hook.

// currentUrl – This will store the next pointer of the cursor based pagination. info from the response.

// triggerAPICall – This flag will help to trigger the next API call, we will update it this when the scroll
// nears to end and will reset it once API call is finished.

// results – Combined result from all the API call.

// isLoading – Whether an API call is in pipeline.

// done – If we have fetched all the items from the list.

import { useState, useEffect, useTransition, useRef } from "react";

const URL = "https://rickandmortyapi.com/api/character";

export const useInfiniteScroll = (ref) => {
  const [currentUrl, setCurrentUrl] = useState(URL);
  const [triggerAPICall, setTriggerAPICall] = useState(true);
  const [results, setResults] = useState([]);
  // useTransition is a React Hook that lets you render
  // a part of the UI in the background.
  const [isLoading, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fetchAction = async (url) => {
      try {
        const _response = await fetch(url);
        const response = await _response.json();
        const { info, results } = response;
        if (info.next) {
          setCurrentUrl(info.next);
          setResults((prev) => {
            return [...prev, ...results];
          });
        } else {
          setDone(true);
        }
      } catch (e) {
        console.error("Something went wrong", e);
      } finally {
        setTriggerAPICall(false);
      }
    };

    if (triggerAPICall) {
      startTransition(async () => {
        await fetchAction(currentUrl);
      });
    }
  }, [currentUrl, triggerAPICall]);

  // Infinite Scroll Observer
  useEffect(() => {
    const onScroll = () => {
      // if scrolled to the bottom
      console.log(
        window.innerHeight,
        window.scrollY,
        window.document.body.offsetHeight,
      );
      if (
        // window.innerHeight: The height of the viewport (visible area of the browser).
        // window.scrollY: The number of pixels the page has been scrolled vertically.
        // document.documentElement.scrollHeight: The total height of the entire page content.
        // 200: A buffer value (in pixels) to trigger the load before reaching the absolute bottom.
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 200
      ) {
        // update the state
        setTriggerAPICall(true);
      }
    };

    // scroll event
    window.addEventListener("scroll", onScroll);

    // memory cleanup, remove listener
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return { isLoading, results, done };
};

const Characters = ({ name, status, species, image }) => {
  return (
    <div>
      <div>
        <img src={image} alt={name} />
        <div>
          <p>Name: {name}</p>
          <p>Status: {status}</p>
          <p>Species: {species}</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const areaRef = useRef();
  const { isLoading, results } = useInfiniteScroll(areaRef);
  return (
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      <div ref={areaRef} style={{ height: "100%" }}>
        {results.map((e) => (
          <Characters key={e.id} {...e} />
        ))}
      </div>
      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
}
