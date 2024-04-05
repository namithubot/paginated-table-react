import React from "react";

export const PeopleError = ({
  people,
  err,
}: {
  people: string | any[] | undefined;
  err: any;
}) => {
  if (err || !people) {
    return <h2>Oops! looks like something went wrong!</h2>;
  }

  if (!people?.length) {
    return <h2>No People Available.</h2>;
  }

  return <h2>Oops! looks like something went wrong!</h2>;
};
