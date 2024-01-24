import { useMemo } from "react";

function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

function sortUsers(users, sort) {
  if (sort.order === "default") return users;
  const sortedUsers = [...users].sort((a, b) =>
    compare(a[sort.sort], b[sort.sort])
  );
  if (sort.order === "dsc") {
    sortedUsers.reverse();
  }
  return sortedUsers;
}

export const useSortedUsers = (users, sort) => {
  const sortedUsers = useMemo(() => sortUsers(users, sort), [users, sort])
  return sortedUsers
};
