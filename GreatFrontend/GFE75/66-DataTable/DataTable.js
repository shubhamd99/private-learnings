import { useState } from "react";
import users from "./data/users";

const columns = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Occupation", key: "occupation" },
];

function paginateUsers(usersList, page, pageSize) {
  // Calculate the slice of IDs for the current page.
  // PAGE_SIZE = 6, so:
  //   page 0 → start=0,  end=6  → IDs[0..5]
  //   page 1 → start=6,  end=12 → IDs[6..11]
  //   page 2 → start=12, end=18 → IDs[12..17]
  // slice(start, end) is end-exclusive, so it always returns exactly PAGE_SIZE items.
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageUsers = usersList.slice(start, end);
  // Math.ceil() function rounds a number up to the nearest integer
  const totalPages = Math.ceil(usersList.length / pageSize);
  return { pageUsers, totalPages };
}

export default function DataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  // State to manage the sorting order ('asc', 'desc', or null)
  const [sortOrder, setSortOrder] = useState(null);

  const { totalPages, pageUsers: initialPageUsers } = paginateUsers(
    users,
    page,
    pageSize,
  );

  // Sorting logic now only applies to the visible data on the current page
  const pageUsers = [...initialPageUsers].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "desc") {
      return b.name.localeCompare(a.name);
    }
    return 0; // Default: no sorting
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>
                {key === "name" ? (
                  <button
                    onClick={() => {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    {label}{" "}
                    {sortOrder === "asc"
                      ? "🔼"
                      : sortOrder === "desc"
                        ? "🔽"
                        : "↕️"}
                  </button>
                ) : (
                  label
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {pageUsers.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="pagination">
        <select
          aria-label="Page size"
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPage(1);
          }}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>

        <div className="pages">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Prev
          </button>

          <span aria-label="Page number">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
