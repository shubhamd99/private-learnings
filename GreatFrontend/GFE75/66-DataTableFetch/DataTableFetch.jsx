import { useState, useEffect } from "react";
import "./styles.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";
const TOTAL_USERS_FROM_API = 10;

export default function DataTableFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination & Sorting state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const url = `${API_URL}?_page=${page}&_limit=${pageSize}&_sort=name&_order=${sortOrder}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Fetch failed");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page, pageSize, sortOrder]);

  // Math.ceil - rounds up to the nearest whole number
  const totalPages = Math.ceil(TOTAL_USERS_FROM_API / pageSize);

  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                Name {sortOrder === "asc" ? "🔼" : "🔽"}
              </button>
            </th>
            <th>Email</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="loading">
                Loading...
              </td>
            </tr>
          ) : (
            data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address?.city}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <hr />

      <div className="pagination">
        <select
          aria-label="Page size"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value="5">Show 5</option>
          <option value="10">Show 10</option>
        </select>

        <div className="pages">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
