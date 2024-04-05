import React, { useState } from "react";
import { Column, Person } from "../../model";

export const TableBody = ({
  data,
}: {
  data: Person[];
}) => {
  return (
    <tbody>
      {/* {
			data.map(person => {
				return columns.map(column => {
					return(
						<>
						 {
						 	person[column.id]
						 }
						</>
					)
				})
			})
		} */}
      {data.map((person, idx) => (
        <tr key={idx}>
          <td>{person.name}</td>
          <td>{person.show}</td>
          <td>{person.actor}</td>
          <td>{person.dob}</td>
          <td
            dangerouslySetInnerHTML={{
              __html: person.movies.map(({ title }) => title).join(", "),
            }}
          ></td>
        </tr>
      ))}
    </tbody>
  );
};
