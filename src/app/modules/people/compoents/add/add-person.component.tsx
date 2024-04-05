import React, { useState } from "react";
import { Person } from "../../model";

import "./add-person.css";

export const AddPerson = ({ onAdd }: { onAdd: (person: Person) => void }) => {
  const [person, setPerson] = useState<Person>({
    name: "",
    actor: "",
    dob: "",
    movies: [],
    id: crypto.randomUUID(),
    updatedAt: "",
    show: "",
  });

  function addMovie() {
    setPerson({
      ...person,
      movies: [...person.movies, ...[{ title: "", released: "" }]],
    });
  }

  function performAdd() {
    onAdd({ ...person, updatedAt: new Date().toISOString() });
  }

  return (
    <>
      <form onSubmit={performAdd} className="add-person">
        <input
          type="text"
          className="person-detail"
          onChange={(e) => setPerson({ ...person, name: e.target.value })}
          value={person.name}
          aria-label="name"
          placeholder="Name"
          required
        />
        <input
          type="text"
          className="person-detail"
          onChange={(e) => setPerson({ ...person, show: e.target.value })}
          value={person.show}
          aria-label="show"
          placeholder="Show"
          required
        />
        <input
          type="text"
          className="person-detail"
          onChange={(e) => setPerson({ ...person, actor: e.target.value })}
          value={person.actor}
          aria-label="actor"
          placeholder="Actor/Actress"
          required
        />
        <input
          type="date"
          className="person-detail"
          value={new Date(person.dob).toLocaleDateString("sv-SE")}
          onChange={(e) =>
            setPerson({
              ...person,
              dob: new Date(e.target.value).toISOString(),
            })
          }
          aria-label="date of birth"
          placeholder="Date of Birth"
          required
        />
        {person.movies.map((movie, i) => (
          <div key={`add-movie-${i}`} className="movie-detail">
            <input
              type="text"
              value={movie.title}
              onChange={(e) =>
                setPerson({
                  ...person,
                  movies: [
                    ...person.movies.slice(0, i),
                    ...[
                      {
                        title: e.target.value,
                        released: person.movies[i].released,
                      },
                    ],
                    ...person.movies.slice(i + 1),
                  ],
                })
              }
              aria-label="movie-title"
              placeholder="Movie Title"
              required
            />

            <input
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              value={new Date(movie.released).toLocaleDateString("sv-SE")}
              onChange={(e) =>
                setPerson({
                  ...person,
                  movies: [
                    ...person.movies.slice(0, i),
                    ...[
                      {
                        title: movie.title,
                        released: new Date(e.target.value).toISOString(),
                      },
                    ],
                    ...person.movies.slice(i + 1),
                  ],
                })
              }
              aria-label="release date"
              placeholder="Release Date"
              data-tesid="release-date"
              required
            />
            <button
              onClick={() => {
                setPerson({
                  ...person,
                  movies: [
                    ...person.movies.slice(0, i),
                    ...person.movies.slice(i + 1),
                  ],
                });
              }}
            >
              x
            </button>
          </div>
        ))}
        <button onClick={() => addMovie()}>Add Movie</button>
        <button
          style={{ width: "50%", display: "block", float: "right" }}
          type="submit"
        >
          Add Person To Table
        </button>
      </form>
    </>
  );
};
