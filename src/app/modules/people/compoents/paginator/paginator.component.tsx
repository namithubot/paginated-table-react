import React from "react";
import "./paginator.css";

export const Paginator = ({
  page,
  size,
  total,
  onPageChange,
}: {
  page: number;
  size: number;
  total: number;
  onPageChange: (page: number, size: number) => void;
}) => {
  const allowedSizes = [5, 10, 15, 20, 25, 30];
  return (
    <>
      <button
        className="page-btn"
        disabled={page === 0}
        onClick={() => onPageChange(0, size)}
      >
        First
      </button>
      <button
        className="page-btn"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1, size)}
      >
        Previous
      </button>
      <span>
        Showing {page * size + 1}-{(page + 1) * size} of {total}{" "}
      </span>
      <button
        className="page-btn"
        disabled={page === Math.floor(total / size) - 1}
        onClick={() => onPageChange(page + 1, size)}
      >
        Next
      </button>
      <button
        className="page-btn"
        disabled={page === Math.floor(total / size) - 1}
        onClick={() => onPageChange(Math.floor(total / size) - 1, size)}
      >
        Last
      </button>

      <select
        value={size}
        onChange={(e) => onPageChange(page, parseInt(e.target.value))}
      >
        {allowedSizes.map((size) => (
          <option key={size} value={size}>
            {" "}
            {size}{" "}
          </option>
        ))}
      </select>
    </>
  );
};
