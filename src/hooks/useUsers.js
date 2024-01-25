import { useMemo } from "react";

export const useUsers = (users) => {
  const usersData = useMemo(
    () =>
      users.map((user) => ({
        ...user,
        name: `${user.lastName} ${user.firstName} ${user.maidenName}`,
        shortAddress: user.address.city + ', ' + user.address.address,
      })),
    [users]
  );
  return usersData
};