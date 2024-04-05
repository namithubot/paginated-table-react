import React, { useState } from "react";
import { Column } from "../../model";

export const TableHead = ({
  columns,
  onSort,
}: {
  columns: Column[];
  onSort: (c: string, o: boolean) => void;
}) => {
  const [sortingColumn, setSortingColumn] = useState("name");
  const [isAsc, setIsAsc] = useState(true);

  function markSortingColumn(column: string) {
    if (column === sortingColumn) {
      onSort(column, !isAsc);
      setIsAsc(!isAsc);
    } else {
      setIsAsc(true);
      setSortingColumn(column);
      onSort(column, true);
    }
  }

  function getAriaSort(column: string) {
    return column !== sortingColumn
      ? "none"
      : isAsc
        ? "ascending"
        : "descending";
  }

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.id}
            onClick={() => markSortingColumn(column.id)}
            aria-sort={getAriaSort(column.id)}
          >
            {column.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};
