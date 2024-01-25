import { useMemo } from "react";

export const usePagedUsers = (users, page, limit) => {
  const from = limit * page
  const to = from + limit
  const pagedUsers = useMemo(() => users.slice(from, to), [users, page, limit])
  return pagedUsers
};
