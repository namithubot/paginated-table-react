import { Column, Person } from "./model";
import { usePeopleQuery } from "./query";

import "./people.css";
import {
  AddPerson,
  Paginator,
  PeopleError,
  TableBody,
  TableHead,
} from "./compoents";
import { useEffect, useState } from "react";
import { addPerson } from "./services";

export function People() {
  const { data: people, loading, error } = usePeopleQuery();
  const [sortBy, setSortBy] = useState("name");
  const [asscending, setAscending] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPagesize] = useState(10);
  // This contains the locally created objects
  const [persons, setPersons] = useState<Person[]>([]);
  const [showAddButton, setShowAddButton] = useState(true);
  const columns: Column[] = [
    {
      name: "Name",
      id: "name",
    },
    {
      name: "Show",
      id: "show",
    },
    {
      name: "Actor/Actress",
      id: "actor",
    },
    { name: "Date of Birth", id: "dob" },
    { name: "Movies", id: "movies" },
  ];

  function sort(col: string, isAsc: boolean) {
    setSortBy(col);
    setAscending(isAsc);
  }

  function pageChange(page: number, size: number) {
    setPageNumber(page);
    setPagesize(size);
  }

  function tryAddPerson(person: Person) {
    try {
      addPerson(person);
      setPersons([...persons, ...[person]]);
      setShowAddButton(true);
    } catch (err) {
      alert("Failed to add");
    }
  }

  if (loading) {
    return <p>Fetching People...</p>;
  }

  if (error || !people?.length) {
    return <PeopleError people={people} err={error} />;
  }

  return (
    <>
      {showAddButton ? (
        <button onClick={() => setShowAddButton(false)}>Add Person</button>
      ) : (
        <AddPerson onAdd={tryAddPerson} />
      )}
      <input
        style={{ width: "100%", marginBottom: "1rem" }}
        type="text"
        name="Search"
        aria-label="Search"
        placeholder="Looking for something?"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />

      <table>
        <TableHead onSort={sort} columns={columns} />
        <TableBody
          data={persons
            .concat(people)
            .filter((p) =>
              p.name
                .toLocaleLowerCase()
                .includes(searchString.toLocaleLowerCase()),
            )
            .sort(
              (p1, p2) =>
                ((p1 as any)[sortBy] < (p2 as any)[sortBy] ? -1 : 1) *
                (asscending ? 1 : -1),
            )
            .slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)}
        />
      </table>
      <Paginator
        page={pageNumber}
        size={pageSize}
        total={people.length}
        onPageChange={pageChange}
      />
    </>
  );
}
