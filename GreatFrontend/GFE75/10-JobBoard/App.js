import { useState, useEffect, useRef } from "react";

// Number of job posts to load per page (pagination chunk size)
const PAGE_SIZE = 6;

// ─── PRESENTATIONAL COMPONENT ─────────────────────────────────────────────────
// Pure display component — receives all data via props, no internal state.
// role="listitem" pairs with role="list" on the parent for screen reader accessibility.
const JobPosting = ({ uri, by, time, title }) => {
  return (
    <div className="post" role="listitem">
      <h2 className="post__title">
        {/* Conditionally render a link only if a URI exists.
            target="_blank" opens in new tab.
            rel="noopener" prevents the new tab from accessing window.opener
            (security best practice for external links) */}
        {uri ? (
          <a href={uri} target="_blank" rel="noopener">
            {title}
          </a>
        ) : (
          title
        )}
      </h2>
      <p className="post__metadata">
        {/* &middot; is the · character used as a visual separator.
            time from HN API is Unix timestamp in seconds, multiply by 1000
            to convert to milliseconds for JS Date */}
        By {by} &middot; {new Date(time * 1000).toLocaleString()}
      </p>
    </div>
  );
};

// ─── MAIN APP COMPONENT ────────────────────────────────────────────────────────
export default function App() {
  // true while fetching individual job details (used to disable "Load more" button)
  const [fetchingJobDetails, setFetchingJobDetails] = useState(false);

  // Current page index (0-based). Incrementing this triggers the useEffect to load more.
  const [page, setPage] = useState(0);

  // Full list of job IDs from HN API — fetched once and cached here.
  // null = not yet fetched, [] or [ids] = already fetched.
  const [jobIds, setJobIds] = useState(null);

  // Accumulated list of job detail objects across all loaded pages.
  const [jobs, setJobs] = useState([]);

  // useRef to track if the component is still mounted.
  // Prevents setState calls after unmount (avoids memory leak / stale state warnings).
  const isMounted = useRef(true);

  // Set isMounted to false when the component unmounts (cleanup function).
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  // Whenever `page` changes (user clicks "Load more"), fetch jobs for that page.
  // Also runs on initial mount (page = 0) to load the first batch.
  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  // ─── FETCH JOB IDs ───────────────────────────────────────────────────────────
  // Fetches the full list of job IDs from HN API only once (cached in state).
  // Slices the IDs for the requested page using PAGE_SIZE.
  async function fetchJobIds(currPage) {
    let jobIdList = jobIds;

    // Only hit the API if we haven't fetched IDs yet
    if (!jobIdList) {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/jobstories.json",
      );
      jobIdList = await res.json();

      // No-op if component is unmounted.
      if (!isMounted.current) {
        return;
      }

      setJobIds(jobIdList);
    }

    // Calculate the slice of IDs for the current page.
    // PAGE_SIZE = 6, so:
    //   page 0 → start=0,  end=6  → IDs[0..5]
    //   page 1 → start=6,  end=12 → IDs[6..11]
    //   page 2 → start=12, end=18 → IDs[12..17]
    // slice(start, end) is end-exclusive, so it always returns exactly PAGE_SIZE items.
    const start = currPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return jobIdList.slice(start, end);
  }

  // ─── FETCH JOB DETAILS ───────────────────────────────────────────────────────
  // Fetches full details for each job ID in the current page.
  // Promise.all fires all fetches in parallel (much faster than sequential await).
  async function fetchJobs(currPage) {
    const jobIdsForPage = await fetchJobIds(currPage);

    setFetchingJobDetails(true);

    // Fetch all jobs for the current page in parallel
    const jobsForPage = await Promise.all(
      jobIdsForPage.map((jobId) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`).then(
          (res) => res.json(),
        ),
      ),
    );

    // No-op if component is unmounted.
    if (!isMounted.current) {
      return;
    }

    setFetchingJobDetails(false);

    // useEffect (and hence `fetchJobs`) runs twice on component mount
    // during development in Strict Mode.
    //
    // But since the value of `jobs` within the closure is the same,
    // the resulting combined jobs will be the same, assuming the results
    // for the API stays the same between requests.
    //
    // Deduplication: filter out any job IDs already present in state
    // to avoid duplicates (especially important in React Strict Mode
    // where effects run twice in development).
    setJobs((prev) => {
      const filteredNewJobs = jobsForPage.filter((job) => {
        return !prev.some((j) => j.id === job.id);
      });

      // Append new jobs to the existing list (accumulate across pages)
      return [...prev, ...filteredNewJobs];
    });
  }

  return (
    <div className="app">
      <h1 className="title">Hacker News Jobs Board</h1>

      {/* Show loading state until the job ID list is fetched for the first time */}
      {jobIds == null ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          {/* role="list" + role="listitem" on children = explicit list semantics for a11y */}
          <div className="jobs" role="list">
            {jobs.map((job) => (
              // Spread all job fields as props — cleaner than listing each individually
              <JobPosting key={job.id} {...job} />
            ))}
          </div>

          {/* Show "Load more" button only if:
              1. At least one job is loaded (jobs.length > 0)
              2. There are more jobs beyond the current page
              Start (page * PAGE_SIZE) + End (start + PAGE_SIZE)
              Formula: (page * PAGE_SIZE + PAGE_SIZE) = total jobs shown so far
              If that's less than total available IDs, more jobs exist */}
          {jobs.length > 0 && page * PAGE_SIZE + PAGE_SIZE < jobIds.length && (
            <button
              className="load-more-button"
              disabled={fetchingJobDetails} // Prevent double-clicking while loading
              onClick={() => setPage(page + 1)} // Increment page → triggers useEffect → fetches next batch
            >
              {fetchingJobDetails ? "Loading..." : "Load more jobs"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
