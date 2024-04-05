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
  const [persons, setPersons] = useState(people || []);
  const [sortBy, setSortBy] = useState("name");
  const [asscending, setAscending] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPagesize] = useState(10);
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

  useEffect(() => {
    const sortReturn = asscending ? 1 : -1;
    setPersons(
      (people || [])
        .filter((p) =>
          p.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()),
        )
        .sort((p1, p2) =>
          (p1 as any)[sortBy] < (p2 as any)[sortBy]
            ? -1 * sortReturn
            : sortReturn,
        )
        .slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
    );
  }, [sortBy, people, asscending, searchString, pageNumber, pageSize]);

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
      <div>{/* <AddPerson onAdd={tryAddPerson} /> */}</div>
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
        <TableBody data={persons} />
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
