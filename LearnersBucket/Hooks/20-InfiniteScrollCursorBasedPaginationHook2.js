import { useState, useEffect, useTransition, useRef } from "react";

// Follow - up: Can we detect if we have scrolled to the bottom without using event listener?
// Yes, we can using the Intersection observer, that observers an element and we can use it to detect
// if the element is within the viewport or not.

// We can place a sentinel element at the bottom of the list and keep on observing it
// once it has become visible, this will mean we have scrolled to the bottom of the list
// and we will trigger a new API call.

// sentinel element is an element that is placed at the bottom of the list
// and is used to detect when the user has scrolled to the bottom of the list

const URL = "https://rickandmortyapi.com/api/character";

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  // monitor the interaction
  const observer = new IntersectionObserver(
    ([entry]) => {
      // update the state on interaction change
      setIntersecting(entry.isIntersecting);
    },
    {
      // 1. threshold: 1.0 means that the observer will trigger the callback
      // when the sentinel element is 100% visible in the viewport.
      // 2. rootMargin: "0px" means that the observer will trigger the callback
      // when the sentinel element is 0px away from the viewport.
      threshold: 1.0,
    },
  );

  useEffect(() => {
    // assign the observer
    observer.observe(ref.current);

    // remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}

export const useInfiniteScroll = (ref) => {
  const [currentUrl, setCurrentUrl] = useState(URL);
  const [triggerAPICall, setTriggerAPICall] = useState(true);
  const [results, setResults] = useState([]);
  const [isLoading, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  // ref sentinel element, placed at the bottom of the list
  const isVisible = useOnScreen(ref);

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

  useEffect(() => {
    // every time a sentinel element is visible,
    // we make an new api call
    if (isVisible) {
      setTriggerAPICall(true);
    }
  }, [isVisible]);

  return { isLoading, results, done };
};

export default function Demo() {
  const areaRef = useRef();
  const { isLoading, results } = useInfiniteScroll(areaRef);
  return (
    <div className="App">
      <div className="wrapper">
        <>
          {results.map((e) => (
            <Characters key={e.id} {...e} />
          ))}
          {/* Sentinel element */}
          <div id="sentinel-elemet" ref={areaRef}></div>
        </>
      </div>
      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
}

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
